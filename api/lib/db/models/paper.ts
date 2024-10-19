import Authorize from "./authorize";
import Company from "./company";

export default interface Paper {
    paper_id?: string,
    paper_no?: string,
    client_id?: string,
    link_seo?: string,
    file?: string,
    title?: string,
    description?: string,
    keywords?: string,
    author?: string,
    paper_type?: string,
    paper_status?: string,
    day?: string,
    month?: string,
    year?: string,
    created_at?: string,
    updated_at?: string
}