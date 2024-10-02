const Colors = {
    sideBar: { primaryBackgroundColor: '#F6F6F6' },
    sideBarItem: { primaryBackgroundColor: '#FFFFFF', selectedBackgroundColor: '#FFFFFF' },
    textColor: { primaryColor: '#000000', secondColor: '#FFFFFF' }
} as const;

export type TextColorType = typeof Colors.textColor;
export type SideBarType = typeof Colors.sideBar;
export type SideBarItemType = typeof Colors.sideBarItem;

export default Colors;