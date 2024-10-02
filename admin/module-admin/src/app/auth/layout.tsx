import Navbar from '@/components/navbar/component'


export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="TEST">
            {children}
        </div>
    )
}