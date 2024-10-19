
import { fetchList, ApiPath } from '@/lib/api-model';
import PaperData from '@/lib/data-interfaces/paper';

export async function fetchPapers({ page_index = 0, page_size = 20 }: { page_index?: number; page_size?: number; } = {}): Promise<PaperData[]> {
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
