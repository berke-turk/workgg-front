import Link from 'next/link';

import Size from "@/lib/styles/size";
import Icons from '@/lib/icons';

import Icon from '@/components/icons/icon';
import Login from '@/components/forms/Login';

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function Page() {
  // await delay(2000); // 2 saniye

  return (
    <main className="flex min-h-screen flex-col items-center justify-center dark:bg-[#161616]">
      <Icon id={Icons.workggWhite} className='mb-10' width={Size.width(150)}></Icon>
      <Login />
    </main>
  )
}