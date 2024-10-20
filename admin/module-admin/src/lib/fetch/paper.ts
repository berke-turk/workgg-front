
import { fetchCreate, fetchUpdate, fetchDelete, fetchList, ApiPath } from '@/lib/api-model';
import PaperData from '@/lib/data-interfaces/paper';

export async function fetchPapers({ page_index = 0, page_size = 20 }: { page_index?: number; page_size?: number; }): Promise<PaperData[]> {
    try {
        const paperList = await fetchList<PaperData>(ApiPath.papers.list(page_index, page_size));

        console.log(paperList);  
        return paperList;      
    } catch (error) {
        console.log("Error fetch papers");
        console.log(error);
        return [];      
    }
}

export async function postPaper(paper: PaperData): Promise<boolean> {
    try {
        const create = await fetchCreate<PaperData>(ApiPath.papers.create, paper);
         
        return create.success;      
    } catch (error) {
        console.log("Error fetch papers");
        console.log(error);
        return false;      
    }
}

export async function updatePaper(paper: PaperData, paper_id: string): Promise<boolean> {
    try {
        const create = await fetchUpdate<PaperData>(ApiPath.papers.update(paper_id), paper);
         
        return create.success;      
    } catch (error) {
        console.log("Error fetch papers");
        console.log(error);
        return false;      
    }
}

export async function deletePaper(paper_id: string): Promise<boolean> {
    try {
        const create = await fetchDelete<PaperData>(ApiPath.papers.delete(paper_id));
         
        return create.success;      
    } catch (error) {
        console.log("Error fetch papers");
        console.log(error);
        return false;      
    }
}
