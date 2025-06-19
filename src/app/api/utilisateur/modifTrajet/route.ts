// Désactive la vérification SSL (uniquement en développement !)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import { NextRequest, NextResponse } from "next/server";
import { API_URL, API_ROUTES } from "@/lib/apiRoutes";

export async function PUT(req: NextRequest) {
    // Récupère les cookies envoyés par le navigateur
    const cookieHeader = req.headers.get("cookie");

    // Construit les en-têtes à envoyer à l'API ASP.NET
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    // Si on a des cookies, on les forward à l'API backend
    if (cookieHeader) {
        headers["Cookie"] = cookieHeader;
    }

    // Récupère le corps de la requête
    const { covoitId, covoitDate, covoitDep, covoitArr, covoitPrix, covoitFumeur, covoitAnimaux, covoitMusique, covoitStatut } = await req.json();

    // Appel de l'API ASP.NET pour modifier le trajet
    const apiRes = await fetch(`${API_URL}${API_ROUTES.modifTrajet}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({
            covoitId,
            covoitDate,
            covoitDep,
            covoitArr,
            covoitPrix,
            covoitFumeur,
            covoitAnimaux,
            covoitMusique,
            covoitStatut
        }),
    });

    const data = await apiRes.json();

    // Création de la réponse Next.js
    const response = NextResponse.json({ data }, { status: apiRes.status });

    return response;
}