export default function FormInscription() {
    return (
        <section className="sectionConexion container my-5">
            <h1 className="text-center">Inscription</h1>
            <div className="container w-75 my-5">
                <form className="my-5">
                    <div className="mb-3">
                        <input type="text" className="form-control" name="pseudo" id="inscriptionPseudo" placeholder="Pseudo :" required/>
                    </div>
                    <div className="mb-3">
                        <input type="email" className="form-control" name="email" id="inscriptionEmail" placeholder="Email :" required/>
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" name="password" id="inscriptionPassword" placeholder="Mot de passe :" required/>
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" name="confirmation_password" id="inscriptionPasswordConfirmation" placeholder="Confirmation du mot de passe :" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inscriptionNaissance" className="form-label">Votre date de naissance</label>
                        <input type="date" className="form-control" name="naissance" id="inscriptionNaissance" required/>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary" id="btnInscription">Inscription</button>
                    </div>
                </form>
            </div>
        </section>
    );
}