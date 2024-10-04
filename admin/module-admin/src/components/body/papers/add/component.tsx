import Colors from "@/lib/styles/colors";
import Size from "@/lib/styles/size";
import Pages from "@/lib/pages";
import Tabs from "@/lib/tabs";
import Icons from '@/lib/icons';

import Icon from '@/components/icons/icon';
import DefaultTitle from '@/components/texts/default-title/component';
import AddPaperForm from '@/components/forms/AddPaper';

//
interface PaperI {
    activeTab?: string
}

export default function AddPaper(paper: PaperI) {
    let title = "Dergiler/Gazeteler";
    return (
        <div className="m-0 px-[10px] md:ml-80 h-auto py-3 w-full flex flex-col justify-start items-start">
            <DefaultTitle text="Dergi Ekle"></DefaultTitle>
            <div className="h-auto py-2 w-full flex flex-col justify-start items-start">
                <AddPaperForm></AddPaperForm>
            </div>
        </div>
    )
}