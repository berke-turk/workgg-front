import Colors from "@/lib/styles/colors";
import Size from "@/lib/styles/size";
import Pages from "@/lib/pages";
import Icons from '@/lib/icons';

import Icon from '@/components/icons/icon';

export default function About() {
    let title = "Dashboard";
    return ( 
        <div className="ml-80 h-auto py-3 w-full flex flex-col justify-start items-start">
            <div className="page-sub-header py-3 w-auto flex flex-row justify-start items-center" style={{borderColor: Colors.background.subBackgroundColor}}>
                <span className="" style={{ color: Colors.textColor.subColor }}>
                    {title}
                </span>
                <Icon className="ml-2" id={Icons.rightBlackVector} width={Size.width(8)}></Icon>
            </div>
        </div>
    )
}