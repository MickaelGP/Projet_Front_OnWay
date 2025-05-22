import Image from "next/image";
export default function CovoitCard() {
    return (<>
        <section className={`container py-5`}>
            <h2>Aujourd'hui</h2>
            <div className=''>
                <p>Nice <span><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m9 18l6-6l-6-6" /></svg></span> Paris</p>
            </div>
            <div>
                <div className='bg-white rounded my-5 shadow'>
                    <div className='d-flex justify-content-around align-items-center border-bottom'>
                        <div>
                            <div className='mb-2'><span>11:00</span></div>
                            <div className='mb-2'><span>10:20</span></div>
                            <div className='mb-2'><span>21:20</span></div>
                        </div>
                        <div>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path strokeDasharray="16" strokeDashoffset="16" d="M12 5l0 13.5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="16;0"/></path><path strokeDasharray="10" strokeDashoffset="10" d="M12 19l5 -5M12 19l-5 -5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.2s" values="10;0"/></path></g></svg>
                            </span>
                        </div>
                        <div>
                            <div className='py-3'>
                                <p>Nice</p>
                                <p>Avenue Notre-Dame</p>
                            </div>
                            <div className=''>
                                <p>Nice</p>
                                <p>Avenue Notre-Dame</p>
                            </div>
                        </div>
                        <div>
                            <span>15$</span>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between mx-2 my-3 align-items-center'>
                        <div>
                            <Image src={"/img/imageCouple.png"} width={50} height={50} alt="Image profile" className="rounded-pill" />
                        </div>
                        <div>
                            <p>Dylan</p>
                            <p><span><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" fillOpacity="0" d="M12 3l2.35 5.76l6.21 0.46l-4.76 4.02l1.49 6.04l-5.29 -3.28l-5.29 3.28l1.49 -6.04l-4.76 -4.02l6.21 -0.46Z"><animate fill="freeze" attributeName="fill-opacity" begin="0.5s" dur="0.15s" values="0;0.3"/></path><path fill="none" stroke="currentColor" strokeDasharray="36" strokeDashoffset="36" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3l-2.35 5.76l-6.21 0.46l4.76 4.02l-1.49 6.04l5.29 -3.28M12 3l2.35 5.76l6.21 0.46l-4.76 4.02l1.49 6.04l-5.29 -3.28"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="36;0"/></path></svg></span><span>4</span></p>
                        </div>
                        <div>
                            <button className='btn btn-primary'>Détails</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>);
}