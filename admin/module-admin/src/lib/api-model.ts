import axios from 'axios';

import Consts from '@/lib/consts';

export const ApiPath = {
    papers: {
        list: (page_index: number = 0, page_size: number = 20) => `/papers?page_index=${page_index}&page_size=${page_size}`,
    }
};

export interface FetcHModel<T> {
    success: boolean,
    data: T,
    error: boolean
}

export async function fetchList<T>(path: string): Promise<T[]> {
    try {
        const response = await axios.get<FetcHModel<T[]>>(Consts.base_api + path);

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