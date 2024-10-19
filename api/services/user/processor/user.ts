import * as rabbitDataParams from '../../../lib/rabbit/dataParams';
import * as Crypto from '../../../lib/functions/crypto';

// DB
import DB from '../../../lib/db/connection';
import UserModel from '../../../lib/db/models/user';
import UserSecretModel from '../../../lib/db/models/user_secret';
import CompanyModel from '../../../lib/db/models/company';
import ListLengthModel from '../../../lib/db/models/list_length';

// Types
import Errors from '../../../lib/types/errors';
import RegisterTypes from '../../../lib/types/authorize/registerTypes';

// Rabbit
import Consumer from '../rabbit/consumer';
import Reply from '../../../lib/functions/reply';

// Request Data
import * as UserRequest from '../../../lib/request/data/user';

// Request Reply
import * as UserReply from '../../../lib/request/reply/user';
import Joi from 'joi';

const max_otp_attempt = 3;

export async function Create({ consumer, content, msg }: rabbitDataParams.Data<Consumer, UserRequest.Create>) {
    let replied = false;
    try {
        let request_data = content.data.request;
        console.log("Reqeuest Body");
        console.log(request_data);

        // Check register_type
        let register_type: string = RegisterTypes.PhoneNumber;
        if (request_data.body.password != null) {
            // Decode Password RSA

            //
            register_type = RegisterTypes.Password;
        }

        if (request_data.body.phone != null || request_data.body.country_code != null)
            if (register_type == RegisterTypes.PhoneNumber)
                throw { code: Errors.Warning, message: 'phone number or country code is null.' };

        // Check user is exists?
        let [check_user] = await DB.queryWithNamedParams<UserModel>(`
        SELECT user_id FROM public.user
        WHERE
            client_id =:client_id
            AND
            (
                (email =:email AND email IS NOT NULL)
                OR
                (country_code =:country_code AND country_code IS NOT NULL AND phone_number =:phone_number AND phone_number IS NOT NULL)
            )
        `, {
            'client_id': request_data.client.client_id,
            'email': request_data.body.email,
            'phone_number': request_data.body.phone,
            'country_code': request_data.body.country_code
        });
        if (check_user)
            throw { code: Errors.Warning, message: 'phone number or country code is null.' };

        // Create User
        let [user] = await DB.queryWithNamedParams<UserModel>(`
        INSERT INTO public.user
        (client_id, firstname, lastname, fullname, email, phone, country_code, user_type, role_type)
        VALUES(:client_id, :firstname, :lastname, :fullname, :email, :phone, :country_code, :user_type, :role_type)
        RETURNING *`, {
            'client_id': request_data.client.client_id,
            'firstname': request_data.body.firstname,
            'lastname': request_data.body.lastname,
            'fullname': request_data.body.fullname,
            'email': request_data.body.email,
            'phone': request_data.body.phone,
            'country_code': request_data.body.country_code,
            'user_type': request_data.body.user_type,
            'role_type': request_data.body.role_type
        });
        if (!user)
            throw { code: Errors.Warning, message: 'user is not created.' };
        
        // Request
        replied = true;
        Reply<UserReply.Create>({
            msg: msg,
            consumer: consumer,
            content: {
                success: true,
                data: null,
                error: null
            }
        });
    } catch (error: { code: string, message: string } | any) {
        if (!replied)
            Reply<UserReply.Create>({
                msg: msg,
                consumer: consumer,
                content: {
                    success: false,
                    data: null,
                    error: {
                        code: error.code != null ? error.code : null,
                        message: error.message != null ? error.message : null
                    }
                }
            });
    }
}

export async function List({ consumer, content, msg }: rabbitDataParams.Data<Consumer, UserRequest.List>) {
    let replied = false;
    let default_orderby = "u.created_at ASC";
    try {
        let request_data = content.data.request;

        if (request_data.query?.search != null)
            request_data.query.search = `%${request_data.query.search.toLocaleLowerCase("TR")}%`;

        // Fetch
        let users = await DB.queryWithNamedParams<any>(`
        SELECT
        u.*
        FROM public.user u
        
        INNER JOIN public.user_client u_c
        ON u_c.user_id = u.user_id
        INNER JOIN public.user_company company
        ON company.user_id = u.user_id
        WHERE u_c.client_id =:client_id
            ${request_data.query?.filter?.status != null ? (Array.isArray(request_data.query.filter.status) ? `` : 'AND u.user_status =:user_status') : ``}
            ${request_data.query?.filter?.user_type != null ? (Array.isArray(request_data.query.filter.user_type) ? `` : 'AND u.user_type =:user_type') : ``}
            ${request_data.query?.search != null ? `
            AND (LOWER(u.firstname) LIKE :search
                OR LOWER(u.lastname) LIKE :search
                    OR LOWER(company.title_legal) LIKE :search
                        OR LOWER(company.tax_no) LIKE :search
                            OR u.user_id::text = :ex_search)
            `: ``}

        ORDER BY
            ${request_data.query!.sort != null ?
                request_data.query!.sort.id == 'created_at' ?
                    ('u.' + `created_at ` + (request_data.query!.sort.type == 'desc' ? ' DESC' : ` ASC `)) :
                    default_orderby
                : default_orderby}
        LIMIT ${request_data.query?.page?.size}
        OFFSET ${request_data.query!.page!.size * request_data.query!.page!.index}
        `, {
            'client_id': request_data.client.client_id,
            'user_status': request_data.query?.filter?.status,
            'user_type': request_data.query?.filter?.user_type,
            'search': request_data.query?.search,
        });

        let list_length = 0;
        let [length] = await DB.queryWithNamedParams<ListLengthModel>(`
        SELECT
        COUNT(*) as count
        FROM public.user u
        
        INNER JOIN public.user_client u_c
        ON u_c.user_id = u.user_id
        INNER JOIN public.user_company company
        ON company.user_id = u.user_id
        WHERE u_c.client_id =:client_id
            ${request_data.query?.filter?.status != null ? (Array.isArray(request_data.query.filter.status) ? `` : 'AND u.user_status =:user_status') : ``}
            ${request_data.query?.filter?.user_type != null ? (Array.isArray(request_data.query.filter.user_type) ? `` : 'AND u.user_type =:user_type') : ``}
            ${request_data.query?.search != null ? `
            AND (LOWER(u.firstname) LIKE :search
                OR LOWER(u.lastname) LIKE :search
                    OR LOWER(company.title_legal) LIKE :search
                        OR LOWER(company.tax_no) LIKE :search
                            OR u.user_id::text = :ex_search)
            `: ``}
        `, {
            'client_id': request_data.client.client_id,
            'user_status': request_data.query?.filter?.status,
            'user_type': request_data.query?.filter?.user_type,
            'search': request_data.query?.search,
        });
        if (length)
            list_length = length.count!;

        // Request
        replied = true;
        Reply<UserReply.List>({
            msg: msg,
            consumer: consumer,
            content: {
                success: true,
                data: {
                    items: list_length,
                    page: request_data.query!.page!.index,
                    data: users
                },
                error: null
            }
        });
    } catch (error: { code: string, message: string } | any) {
        if (!replied)
            Reply<UserReply.List>({
                msg: msg,
                consumer: consumer,
                content: {
                    success: false,
                    data: null,
                    error: {
                        code: error.code != null ? error.code : null,
                        message: error.message != null ? error.message : null
                    }
                }
            });
    }
}