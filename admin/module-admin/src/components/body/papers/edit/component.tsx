import Colors from "@/lib/styles/colors";
import Size from "@/lib/styles/size";
import Pages from "@/lib/pages";
import Tabs from "@/lib/tabs";
import Icons from '@/lib/icons';
import Images from '@/lib/images';
import PaperDataI from '@/lib/data-interfaces/paper';

import Icon from '@/components/icons/icon';
import EditTitle from '@/components/texts/edit-title/component';

import EditPaperForm, { EditPaperFormI } from '@/components/forms/EditPaper';

interface PaperI {
    id: string,
    seo?: string,
    activeTab?: string
}

export default async function EditPaper(paper: PaperI) {
    let title = "Dergiler/Gazeteler";
    let data = await FetchData(paper.id);

    return (
        <div className="m-0 px-[10px] md:ml-80 h-auto py-3 w-full flex flex-col justify-start items-start">
            <EditTitle text=""></EditTitle>
            <div className="h-auto py-2 w-full flex flex-col justify-start items-start">
                <EditPaperForm data={data} image={Images.ataturk}></EditPaperForm>
            </div>
        </div>
    )
}

export async function FetchData(id?: string | null): Promise<PaperDataI | undefined> {
    if (id == null)
        return undefined;

    // Fetch API

    //
    let re: PaperDataI = { paper_id: id, status: 'passive', title: "Test Başlığı", description: "Test açıklaması", read_count: "10", seo: "test-basligi", img: "", volume: "1", sub_volume: "2" };

    return re;
}
