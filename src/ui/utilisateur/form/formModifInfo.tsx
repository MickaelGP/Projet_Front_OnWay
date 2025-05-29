"use client";
import InfoProfilUtil from '@/interfaces/infoProfilUtil';
import { validationEmail, valideTelephone, verifAge, valideNom } from '@/utils/validation';
import { useState, useEffect } from "react";

type infoDataProps = {
    data: InfoProfilUtil;
}
export default function FormModifInfo({ data }: infoDataProps) {
    const [utilPseudo, setUtilPseudo] = useState<string>('');
    const [utilNom, setUtilNom] = useState<string>('');
    const [utilPrenom, setUtilPrenom] = useState<string>('');
    const [utilEmail, setUtilEmail] = useState<string>('');
    const [utilTelephone, setUtilTelephone] = useState<string>('');
    const [utilNaissance, setUtilNaissance] = useState<string>('');
    const [utilGenre, setUtilGenre] = useState<string>('');
    const [valide, setValide] = useState<boolean>(false);

    const [erreur, setErreur] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    useEffect(() => {
        if (data) {
            setUtilPseudo(data.utilPseudo);
            setUtilNom(data.utilNom);
            setUtilPrenom(data.utilPrenom);
            setUtilEmail(data.utilEmail);
            setUtilTelephone(data.utilTelephone);
            setUtilNaissance(data.utilNaissance);
            setUtilGenre(data.utilGenre);
        }
    }, [data]);

    useEffect(() => {
        setValide(validationEmail(utilEmail) && valideTelephone(utilTelephone) && verifAge(utilNaissance) && valideNom(utilNom) && valideNom(utilPrenom) && valideNom(utilPseudo));
    }, [utilEmail, utilTelephone, utilNaissance, utilNom, utilPrenom, utilPseudo]);
    const handleSubmit = async (event: React.FormEvent) => {

        event.preventDefault();// Empêche le rechargement de la page
        try {
            // Envoie des données utilisateur au backend via une requête POST
            const resp = await fetch('/api/utilisateur/updateProfil', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ utilPseudo, utilPrenom, utilNom, utilNaissance, utilEmail, utilTelephone, utilGenre }) // Seuls les champs requis par l’API sont envoyés
            });

            // Si la réponse n’est pas "OK", on gère les erreurs
            if (!resp.ok) {
                const err = await resp.json();// Récupère l'erreur renvoyée par le backend

                // Exemple de gestion d'erreur spécifique
                if (err.data.status == 400) {
                    setErreur("Un ou plusieurs champs sont invalides. Veuillez vérifier vos entrées.");
                    return;
                }

                // Message d’erreur générique
                setErreur(err.data.detail);
            }
            // Si tout se passe bien, on vide les champs et affiche un message de succès
            const data = await resp.json();
            setSuccess(data.data.message);
        } catch (err) {
            // Si une erreur réseau ou serveur survient, on l'affiche dans la console
            console.log(err);
        }
    }
    return (<>
        <section>
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
            <h1 className="text-center py-5">Modifier votre profil</h1>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="infoProfilPseudo" className="form-label">Votre pseudo :</label>
                        <input type="text" className="form-control" name="utilPseudo" id="infoProfilPseudo" placeholder="Pseudo :" required value={utilPseudo} onChange={(e) => setUtilPseudo(e.target.value)} />
                        {utilPseudo && !valideNom(utilPseudo) && (
                            <p className="text-danger">Il faut au minimum 5 caractères.</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="infoProfilNom" className="form-label">Votre nom :</label>
                        <input type="text" className="form-control" name="utilNom" id="infoProfilNom" placeholder="Nom :" required value={utilNom} onChange={(e) => setUtilNom(e.target.value)} />
                        {utilNom && !valideNom(utilNom) && (
                            <p className="text-danger">Il faut au minimum 5 caractères.</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="infoProfilPrenom" className="form-label">Votre prénom :</label>
                        <input type="text" className="form-control" name="utilPrenom" id="infoProfilPrenom" placeholder="Prénom :" required value={utilPrenom} onChange={(e) => setUtilPrenom(e.target.value)} />
                        {utilPrenom && !valideNom(utilPrenom) && (
                            <p className="text-danger">Il faut au minimum 5 caractères.</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="infoProfilEmail" className="form-label">Votre email :</label>
                        <input type="email" className="form-control" name="utilEmail" id="infoProfilEmail" placeholder="Email :" required value={utilEmail} onChange={(e) => setUtilEmail(e.target.value)} />
                        {utilEmail && !validationEmail(utilEmail) && (
                            <p className="text-danger">Format invalide</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="infoProfilTelephone" className="form-label">Votre Téléphone :</label>
                        <input type="tel" className="form-control" name="utilTelephone" id="infoProfilTelephone" placeholder="Téléphone :" required value={utilTelephone} onChange={(e) => setUtilTelephone(e.target.value)} />
                        {utilTelephone && !valideTelephone(utilTelephone) && (
                            <p className="text-danger">Format invalide</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="infoProfilNaissance" className="form-label">Votre date de naissance :</label>
                        <input type="date" className="form-control" name="utilNaissance" id="infoProfilNaissance" required value={utilNaissance} onChange={(e) => setUtilNaissance(e.target.value)} />
                        {utilNaissance && !verifAge(utilNaissance) && (
                            <p className="text-danger">Vous n&apos;êtes pas majeur</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="infoProfilGenre" className="form-label">Votre genre :</label>
                        <select className="form-select" aria-label="Selection genre" required value={utilGenre} onChange={(e) => setUtilGenre(e.target.value)}>
                            <option value="">Sélectionner un genre</option>
                            <option value="M">Masculin</option>
                            <option value="F">Féminin</option>
                        </select>
                    </div>
                    <div className="text-center py-3">
                        <button type='submit' className="btn btn-warning" disabled={!valide}>Mettre à jour</button>
                    </div>
                </form>
            </div>
        </section>
    </>)
}