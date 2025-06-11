import NavBarAdmin from "@/ui/Nav/admin/NavBarAdmin";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (<>
        <main className="">
            <NavBarAdmin/>
            {children}
        </main>
    </>)
}