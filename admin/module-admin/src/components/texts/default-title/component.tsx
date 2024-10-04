import Colors from "@/lib/styles/colors";
import Size from "@/lib/styles/size";

interface DefaultTıtleI {
    text: string
}

export default function DefaultTitle({ text }: DefaultTıtleI) {
    return (
        <div className="pb-10 w-full">
            <div className="h-10 w-full">
                <div className="text-lg font-medium text-start text-gray-900 border-b border-gray-200 dark:text-gray-400">
                    <span></span><span className='text-gray-400'></span><span>{text}</span>
                </div>
            </div>
        </div>
    );
}