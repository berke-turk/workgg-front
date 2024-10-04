const Colors = {
    background: { primaryBackgroundColor: '#FFFFFF', secondaryBackgroundColor: '#000000', subBackgroundColor: '#00bfa5' },
    sideBar: { primaryBackgroundColor: '#F6F6F6' },
    sideBarItem: { primaryBackgroundColor: '#FFFFFF', selectedBackgroundColor: '#FFFFFF' },
    textColor: { primaryColor: '#000000', secondColor: '#FFFFFF', subColor: '#a5a5a5' },
    tabItem: {primaryColor: '##9e9e9e', secondColor: '#00bfa5'}
} as const;

export type TextColorType = typeof Colors.textColor;
export type SideBarType = typeof Colors.sideBar;
export type SideBarItemType = typeof Colors.sideBarItem;

export default Colors;