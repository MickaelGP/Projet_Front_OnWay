"use client"
import {useState, useEffect} from "react";

import InputForm from "@/components/InputForm";
import PrimaryButton from "@/components/PrimaryButton";
import {validationEmail, validationMdp, mdpIdentique, verifAge} from "@/utils/validation";
export default function FormAjoutEmploye() {

    const [utilNom, setUtilNom] = useState<string>("");
    const [utilPrenom, setUtilPrenom] = useState<string>("");
    const [utilEmail, setUtilEmail] = useState<string>("");
    const [utilMdp, setUtilMdp] = useState<string>("");
    const [confirmeMdp, setConfirmeMdp] = useState<string>("");
    const [utilNaissance, setUtilNaissance] = useState<string>("");
    const [utilGenre, setUtilGenre] = useState<string>("");

    const [valide, setValide] = useState<boolean>(false);

    const [erreur, setErreur] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const reponse = await fetch('/api/admin/ajoutEmploye',{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({utilNom, utilPrenom, utilEmail, utilMdp, utilNaissance, utilGenre})
            })
            if(!reponse.ok){
                const error = await reponse.json();
                // Gère les erreurs spécifiques
                if (error.data.status === 400) {
                    // Si le statut est 400, on affiche un message d'erreur générique
                    setErreur("Tous les champs sont obligatoires.");
                    return;
                } else if (error.data.status === 409) {
                    // Si le statut est 409, on affiche un message d'erreur spécifique
                    setErreur(error.data.detail);
                    return;
                }
                // Pour les autres erreurs, on affiche le détail de l'erreur
                setErreur(error.data.detail);
                return;
            }
            // Si la réponse est correcte, on récupère le message de succès
            const data = await reponse.json();

            // On affiche le message de succès
            setSuccess(data.data.message);
            //
            setUtilNom("");
            setUtilPrenom("");
            setUtilEmail("");
            setUtilMdp("");
            setConfirmeMdp("");
            setUtilNaissance("");
            setUtilGenre("");
        }catch (err){
            console.error(err);
            setErreur('Une erreur est survenue réessayer plus tard.');
        }
    }

    useEffect(() => {
      setValide(utilNom.length >= 3 && utilPrenom.length >= 3 && validationEmail(utilEmail) && validationMdp(utilMdp) && mdpIdentique(utilMdp, confirmeMdp) && verifAge(utilNaissance));
    },[utilNom, utilPrenom, utilEmail, utilMdp, confirmeMdp, utilNaissance]);


    return (<>
        <section className="my-5">
            {erreur && (
                <div className="w-50 mt-5 alert alert-danger text-center container">
                    {erreur}
                </div>
            )}
            {success && (
                <div className="w-50 mt-5 alert alert-success text-center container">
                    {success}
                </div>
            )}
            <h1 className="text-center">Ajouter un employé</h1>
            <div className="container w-75 py-5">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <InputForm id="utilNom" type="text" value={utilNom} name="utilNom" label="Nom :" onChange={(value: string) => setUtilNom(value)} required={true}/>
                        {utilNom && utilNom.length < 3 && (
                            <p className="text-danger">Le nom doit comporter au moins 3 caractères.</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <InputForm id="utilPrenom" type="text" value={utilPrenom} name="utilPrenom" label="Prénom :" onChange={(value: string) => setUtilPrenom(value)} required={true}/>
                        {utilPrenom && utilPrenom.length < 3 && (
                            <p className="text-danger">Le prénom doit comporter au moins 3 caractères.</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <InputForm id="utilEmail" type="email" value={utilEmail} name="utilEmail" label="Email :" onChange={(value: string) => setUtilEmail(value)} required={true}/>
                        {utilEmail && !validationEmail(utilEmail) && (
                            <p className="text-danger">Format invalide</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <InputForm id="utilMdp" type="password" value={utilMdp} name="utilMdp" label="Mot de passe :" onChange={(value: string) => setUtilMdp(value)} required={true}/>
                        {utilMdp && !validationMdp(utilMdp) && (
                            <p className="text-danger">Format invalide</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <InputForm id="confirmeMdp" type="password" value={confirmeMdp} name="confirmeMdp" label="Confirmation du mot de passe:" onChange={(value: string) => setConfirmeMdp(value)} required={true}/>
                        {confirmeMdp && !mdpIdentique(utilMdp, confirmeMdp) && (
                            <p className="text-danger">Le mot de passe ne correspond pas</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <InputForm id="utilNaissance" type="date" value={utilNaissance} name="utilNaissance" label="Date de naissance :" onChange={(value: string)=> setUtilNaissance(value) } required={true}/>
                        {utilNaissance && !verifAge(utilNaissance) && (
                            <p className="text-danger">L&apos;employé doit être majeur</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <select className="form-select" aria-label="Selection genre" required value={utilGenre} onChange={(e) => setUtilGenre(e.target.value)}>
                            <option value="">Sélectionner un genre</option>
                            <option value="M">Masculin</option>
                            <option value="F">Féminin</option>
                        </select>
                    </div>
                    <PrimaryButton id="btn" type="submit" text="Ajouter un employé" disabled={!valide} classDiv="text-center my-3" classBtn="btn btn-primary"/>
                </form>
            </div>
        </section>
    </>)
}