import Footer from "@/ui/Footer/Footer"
import FormInscription from "@/ui/Form/FormInscription"
import NavBar from "@/ui/Nav/NavBar"

export default function InscriptionPage() {
    return (<>
        <NavBar />
            <main>
                <FormInscription/>
            </main>
        <Footer />
    </>)
}