import Footer from "@/ui/Footer/Footer";
import FormContact from "@/ui/Form/FormContact";
import NavBar from "@/ui/Nav/NavBar";

export default function ContactPage() {
    return (<>
        <NavBar />
            <main>
                <FormContact />
            </main>
        <Footer />
    </>);
}