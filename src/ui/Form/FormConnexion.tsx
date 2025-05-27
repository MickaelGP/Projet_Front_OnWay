export default function FormConnexion() {
    return (
        <section className="sectionConexion container py-5">
            <h1 className="text-center">Connexion</h1>
            <div className="container w-75 py-5">
                <form className="my-5">
                    <div className="mb-3">
                        <input type="email" className="form-control" name="utilEmail" id="connexionEmail" placeholder="Email :" required />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" name="utilMdp" id="connexionPassword" placeholder="Mot de passe :" required/>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary" id="btnConexion">Connexion</button>
                    </div>
                </form>
            </div>
        </section>
    );
}