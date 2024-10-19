export interface SendOtp{
    full_phone?: string,
    code_time?: string | number
}

export interface VerifyOtp{
    authorize_id?: string,
    access_token?: string,
    refresh_token?: string
}

export interface Register{}

export interface Password{
    authorize_id?: string,
    access_token?: string,
    refresh_token?: string
}

export interface RefreshToken{
    authorize_id?: string,
    access_token?: string,
    refresh_token?: string
}

export interface Logout{
    authorize_id?: string,
    access_token?: string,
    refresh_token?: string
}