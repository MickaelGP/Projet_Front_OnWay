import Footer from "@/ui/Footer/Footer"
import FormConnexion from "@/ui/Form/FormConnexion"
import NavBar from "@/ui/Nav/NavBar"

export default function ConnexionPage() {
    return (<>
        <NavBar />
            <main className="py-5">
                <FormConnexion />
            </main>
        <Footer />
    </>)
}