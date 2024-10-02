'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { RootState, AppDispatch } from '@/lib/redux/store';
import { toggleSidebar } from '@/lib/redux/features/sidebarSlice';

interface SubItem {
  label: string;
  path: string;
}

interface SidebarItem {
  label: string;
  path?: string;
  icon?: React.ReactElement;
  subItems?: SubItem[];
}

const SidebarItem: React.FC<{ item: SidebarItem }> = ({ item }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = React.useState(false);

  const handleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <div>
      <div onClick={item.subItems ? handleSubMenu : undefined} className="flex items-center p-2 cursor-pointer hover:bg-gray-700">
        {item.icon && <span className="mr-2">{item.icon}</span>}
        <span>{item.label}</span>
        {item.subItems && (
          <span className="ml-auto">
            {isSubMenuOpen ? '▲' : '▼'}
          </span>
        )}
      </div>
      {isSubMenuOpen && item.subItems && (
        <div className="pl-4">
          {item.subItems.map((subItem, index) => (
            <Link key={index} href={subItem.path}>
              <a className="block p-2 hover:bg-gray-700">{subItem.label}</a>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

interface SidebarProps {
  items: SidebarItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className={`bg-gray-800 text-white h-screen ${isOpen ? 'w-64' : 'w-16'} transition-all duration-300`}>
      <div className="p-4">
        <button onClick={() => dispatch(toggleSidebar())} className="text-white">
          {isOpen ? '◀' : '▶'}
        </button>
      </div>
      <nav>
        {items.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;