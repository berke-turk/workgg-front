import axios, { AxiosRequestConfig } from 'axios';
import Consts from '@/lib/consts';

export const ApiPath = {
    papers: {
        list: (page_index: number = 0, page_size: number = 20) => `/papers?page_index=${page_index}&page_size=${page_size}`,
        create: `/papers`,
        update: (paper_id: string) => `/papers/${paper_id}`,
        delete: (paper_id: string) => `/papers/${paper_id}`,
    }
};

export interface FetcHModel<T> {
    success: boolean,
    data: T,
    error: boolean
}

export async function fetchList<T>(path: string, config?: AxiosRequestConfig<any>): Promise<T[]> {
    try {
        if (config)
            config.headers = { ...config.headers, "X-Client-Secret": Consts.client_secret };
        else
            config = { headers: { "X-Client-Secret": Consts.client_secret } };

        const response = await axios.get<FetcHModel<T[]>>(Consts.base_api + path, { ...config });

        if (response.status != 200) {
            console.log('___?');
            console.log(response.status); // log response
            return [];
        }

        if (response.data.success)
            return response.data.data;
        else
            console.log(response.data); // log response data

        return [];
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios hatası:', error.message);
            if (error.response) {
                console.error('Sunucu yanıtı:', error.response.data);
            }
        } else {
            console.error('Beklenmeyen hata:', error);
        }
        throw error;
    }
}

export async function fetchCreate<T>(path: string, data: any, config?: AxiosRequestConfig<any>): Promise<{ success: boolean, data: T | null }> {
    try {
        if (config)
            config.headers = { ...config.headers, "X-Client-Secret": Consts.client_secret };
        else
            config = { headers: { "X-Client-Secret": Consts.client_secret } };

        const response = await axios.post<FetcHModel<T>>(Consts.base_api + path, data, { ...config });

        if (response.status != 200) {
            console.log('___?');
            console.log(response.status); // log response
            return { success: false, data: null };
        }

        if (response.data.success)
            return { success: true, data: response.data.data };
        else
            console.log(response.data); // log response data

        return { success: false, data: null };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios hatası:', error.message);
            if (error.response) {
                console.error('Sunucu yanıtı:', error.response.data);
            }
        } else {
            console.error('Beklenmeyen hata:', error);
        }
        throw error;
    }
}

export async function fetchUpdate<T>(path: string, data: any, config?: AxiosRequestConfig<any>): Promise<{ success: boolean, data: T | null }> {
    try {
        if (config)
            config.headers = { ...config.headers, "X-Client-Secret": Consts.client_secret };
        else
            config = { headers: { "X-Client-Secret": Consts.client_secret } };

        const response = await axios.put<FetcHModel<T>>(Consts.base_api + path, data, { ...config });

        if (response.status != 200) {
            console.log('___?');
            console.log(response.status); // log response
            return { success: false, data: null };
        }

        if (response.data.success)
            return { success: true, data: response.data.data };
        else
            console.log(response.data); // log response data

        return { success: false, data: null };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios hatası:', error.message);
            if (error.response) {
                console.error('Sunucu yanıtı:', error.response.data);
            }
        } else {
            console.error('Beklenmeyen hata:', error);
        }
        throw error;
    }
}

export async function fetchDelete<T>(path: string, config?: AxiosRequestConfig<any>): Promise<{ success: boolean, data: T | null }> {
    try {
        if (config)
            config.headers = { ...config.headers, "X-Client-Secret": Consts.client_secret };
        else
            config = { headers: { "X-Client-Secret": Consts.client_secret } };

        const response = await axios.delete<FetcHModel<T>>(Consts.base_api + path, { ...config });

        if (response.status != 200) {
            console.log('___?');
            console.log(response.status); // log response
            return { success: false, data: null };
        }

        if (response.data.success)
            return { success: true, data: response.data.data };
        else
            console.log(response.data); // log response data

        return { success: false, data: null };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios hatası:', error.message);
            if (error.response) {
                console.error('Sunucu yanıtı:', error.response.data);
            }
        } else {
            console.error('Beklenmeyen hata:', error);
        }
        throw error;
    }
}