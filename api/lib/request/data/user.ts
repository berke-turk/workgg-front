import ClientModel from "../../db/models/client";
import UserModel from "../../db/models/user";

export interface Create{
    client: ClientModel,
    user?: UserModel,
    clientIp: string,
    params?: {},
    body: UserModel,
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
        filter?: {user_type: string | string[], status: string | string[]},
        sort?: {id: string, type: string},
        search?: string
    },
}