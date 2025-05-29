import Link from 'next/link';
import InfoProfilUtil from '@/interfaces/infoProfilUtil';
type infoDataProps = {
    data: InfoProfilUtil;
}
export default function InfoUtil({data}: infoDataProps) {
    return(<>
        <h1 className='text-center'> Bienvenue {data?.utilPseudo}</h1>
        <div className='container my-5'>
            <h2 className='text-center py-5'>Vos informations</h2>
            <div className='container py-5'>
                <div className='row'>
                    <div className='col-md-6'>
                        <p><strong>Nom:</strong> {data?.utilNom}</p>
                        <p><strong>Prénom:</strong> {data?.utilPrenom}</p>
                        <p><strong>Pseudo:</strong> {data?.utilPseudo}</p>
                        <p><strong>Email:</strong> {data?.utilEmail}</p>
                        <p><strong>Téléphone:</strong> {data?.utilTelephone}</p>
                    </div>
                    <div className='col-md-6'>
                        <p><strong>Genre:</strong> {data?.utilGenre}</p>
                        <p><strong>Date de naissance:</strong> {data?.utilNaissance}</p>
                        <p><strong>Crédit:</strong> {data?.utilCredit}</p>
                    </div>
                    <div className='py-5 text-center'>
                        <Link href={"#"} className='btn btn-primary'>Modifier vos informations</Link>
                    </div>
                </div>
            </div>
        </div>
    </>)
}