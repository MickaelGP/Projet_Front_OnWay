"use client";
import { useEffect, useState } from 'react';
import InfoProfilUtil from '@/interfaces/infoProfilUtil';
import InfoUtil from '@/ui/utilisateur/InfoUtil';
export default function UtilInfoDashboard() {
    const [data, setData] = useState<InfoProfilUtil>();
    useEffect(() => {
        const fetchProfil = async () => {
            try {
                const resp = await fetch('/api/utilisateur/info');
                const data = await resp.json();
                setData(data.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProfil();
    }, []);
    return (<>
        {data && <InfoUtil data={data} />}
    </>)
}