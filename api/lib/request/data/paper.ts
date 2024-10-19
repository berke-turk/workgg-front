import ClientModel from "../../db/models/client";
import UserModel from "../../db/models/user";
import PaperModel from "../../db/models/paper";

export interface Create{
    client: ClientModel,
    user?: UserModel,
    clientIp: string,
    params?: {},
    body: PaperModel,
    query?: {},
}

export interface List{
    client: ClientModel,
    user?: UserModel,
    clientIp: string,
    params?: {},
    body?: {},
    query?: {
        page?: {index: number, size: number},
        filter?: {paper_type: string | string[], status: string | string[]},
        sort?: {id: string, type: string},
        search?: string
    },
}

export interface Details{
    client: ClientModel,
    user?: UserModel,
    clientIp: string,
    params?: {paper_no: string, link_seo: string},
    body?: {},
    query?: {},
}

export interface EditPage{
    client: ClientModel,
    user?: UserModel,
    clientIp: string,
    params?: {paper_id: string},
    body?: {},
    query?: {},
}

export interface Update{
    client: ClientModel,
    user: UserModel,
    clientIp: string,
    params?: {paper_id: string},
    body: PaperModel,
    query?: {},
}

export interface Delete{
    client: ClientModel,
    user?: UserModel,
    clientIp: string,
    params?: {paper_id: string},
    body?: {},
    query?: {},
}