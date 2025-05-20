export default function FormContact() {
    return (
        <section className="sectionConexion container my-5">
            <h1 className="text-center">Nous contacter</h1>
            <div className="container w-75 my-5">
                <form className="my-5 py-5 px-3">
                    <div className="mb-3">
                        <input type="text" className="form-control" name="nom" id="contactNom" placeholder="Nom :" />
                    </div>
                    <div className="mb-3">
                        <input type="email" className="form-control" name="email" id="contactEmail" placeholder="Email :" />
                    </div>
                    <div className="mb-3">
                        <input type="tel" className="form-control" name="telephone" id="contactTelephone" placeholder="Téléphone :" />
                    </div>
                    <div className="mb-3">
                        <textarea className="form-control" name="description" id="contactDescription" placeholder="Votre message :"></textarea>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary" id="btnContact">Envoyer</button>
                    </div>
                </form>
            </div>
        </section>
    );
}