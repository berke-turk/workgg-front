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
    pageLink?: string,
    content: string,
    isSelected?: boolean,
    style?: React.CSSProperties,
    subItems?: SubItemI
}

export default function MenuItem(item: ItemI) {
    return (
        <Link
            href={item.pageLink ? item.pageLink : Pages.dashboard}
            className={`w-52 h-[36px] mb-3 rounded-md flex justify-start items-center transition-colors duration-200 group
            
            ${item.isSelected ? 'bg-black' : 'hover:bg-gray-300'}`}>
            {/* İtem */}
            <div className="ml-4 mr-2">
                {/* Icon */}
                {item.icon && (
                    <Icon id={!item.isSelected ? item.icon.id : (item.icon.secondId ? item.icon.secondId : item.icon.id)} mime={item.icon.mime} width={Size.width(20)}></Icon>
                )}
            </div>
            {/* Title */}
            <Text className="group-hover:text-gray-800 transition-colors duration-200" style={{ color: item.isSelected ? Colors.textColor.secondColor : Colors.textColor.primaryColor }}>{item.content}</Text>
        </Link>
    )
}