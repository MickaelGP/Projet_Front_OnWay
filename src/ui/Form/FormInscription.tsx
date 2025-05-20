"use client"
import { useState, useEffect } from "react";
import { validationEmail, validationMdp, mdpIdentique } from '@/utils/validation';

export default function FormInscription() {
    const [UtilEmail, setUtilEmail] = useState('');
    const [UtilMdp, setUtilMdp] = useState('');
    const [UtilPseudo, setUtilPseudo] = useState('');
    const [UtilNaissance, setUtilNaissance] = useState('');
    const [UtilMdpConfirm, setUtilMdpConfirm] = useState('');
    const [UtilGenre, setUtilGenre] = useState('');
    const [valide, setValide] = useState(false);

    useEffect(() => {
        setValide(validationEmail(UtilEmail) && validationMdp(UtilMdp) && mdpIdentique(UtilMdp, UtilMdpConfirm));
    }, [UtilEmail, UtilMdp, UtilMdpConfirm]);
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log(UtilGenre)
        try {
            const resp = await fetch('/api/inscription/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ UtilEmail, UtilMdp, UtilPseudo, UtilGenre })
            });
            if(!resp.ok){
                const err = await resp.json();
                console.log(err.data.detail)
            }
            const data = await resp.json();

            console.log(data.message)

        } catch (err) {
            console.log(err);
        }
    }
    return (
        <section className="sectionConexion container my-5">
            <h1 className="text-center">Inscription</h1>
            <div className="container w-75 my-5">
                <form onSubmit={handleSubmit} className="my-5">
                    <div className="mb-3">
                        <input type="text" className="form-control" name="UtilPseudo" id="inscriptionPseudo" placeholder="Pseudo :" required value={UtilPseudo} onChange={(e) => setUtilPseudo(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <input type="email" className="form-control" name="UtilEmail" id="inscriptionEmail" placeholder="Email :" required value={UtilEmail} onChange={(e) => setUtilEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" name="UtilMdp" id="inscriptionPassword" placeholder="Mot de passe :" required value={UtilMdp} onChange={(e) => setUtilMdp(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" name="confirmation_UtilMdp" id="inscriptionPasswordConfirmation" placeholder="Confirmation du mot de passe :" required value={UtilMdpConfirm} onChange={(e) => setUtilMdpConfirm(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inscriptionNaissance" className="form-label">Votre date de naissance</label>
                        <input type="date" className="form-control" name="UtilNaissance" id="inscriptionNaissance" required value={UtilNaissance} onChange={(e) => setUtilNaissance(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <select className="form-select" aria-label="Selection genre" required value={UtilGenre} onChange={(e) => setUtilGenre(e.target.value)}>
                            <option value="">Sélectionner un genre</option>
                            <option value="M">Masculin</option>
                            <option value="F">Féminin</option>
                        </select>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary" id="btnInscription" disabled={!valide}>Inscription</button>
                    </div>
                </form>
            </div>
        </section>
    );
}