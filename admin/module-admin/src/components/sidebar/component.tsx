'use client'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/lib/redux/store'
import { increment, incrementByAmount, decrement } from '@/lib/redux/features/counterSlice'

import Colors from "@/lib/styles/colors";
import Size from "@/lib/styles/size";
import Pages from "@/lib/pages";
import Icons from '@/lib/icons';

import Icon from '@/components/icons/icon';
import Menu from '@/components/sidebar/items/menu';
import Item, { ItemI, SubItemI } from '@/components/sidebar/items/menuItem';

interface SidebarI {
    activePage: string
}

export default function Sidebar(sidebar: SidebarI) {
    let menuItems: ItemI[] = [
        {
            icon: {
                id: Icons.dashboardPrimary,
                secondId: Icons.dashboardSecondary,
            },
            pageLink: Pages.dashboard,
            content: 'Dashboard',
            isSelected: sidebar.activePage == Pages.dashboard ? true : false
        },
        {
            icon: {
                id: Icons.usersPrimary,
                secondId: Icons.usersSecondary,
            },
            pageLink: Pages.users,
            content: 'Kullanıcılar',
            isSelected: sidebar.activePage == Pages.users ? true : false
        },
        {
            icon: {
                id: Icons.projectsPrimary,
                secondId: Icons.projectsSecondary,
            },
            pageLink: Pages.projects,
            content: 'Projeler',
            isSelected: sidebar.activePage == Pages.projects ? true : false
        },
        {
            icon: {
                id: Icons.blogPrimary,
                secondId: Icons.blogSecondary,
            },
            pageLink: Pages.blog,
            content: 'Blog',
            isSelected: sidebar.activePage == Pages.blog ? true : false
        },
        {
            icon: {
                id: Icons.papersPrimary,
                secondId: Icons.papersSecondary,
            },
            pageLink: Pages.papers,
            content: 'Dergiler/Gazeteler',
            isSelected: sidebar.activePage == Pages.papers ? true : false
        },
        {
            icon: {
                id: Icons.themePrimary,
                secondId: Icons.themeSecondary,
            },
            pageLink: Pages.theme,
            content: 'Tema İçerikleri',
            isSelected: sidebar.activePage == Pages.theme ? true : false
        },
        {
            icon: {
                id: Icons.aboutPrimary,
                secondId: Icons.aboutSecondary,
            },
            pageLink: Pages.about,
            content: 'Hakkımızda/İletişim',
            isSelected: sidebar.activePage == Pages.about ? true : false
        },
        {
            icon: {
                id: Icons.supportPrimary,
                secondId: Icons.supportSecondary,
            },
            pageLink: Pages.support,
            content: 'Destek',
            isSelected: sidebar.activePage == Pages.support ? true : false
        },
        {
            icon: {
                id: Icons.settingsPrimary,
                secondId: Icons.settingsSecondary,
            },
            pageLink: Pages.settings,
            content: 'Ayarlar',
            isSelected: sidebar.activePage == Pages.settings ? true : false
        }
    ]
    return (
        <div style={{backgroundColor: Colors.sideBar.primaryBackgroundColor}} className="w-72 min-h-screen hidden md:flex flex-col items-center fixed" >
            {/* Sidebar */}
            <div className="w-full h-20 flex justify-center items-center">
                {/* Logo */}
                <Icon id={"workgg"} mime={"svg"} width={Size.width(150)}></Icon>
            </div>
            <div className="menu-items">
                <Menu items={menuItems}>
                    {/* Menu */}
                </Menu>
            </div>
        </div>
    )
}