import Colors from "@/lib/styles/colors";
import Size from "@/lib/styles/size";
import Pages from "@/lib/pages";
import Icons from '@/lib/icons';

import Icon from '@/components/icons/icon';
import Menu from '@/components/sidebar/items/menu';
import Item, { ItemI, SubItemI } from '@/components/sidebar/items/menuItem';

export default function Sidebar() {
    let menuItems: ItemI[] = [
        {
            icon: {
                id: Icons.dashboardPrimary,
                secondId: Icons.dashboardSecondary,
            },
            pageLink: Pages.dashboard,
            content: 'Dashboard',
            isSelected: true
        },
        {
            icon: {
                id: Icons.usersPrimary,
                secondId: Icons.usersSecondary,
            },
            pageLink: Pages.users,
            content: 'Kullanıcılar',
            isSelected: false
        },
        {
            icon: {
                id: Icons.projectsPrimary,
                secondId: Icons.projectsSecondary,
            },
            pageLink: Pages.projects,
            content: 'Projeler',
            isSelected: false
        },
        {
            icon: {
                id: Icons.blogPrimary,
                secondId: Icons.blogSecondary,
            },
            pageLink: Pages.blog,
            content: 'Blog',
            isSelected: false
        },
        {
            icon: {
                id: Icons.papersPrimary,
                secondId: Icons.papersSecondary,
            },
            pageLink: Pages.papers,
            content: 'Dergiler/Gazeteler',
            isSelected: false
        },
        {
            icon: {
                id: Icons.themePrimary,
                secondId: Icons.themeSecondary,
            },
            pageLink: Pages.theme,
            content: 'Tema İçerikleri',
            isSelected: false
        },
        {
            icon: {
                id: Icons.aboutPrimary,
                secondId: Icons.aboutSecondary,
            },
            pageLink: Pages.about,
            content: 'Hakkımızda/İletişim',
            isSelected: false
        },
        {
            icon: {
                id: Icons.supportPrimary,
                secondId: Icons.supportSecondary,
            },
            pageLink: Pages.support,
            content: 'Destek',
            isSelected: false
        },
        {
            icon: {
                id: Icons.settingsPrimary,
                secondId: Icons.settingsSecondary,
            },
            pageLink: Pages.settings,
            content: 'Ayarlar',
            isSelected: false
        }
    ]
    return (
        <div className="w-72 h-screen hidden md:flex flex-col items-center" style={{ backgroundColor: Colors.sideBar.primaryBackgroundColor }}>
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