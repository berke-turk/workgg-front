'use client';

import { useSearchParams } from 'next/navigation'
import Colors from "@/lib/styles/colors";
import Size from "@/lib/styles/size";
import Pages from "@/lib/pages";
import Tabs from "@/lib/tabs";
import Icons from '@/lib/icons';

import Icon from '@/components/icons/icon';
import Tab from '@/components/tab/component';
import TabItem, { ItemI } from '@/components/tab/items/tabItem';

export interface TableDataI {
    id: string,
    title: string,
    volume: string,
    date: string,
    read_count: string,
    status: string
}

export interface TableSchemaI {
    link: string,
    heads: string[],
    datas: TableDataI[],
    page_index: number,
    page_size: number
}

export interface TableI {
    schema: TableSchemaI
}

export default function Table({ data }: { data: TableI }) {
    let params = useSearchParams();
    console.log(params);
    let page_index = 0;

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>

                        {data.schema.heads.map((value, index) => (
                            <th key={`table-th-${index}`} scope="col" className="px-6 py-3">
                                {value}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.schema.datas.map((value, index) => (
                        <tr key={`${value.id}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {value.title}
                            </th>
                            <td className="px-6 py-4">
                                {value.volume}
                            </td>
                            <td className="px-6 py-4">
                                {value.date}
                            </td>
                            <td className="px-6 py-4">
                                {value.read_count}
                            </td>
                            <td className="px-6 py-4">
                                {value.status}
                            </td>
                            <td className="px-6 py-4">
                                <a href={`${data.schema.link}/edit?id=${value.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:cursor-pointer">Düzenle</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Gösteriliyor <span className="font-semibold text-gray-900 dark:text-white">1-10</span> arası <span className="font-semibold text-gray-900 dark:text-white">1000</span></span>
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">1</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">3</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}