import Colors from "@/lib/styles/colors";
import Size from "@/lib/styles/size";
import Pages from "@/lib/pages";
import Icons from '@/lib/icons';

import Item, { ItemI, SubItemI } from '@/components/tab/items/tabItem';

interface TabI {
    items: ItemI[],
}

export default function Tab({ items }: TabI) {
    return (
        <div className="pb-10 w-full">
            <div className="h-10 w-full">
                <div className="text-sm font-medium text-center text-gray-900 border-b border-gray-200 dark:text-gray-400">
                    <ul className="flex flex-wrap -mb-px">
                        {/* Tab */}
                        {items.map((value, index) => (
                            <Item key={`tab-item-${index}`} pageLink={value.pageLink} tabLink={value.tabLink} content={value.content} isSelected={value.isSelected}>

                            </Item>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}