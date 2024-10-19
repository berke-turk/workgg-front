import * as rabbitDataParams from '../../../lib/rabbit/dataParams';
import * as Crypto from '../../../lib/functions/crypto';

// Functions
import QueryUpdate from '../../../lib/functions/queryUpdate';
import UserTypeControl from '../../../lib/functions/userTypeControl';

// DB
import DB from '../../../lib/db/connection';
import PaperModel from '../../../lib/db/models/paper';
import CompanyModel from '../../../lib/db/models/company';
import ListLengthModel from '../../../lib/db/models/list_length';

// Types
import Errors from '../../../lib/types/errors';
import UserTypes from '../../../lib/types/user/types';
import RegisterTypes from '../../../lib/types/authorize/registerTypes';

// Rabbit
import Consumer from '../rabbit/consumer';
import Reply from '../../../lib/functions/reply';

// Request Data
import * as PaperRequest from '../../../lib/request/data/paper';

// Request Reply
import * as PaperReply from '../../../lib/request/reply/paper';
import Joi from 'joi';

const max_otp_attempt = 3;

export async function Create({ consumer, content, msg }: rabbitDataParams.Data<Consumer, PaperRequest.Create>) {
    let replied = false;
    try {
        let request_data = content.data.request;
        console.log("Reqeuest Body");
        console.log(request_data);

        // Create Paper
        let [paper] = await DB.queryWithNamedParams<PaperModel>(`
        INSERT INTO public.paper
        (client_id, link_seo, title, description, keywords, author, year, month, day, paper_type, paper_status)
        VALUES(:client_id, :link_seo, :title, :description, :keywords, :author, :year, :month, :day, :paper_type, :paper_status)
        RETURNING *`, {
            'client_id': request_data.client.client_id,
            'link_seo': 'test-seo',
            'title': request_data.body.title,
            'description': request_data.body.description,
            'keywords': request_data.body.keywords,
            'author': 'workgg',
            'year': request_data.body.year,
            'month': request_data.body.month,
            'day': request_data.body.day,
            'paper_type': 'pdf',
            'paper_status': 'active'
        });
        if (!paper)
            throw { code: Errors.Warning, message: 'paper is not created.' };
        /* Paper No Create */

        //

        // Request
        replied = true;
        Reply<PaperReply.Create>({
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
            Reply<PaperReply.Create>({
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

export async function EditPage({ consumer, content, msg }: rabbitDataParams.Data<Consumer, PaperRequest.EditPage>) {
    let replied = false;
    try {
        let request_data = content.data.request;

        // Fetch Papers
        let [paper] = await DB.queryWithNamedParams<PaperModel>(`
        SELECT * FROM public.paper
        WHERE client_id =:client_id AND paper_id =:paper_id
        `, {
            'client_id': request_data.client.client_id,
            'paper_id': request_data.params?.paper_id,
        });

        // Request
        replied = true;
        Reply<PaperReply.EditPage>({
            msg: msg,
            consumer: consumer,
            content: {
                success: true,
                data: paper ? paper : null,
                error: null
            }
        });
    } catch (error: { code: string, message: string } | any) {
        if (!replied)
            Reply<PaperReply.EditPage>({
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

export async function Update({ consumer, content, msg }: rabbitDataParams.Data<Consumer, PaperRequest.Update>) {
    let replied = false;
    let allowedUserTypes = [UserTypes.Admin, UserTypes.Subadmin];
    try {
        let request_data = content.data.request;

        // Access Filter - Update
        if (!UserTypeControl(request_data.user.user_type, allowedUserTypes))
            throw { code: Errors.AccessToken, message: 'not allowed' };

        // Update
        let query = QueryUpdate('public.paper', { ...request_data }, { 'client_id': request_data.client.client_id, 'paper_id': request_data.params!.paper_id });
        if (query)
            DB.query(query.text, query.values);

        // Request
        replied = true;
        Reply<PaperReply.Update>({
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
            Reply<PaperReply.Update>({
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

export async function List({ consumer, content, msg }: rabbitDataParams.Data<Consumer, PaperRequest.List>) {
    let replied = false;
    let default_orderby = "u.created_at ASC";
    try {
        let request_data = content.data.request;

        if (request_data.query?.search != null)
            request_data.query.search = `%${request_data.query.search.toLocaleLowerCase("TR")}%`;

        // Fetch Papers
        let papers = await DB.queryWithNamedParams<PaperModel>(`
        SELECT * FROM public.paper
        WHERE client_id =:client_id
        ORDER BY created_at DESC
        LIMIT ${request_data.query?.page?.size}
        OFFSET ${request_data.query!.page!.size * request_data.query!.page!.index}
        `, {
            'client_id': request_data.client.client_id,
        });

        let list_length = 0;
        let [length] = await DB.queryWithNamedParams<ListLengthModel>(`
        SELECT COUNT(*) as count FROM public.paper
        WHERE client_id =:client_id
        `, {
            'client_id': request_data.client.client_id,
        });
        if (length)
            list_length = length.count!;

        // Request
        replied = true;
        Reply<PaperReply.List>({
            msg: msg,
            consumer: consumer,
            content: {
                success: true,
                data: {
                    items: list_length,
                    page: request_data.query!.page!.index,
                    data: papers
                },
                error: null
            }
        });
    } catch (error: { code: string, message: string } | any) {
        if (!replied)
            Reply<PaperReply.List>({
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

export async function Details({ consumer, content, msg }: rabbitDataParams.Data<Consumer, PaperRequest.Details>) {
    let replied = false;
    try {
        let request_data = content.data.request;

        // Fetch Papers
        let [paper] = await DB.queryWithNamedParams<PaperModel>(`
        SELECT * FROM public.paper
        WHERE client_id =:client_id AND paper_no =:paper_no AND link_seo =:link_seo
        `, {
            'client_id': request_data.client.client_id,
            'paper_no': request_data.params?.paper_no,
            'link_seo': request_data.params?.link_seo
        });

        // Request
        replied = true;
        Reply<PaperReply.Details>({
            msg: msg,
            consumer: consumer,
            content: {
                success: true,
                data: paper ? paper : null,
                error: null
            }
        });
    } catch (error: { code: string, message: string } | any) {
        if (!replied)
            Reply<PaperReply.Details>({
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

export async function Delete({ consumer, content, msg }: rabbitDataParams.Data<Consumer, PaperRequest.Delete>) {
    let replied = false;
    try {
        let request_data = content.data.request;
        console.log("Reqeuest Body");
        console.log(request_data);

        // Delete
        await DB.queryWithNamedParams<any>(`DELETE FROM public.paper WHERE paper_id =:paper_id`, { 'paper_id': request_data.params?.paper_id });

        // Request
        replied = true;
        Reply<PaperReply.Delete>({
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
            Reply<PaperReply.Delete>({
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