import ClientModel from "../../db/models/client";
import UserModel from "../../db/models/user";

export interface SendOtp{
    client: ClientModel,
    user?: UserModel,
    clientIp: string,
    params?: {},
    body: {
        country_code: string,
        phone: string
    },
    query?: {},
}

export interface VerifyOtp{
    client: ClientModel,
    user?: UserModel,
    clientIp: string,
    params?: {},
    body: {
        country_code: string,
        phone: string,
        verify_code: string
    },
    query?: {},
}

export interface Register{
    client: ClientModel,
    user?: UserModel,
    clientIp: string,
    params?: {},
    body: UserModel,
    query?: {},
}

export interface Password{
    client: ClientModel,
    user?: UserModel,
    clientIp: string,
    params?: {},
    body: {
        email: string,
        password: string,
    },
    query?: {},
}

export interface RefreshToken{
    client: ClientModel,
    user?: UserModel,
    clientIp: string,
    params?: {},
    body: {
        refresh_token: string,
    },
    query?: {},
}

export interface Logout{
    client: ClientModel,
    user?: UserModel,
    clientIp: string,
    params?: {},
    body?: {},
    query?: {},
}