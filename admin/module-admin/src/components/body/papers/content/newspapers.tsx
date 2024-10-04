import Colors from "@/lib/styles/colors";
import Size from "@/lib/styles/size";
import Pages from "@/lib/pages";
import Tabs from "@/lib/tabs";
import Icons from '@/lib/icons';

import Icon from '@/components/icons/icon';
import Table, { TableDataI, TableSchemaI } from '@/components/table/component';

interface ContentNewsPapersI {
    content?: string
}

export default function Content(content: ContentNewsPapersI) {
    // API REQUEST

    //

    let title = "Gazeteler";
    let schema: TableSchemaI = {
        link: Pages.papers + Tabs.newspaper,
        heads: ["Başlık", "Sayı", "Tarih", "Okunma Sayısı", "Durum", ""],
        datas: [],
        page_index: 0,
        page_size: 20
    };

    return (
        <div className="h-auto py-2 w-full flex flex-col justify-start items-start">
            <Table data={{ schema: schema }}></Table>
        </div>
    )
}