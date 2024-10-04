import Pages from '@/lib/pages'
import Colors from '@/lib/styles/colors'

import Sidebar from '../../components/sidebar/component'
import Support from '../../components/body/support/component'
export default function Home() {
    return (
        <main className="flex min-h-screen w-full flex-row items-start justify-start" style={{ backgroundColor: Colors.background.primaryBackgroundColor }}>
            <Sidebar activePage={Pages.support}></Sidebar>
            <Support></Support>
        </main>
    )
}