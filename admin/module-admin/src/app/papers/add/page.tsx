import Pages from '@/lib/pages'
import Tabs from '@/lib/tabs'
import Colors from '@/lib/styles/colors'

import Sidebar from '@/components/sidebar/component'
import AddPaper from '@/components/body/papers/add/component'

export const metadata = {
    title: 'Dergi Ekle',
    description: 'Dergi ekle',
}

export default function Home() {
    return (
        <main className="flex min-h-screen w-full flex-row items-start justify-start dark:bg-[#0a0a0a]">
            <Sidebar activePage={Pages.papers}></Sidebar>
            <AddPaper></AddPaper>
        </main>
    )
}