import Authorize from "./authorize";
import UserSecret from "./user_secret";
import Company from "./company";

export default interface User {
    user_id?: string,
    user_no?: string,
    client_id?: string,
    firstname?: string,
    lastname?: string,
    fullname?: string
    identity?: string,
    birthday?: string,
    email?: string,
    password?: string,
    country_code?: string,
    phone?: string,
    user_type?: string,
    role_type?: string,
    company?: Company, // user_company tablosundan gelecek.
    secret?: UserSecret, // kullanıcının secret bilgileri
    authorize?: Authorize,// istekte kullandığı access_token'dan gelecek
    user_status?: string,
    created_at?: string,
    updated_at?: string
}