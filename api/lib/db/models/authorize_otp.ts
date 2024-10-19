export default interface AuthorizeOtp {
    authorize_otp_id: string,
    country_code: string,
    phone: string,
    verify_code: string,
    authorize_otp_type: string,
    ip_log: string,
    attempt_count: number,
    is_active: boolean,
    client_id: string,
    created_at: string,
    updated_at: string
}