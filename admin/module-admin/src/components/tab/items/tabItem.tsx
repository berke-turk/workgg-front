import Colors from "@/lib/styles/colors";
import Size from "@/lib/styles/size";
import Pages from "@/lib/pages";
import Icon from '@/components/icons/icon';
import Text from '@/components/texts/default/component';
import Link from "next/link";

export interface SubItemI {
    content: string
    style?: React.CSSProperties,
    children?: React.ReactNode
}

export interface ItemI {
    icon?: { id: string, secondId?: string, mime?: string },
    pageLink: string,
    tabLink: string,
    content: string,
    isSelected?: boolean,
    style?: React.CSSProperties,
    subItems?: SubItemI
}

export default function TabItem(item: ItemI) {
    let className = 'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-800 hover:border-gray-600 dark:hover:text-gray-300';
    let selectedClassName = 'inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500';
    return (
        <li className="me-2">
            <a href={item.pageLink + item.tabLink} className={item.isSelected ? selectedClassName : className} aria-current={item.isSelected ? 'page' : 'false'}>{item.content}</a>
        </li>
    )
}