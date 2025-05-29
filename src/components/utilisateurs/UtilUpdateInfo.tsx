"use client";
import { useEffect, useState } from 'react';
import InfoProfilUtil from '@/interfaces/infoProfilUtil';
import FormModifInfo from '@/ui/utilisateur/form/formModifInfo';

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
        {data && <FormModifInfo data={data} />}
    </>)
}