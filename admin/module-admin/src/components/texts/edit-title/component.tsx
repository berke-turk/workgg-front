'use client';

import { useSearchParams } from 'next/navigation'

import Colors from "@/lib/styles/colors";
import Size from "@/lib/styles/size";

interface EditTıtleI {
    text: string
}

export default function EditTitle({ text }: EditTıtleI) {
    let params = useSearchParams();
    console.log(params);

    return (
        <div className="pb-10 w-full">
            <div className="h-10 w-full">
                <div className="text-lg font-medium text-start text-gray-900 border-b border-gray-200 dark:text-gray-400">
                    <span>Item ID# {'->'} </span><span className='text-gray-400'></span><span>{params.get('id') ? `${params.get('id')}` : ''}</span>
                </div>
            </div>
        </div>
    );
}