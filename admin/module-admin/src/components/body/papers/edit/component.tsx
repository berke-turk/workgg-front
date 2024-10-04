import Colors from "@/lib/styles/colors";
import Size from "@/lib/styles/size";
import Pages from "@/lib/pages";
import Tabs from "@/lib/tabs";
import Icons from '@/lib/icons';
import Images from '@/lib/images';

import Icon from '@/components/icons/icon';
import EditTitle from '@/components/texts/edit-title/component';

import EditPaperForm, { EditPaperFormI } from '@/components/forms/EditPaper';

export interface EditPaperContentI {
    id: string
}

interface PaperI {
    activeTab?: string
}

export default function EditPaper(paper: PaperI) {
    let title = "Dergiler/Gazeteler";
    return (
        <div className="m-0 px-[10px] md:ml-80 h-auto py-3 w-full flex flex-col justify-start items-start">
            <EditTitle text=""></EditTitle>
            <div className="h-auto py-2 w-full flex flex-col justify-start items-start">
                <EditPaperForm image={Images.ataturk}></EditPaperForm>
            </div>
        </div>
    )
}