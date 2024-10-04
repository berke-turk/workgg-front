import Colors from "@/lib/styles/colors";
import Size from "@/lib/styles/size";
import Pages from "@/lib/pages";
import Tabs from "@/lib/tabs";
import Icons from '@/lib/icons';

import Icon from '@/components/icons/icon';
import Tab from '@/components/tab/component';
import TabItem, { ItemI } from '@/components/tab/items/tabItem';

// Content
import ContentPapers from '@/components/body/papers/content/papers';
import ContentNewsPapers from '@/components/body/papers/content/newspapers';

//
interface PaperI {
    activeTab: string
}

export default function Papers(paper: PaperI) {
    let title = "Dergiler/Gazeteler";
    let tabItems: ItemI[] = [
        {
            icon: {
                id: Icons.dashboardPrimary,
                secondId: Icons.dashboardSecondary,
            },
            pageLink: Pages.papers,
            tabLink: Tabs.paper,
            content: 'Dergiler',
            isSelected: paper.activeTab == Tabs.paper ? true : false
        },
        {
            icon: {
                id: Icons.dashboardPrimary,
                secondId: Icons.dashboardSecondary,
            },
            pageLink: Pages.papers,
            tabLink: Tabs.newspaper,
            content: 'Gazeteler',
            isSelected: paper.activeTab == Tabs.newspaper ? true : false
        },
    ]
    return (
        <div className="m-0 md:ml-80 h-auto py-3 w-full flex flex-col justify-start items-start">
            <Tab items={tabItems}></Tab>
            {paper.activeTab == Tabs.newspaper && (
                <ContentNewsPapers content={""}></ContentNewsPapers>
            )}
            {paper.activeTab == Tabs.paper && (
                <ContentPapers content={""}></ContentPapers>
            )}
        </div>
    )
}

/*
  <div className="page-sub-header py-3 w-auto flex flex-row justify-start items-center" style={{ borderColor: Colors.background.subBackgroundColor }}>
                <span className="" style={{ color: Colors.textColor.subColor }}>
                    {title}
                </span>
                <Icon className="ml-2" id={Icons.rightBlackVector} width={Size.width(8)}></Icon>
            </div>

*/