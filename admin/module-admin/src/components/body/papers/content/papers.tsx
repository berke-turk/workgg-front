import Colors from "@/lib/styles/colors";
import Size from "@/lib/styles/size";
import Pages from "@/lib/pages";
import Icons from '@/lib/icons';

import Icon from '@/components/icons/icon';
import Table, { TableSchemaI } from '@/components/table/component';

// Fetch
import { fetchPapers } from '@/lib/fetch/paper';

interface ContentNewsPapersI {
    content?: string
}

export default async function Content(content: ContentNewsPapersI) {
    // API Request
    let papersList = await fetchPapers();
    //

    let title = "Dergi";
    let schema: TableSchemaI = {
        link: Pages.papers,
        heads: ["Başlık", "Sayı", "Tarih", "Okunma Sayısı", "Durum", ""],
        datas: papersList,
        page_index: 0,
        page_size: 20
    };

    return (
        <div className="h-auto py-2 w-full flex flex-col justify-start items-start">
            <a href="/papers/add" className="mb-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Dergi Ekle
                <span className="ml-2 text-lg">
                    +
                </span>
            </a>
            <Table data={{ schema: schema }}></Table>
        </div>
    )
}