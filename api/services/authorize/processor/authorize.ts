import * as rabbitDataParams from '../../../lib/rabbit/dataParams';
import * as Crypto from '../../../lib/functions/crypto';

// DB
import DB from '../../../lib/db/connection';
import UserModel from '../../../lib/db/models/user';
import UserSecretModel from '../../../lib/db/models/user_secret';
import CompanyModel from '../../../lib/db/models/company';
import AuthorizeOtpModel from '../../../lib/db/models/authorize_otp';
import AuthorizeModel from '../../../lib/db/models/authorize';

// Types
import Errors from '../../../lib/types/errors';
import AuthorizeOtpTypes from '../../../lib/types/user/authorize_otp_types';
import RegisterTypes from '../../../lib/types/authorize/registerTypes';

// Rabbit
import Consumer from '../rabbit/consumer';
import Reply from '../../../lib/functions/reply';

// Request Data
import * as AuthRequest from '../../../lib/request/data/authorize';

// Request Reply
import * as AuthReply from '../../../lib/request/reply/authorize';
import Joi from 'joi';

const max_otp_attempt = 3;

export async function SendOtp({ consumer, content, msg }: rabbitDataParams.Data<Consumer, AuthRequest.SendOtp>) {
    let replied = false;
    try {
        let request_data = content.data.request;
        console.log("Reqeuest Body");
        console.log(request_data);

        // Check Phone
        let [user] = await DB.queryWithNamedParams<UserModel>(`
        SELECT * FROM public.user
        WHERE country_code =:country_code AND phone =:phone`, {
            'country_code': request_data.body.country_code,
            'phone': request_data.body.phone,
        });
        if (!user)
            throw { code: Errors.Warning, message: "phone is not found." };

        // Send SMS
        let [authorize_otp] = await DB.queryWithNamedParams<AuthorizeOtpModel>(`
        INSERT INTO public.authorize_otp
        (country_code, phone, verify_code, authorize_otp_type, ip_log, client_id)
        VALUES(:country_code, :phone, :verify_code, :authorize_otp_type, :ip_log, :client_id)
        RETURNING *
        `, {
            'country_code': request_data.body.country_code,
            'phone': request_data.body.phone,
            'verify_code': Crypto.randomInt(123456, 987654).toString(),
            'authorize_otp_type': AuthorizeOtpTypes.Login,
            'ip_log': request_data.clientIp,
            'client_id': request_data.client.client_id!
        });
        if (!authorize_otp)
            throw { code: Errors.Warning, message: "error.." };

        // ---- SEND SMS ----

        //

        // Request
        replied = true;
        Reply<AuthReply.SendOtp>({
            msg: msg,
            consumer: consumer,
            content: {
                success: true,
                data: {
                    full_phone: authorize_otp.country_code + authorize_otp.phone,
                    code_time: new Date().toISOString()
                },
                error: null
            }
        });
    } catch (error: { code: string, message: string } | any) {
        if (!replied)
            Reply<AuthReply.SendOtp>({
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

export async function VerifyOtp({ consumer, content, msg }: rabbitDataParams.Data<Consumer, AuthRequest.VerifyOtp>) {
    let replied = false;
    try {
        let request_data = content.data.request;
        console.log("Reqeuest Body");
        console.log(request_data);

        // Check Phone Otp
        let [authorize_otp] = await DB.queryWithNamedParams<AuthorizeOtpModel>(`
        SELECT * FROM public.authorize_otp
        WHERE country_code =:country_code AND phone =:phone AND is_active =:is_active
        ORDER BY created_at DESC LIMIT 1
        `, {
            'country_code': request_data.body.country_code,
            'phone': request_data.body.phone,
            'is_active': true
        });
        if (!authorize_otp)
            throw { code: Errors.Warning, message: "otp is not found." };

        // Verify Code Is False?
        if (authorize_otp.verify_code != request_data.body.verify_code) {
            DB.queryWithNamedParams<any>(`
            UPDATE public.authorize_otp
            SET attempt_count = ${++authorize_otp.attempt_count} ${authorize_otp.attempt_count == 3 ? `, is_active = false` : ``}
            WHERE authorize_otp_id =:authorize_otp_id
            `, {
                'authorize_otp_id': authorize_otp.authorize_otp_id
            });

            throw { code: Errors.Warning, message: "otp is false." };
        }

        // Is True! Create Authorize.
        let [user] = await DB.queryWithNamedParams<UserModel>(`
        SELECT * FROM public.user
        WHERE country_code =:country_code AND phone =:phone`, {
            'country_code': request_data.body.country_code,
            'phone': request_data.body.phone,
        });
        if (!user)
            throw { code: Errors.Warning, message: "phone is not found." };

        let [authorize] = await DB.queryWithNamedParams<AuthorizeModel>(`
        INSERT INTO public.authorize
        (user_id, ip_log, access_token, refresh_token)
        VALUES(:user_id, :ip_log, :access_token, :refresh_token)
        RETURNING *
        `, {
            'user_id': user.user_id!,
            'ip_log': request_data.clientIp,
            'access_token': Crypto.createAccessToken({ id: user.user_id!, validity_time: Date.now().toString(), verify_code: authorize_otp.verify_code }),
            'refresh_token': Crypto.sha256(JSON.stringify({ id: user.user_id!, validity_time: Date.now().toString(), verify_code: authorize_otp.verify_code }))
        });
        if (!authorize)
            throw { code: Errors.Warning, message: "authorize not created." };

        // Request
        replied = true;
        Reply<AuthReply.VerifyOtp>({
            msg: msg,
            consumer: consumer,
            content: {
                success: true,
                data: {
                    authorize_id: authorize.authorize_id,
                    access_token: authorize.access_token,
                    refresh_token: authorize.refresh_token,
                },
                error: null
            }
        });
    } catch (error: { code: string, message: string } | any) {
        if (!replied)
            Reply<AuthReply.VerifyOtp>({
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

export async function Register({ consumer, content, msg }: rabbitDataParams.Data<Consumer, AuthRequest.Register>) {
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

        if (request_data.body.company != null)
            [user.company] = await DB.queryWithNamedParams<CompanyModel>(`
            INSERT INTO public.user_company
            (user_id, title_legal, title_brand, tax_no, tax_office, address)
            VALUES(:user_id, :title_legal, :title_brand, :tax_no, :tax_office, :address)
            RETURNING *
            `,{
                'user_id': user.user_id,
                'title_legal': request_data.body.company.title_legal,
                'title_brand': request_data.body.company.title_brand,
                'tax_no': request_data.body.company.tax_no,
                'tax_office': request_data.body.company.tax_office,
                'address': request_data.body.company.address
            });

        // Request
        replied = true;
        Reply<AuthReply.Register>({
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
            Reply<AuthReply.Register>({
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

export async function Password({ consumer, content, msg }: rabbitDataParams.Data<Consumer, AuthRequest.Password>) {
    let replied = false;
    try {
        let request_data = content.data.request;
        console.log("Reqeuest Body");
        console.log(request_data);

        // Decrypt Password

        //

        console.log("test 1");

        // Check Email & Password
        let [user] = await DB.queryWithNamedParams<UserModel>(`
        SELECT * FROM public.user
        WHERE email =:email
        `, {
            'email': request_data.body.email,
        });
        if (!user)
            throw { code: Errors.Warning, message: "user is not found." };
        console.log("test 2");

        // Secret check
        [user.secret] = await DB.queryWithNamedParams<UserSecretModel>(`
        SELECT * FROM public.user_secret
        WHERE user_id =:user_id
        ORDER BY created_at LIMIT 1
        `, {
            'user_id': user.user_id
        });
        if (!user.secret)
            throw { code: Errors.Warning, message: "user secret is not found." };

        if (!Crypto.passwordVerify(request_data.body.password, user.secret!.password!))
            throw { code: Errors.Warning, message: "password is false" };

        console.log("test 3");

        let [authorize] = await DB.queryWithNamedParams<AuthorizeModel>(`
        INSERT INTO public.authorize
        (user_id, ip_log, access_token, refresh_token)
        VALUES(:user_id, :ip_log, :access_token, :refresh_token)
        RETURNING *
        `, {
            'user_id': user.user_id,
            'ip_log': request_data.clientIp,
            'access_token': Crypto.createAccessToken({ id: user.user_id!, validity_time: Date.now().toString(), verify_code: null }),
            'refresh_token': Crypto.sha256(JSON.stringify({ user_id: user.user_id, validity_time: Date.now().toString(), verify_code: null }))
        });
        if (!authorize)
            throw { code: Errors.Warning, message: "authorize not created." };

        console.log("test 4");

        // Request
        replied = true;
        Reply<AuthReply.VerifyOtp>({
            msg: msg,
            consumer: consumer,
            content: {
                success: true,
                data: {
                    authorize_id: authorize.authorize_id,
                    access_token: authorize.access_token,
                    refresh_token: authorize.refresh_token,
                },
                error: null
            }
        });
    } catch (error: { code: string, message: string } | any) {
        if (!replied)
            Reply<AuthReply.VerifyOtp>({
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

export async function RefreshToken({ consumer, content, msg }: rabbitDataParams.Data<Consumer, AuthRequest.RefreshToken>) {
    let replied = false;
    try {
        let request_data = content.data.request;
        console.log("Reqeuest Body");
        console.log(request_data.user);

        let [authorize] = await DB.queryWithNamedParams<AuthorizeModel>(`
        UPDATE public.authorize
        SET ip_log =:ip_log, access_token =:access_token, refresh_token =:refresh_token
        WHERE authorize_id =:authorize_id AND refresh_token =:before_refresh_token
        RETURNING *
        `, {
            'authorize_id': request_data.user!.authorize!.authorize_id,
            'before_refresh_token': request_data.body.refresh_token,
            'ip_log': request_data.clientIp,
            'access_token': Crypto.createAccessToken({ id: request_data.user!.authorize!.authorize_id, validity_time: Date.now().toString(), verify_code: Crypto.randomInt(123456789, 999999999).toString() }),
            'refresh_token': Crypto.sha256(JSON.stringify({ id: request_data.user!.authorize!.authorize_id, validity_time: Date.now().toString(), verify_code: Crypto.randomInt(123456789, 999999999).toString() }))
        });
        if (!authorize)
            throw { code: Errors.Warning, message: "authorize not updated." };

        // Request
        replied = true;
        Reply<AuthReply.RefreshToken>({
            msg: msg,
            consumer: consumer,
            content: {
                success: true,
                data: {
                    authorize_id: authorize.authorize_id,
                    access_token: authorize.access_token,
                    refresh_token: authorize.refresh_token,
                },
                error: null
            }
        });
    } catch (error: { code: string, message: string } | any) {
        if (!replied)
            Reply<AuthReply.RefreshToken>({
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

export async function Logout({ consumer, content, msg }: rabbitDataParams.Data<Consumer, AuthRequest.Logout>) {
    let replied = false;
    try {
        let request_data = content.data.request;

        let [authorize] = await DB.queryWithNamedParams<AuthorizeModel>(`
        UPDATE public.authorize
        SET access_token =null, refresh_token =null, is_active =false
        WHERE authorize_id =:authorize_id
        RETURNING *
        `, {
            'authorize_id': request_data.user!.authorize!.authorize_id,
        });
        if (!authorize)
            throw { code: Errors.Warning, message: "authorize not updated." };

        // Request
        replied = true;
        Reply<AuthReply.Logout>({
            msg: msg,
            consumer: consumer,
            content: {
                success: true,
                data: {
                    authorize_id: authorize.authorize_id,
                    access_token: authorize.access_token,
                    refresh_token: authorize.refresh_token,
                },
                error: null
            }
        });
    } catch (error: { code: string, message: string } | any) {
        if (!replied)
            Reply<AuthReply.Logout>({
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