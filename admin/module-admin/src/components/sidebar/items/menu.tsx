import Item, { ItemI, SubItemI } from '@/components/sidebar/items/menuItem';

export default function Menu({ items }: { items: ItemI[] }) {
    let selectedItems = [0, 0, 0];
    return (
        <div className="w-full h-fit flex flex-col justify-center items-start">
            {/* Menü */}
            {items.map((value, index) => (
                <Item key={`menu-item-${index}`} pageLink={value.pageLink} icon={value.icon} content={value.content} isSelected={value.isSelected}>

                </Item>
            ))}
        </div>
    );
}