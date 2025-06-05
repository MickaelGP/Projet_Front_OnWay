process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import { NextRequest, NextResponse } from "next/server";

import { API_ROUTES, API_URL } from "@/lib/apiRoutes";

export async function POST(request: NextRequest){
    const cookieHeader = request.headers.get("cookie");

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    if (cookieHeader) {
        headers["Cookie"] = cookieHeader;
    }

    const {
        voitId,
        covoitDate,
        adresseNumDepart,
        adresseRueDepart,
        adresseCpDepart,
        adresseVilleDepart,
        adresseNumArriver,
        adresseRueArriver,
        adresseCpArriver,
        adresseVilleArriver,
        covoitPrix,
        covoitDep,
        covoitArr,
        covoitFumer,
        covoitAnimaux,
        covoitMusique
    } = await request.json();

    const apiExterne = await fetch(API_URL + API_ROUTES.ajouterCovoiturage, {
        method: "POST",
        headers,
        body: JSON.stringify({
            voitId,
            covoitDate,
            adresseNumDepart,
            adresseRueDepart,
            adresseCpDepart,
            adresseVilleDepart,
            adresseNumArriver,
            adresseRueArriver,
            adresseCpArriver,
            adresseVilleArriver,
            covoitPrix,
            covoitDep,
            covoitArr,
            covoitFumer,
            covoitAnimaux,
            covoitMusique
        }),
    });

    const data = await apiExterne.json();

    const response = NextResponse.json({ data }, { status: apiExterne.status });

    return response;
}