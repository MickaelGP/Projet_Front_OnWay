"use client";
import RechercheCovoitData from '@/interfaces/rechercheCovoitData';
import { tempsTrajet, jour, mois } from '@/utils/dateHeure';
type Props = {
    data: RechercheCovoitData[];
}
import Link from "next/link";
export default function CovoitCard({ data }: Props) {
    return (<>
        <section className={`container py-5`}>
            {data.length > 0 && (<><h2>Dépert le {jour(data[0].covoitDate)} {mois(data[0].covoitDate)}</h2>
                <div className=''>
                    <p>{data[0].villeDepart} <span><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m9 18l6-6l-6-6" /></svg></span>{data[0].villeArriver}</p>
                </div>
            </>)}

            <div>
                {data.map((unCovoit) => (
                    <div key={unCovoit.covoitId} className='bg-white rounded my-5 shadow'>
                        <div className='d-flex justify-content-around align-items-center border-bottom'>
                            <div>
                                <div className='mb-2'><span>{unCovoit.covoitDepart}</span></div>
                                <div className='mb-2'><span>{tempsTrajet(unCovoit.covoitDepart, unCovoit.covoitArriver)}</span></div>
                                <div className='mb-2'><span>{unCovoit.covoitArriver}</span></div>
                            </div>
                            <div>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path strokeDasharray="16" strokeDashoffset="16" d="M12 5l0 13.5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="16;0" /></path><path strokeDasharray="10" strokeDashoffset="10" d="M12 19l5 -5M12 19l-5 -5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.2s" values="10;0" /></path></g></svg>
                                </span>
                            </div>
                            <div>
                                <div className='py-3'>
                                    <p>{unCovoit.villeDepart}</p>
                                </div>
                                <div className=''>
                                    <p>{unCovoit.villeArriver}</p>
                                </div>
                            </div>
                            <div>
                                <span>{unCovoit.covoitPrix} $</span>
                            </div>
                        </div>
                        <div className='my-3'>
                            <div className='text-center py-3'>
                                <Link href={`/details-covoit/${unCovoit.covoitId}`} className='btn btn-primary'>Détails</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    </>);
}