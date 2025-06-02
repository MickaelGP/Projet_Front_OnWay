// Désactive la vérification SSL (uniquement en développement !)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import { NextRequest, NextResponse } from "next/server";
import { API_URL, API_ROUTES } from "@/lib/apiRoutes";

export async function GET(request: NextRequest) {
    // Récupère les cookies envoyés par le navigateur
    const cookieHeader = request.headers.get("cookie");

    // Construit les en-têtes à envoyer à l'API ASP.NET
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    // Si on a des cookies, on les forward à l'API backend
    if (cookieHeader) {
        headers["Cookie"] = cookieHeader;
    }

    // Appel de l'API ASP.NET pour récupérer les couleurs de voitures
    const apiRes = await fetch(`${API_URL}${API_ROUTES.modeles}`, {
        method: "GET",
        headers,
    });

    // Gère les erreurs éventuelles de parsing (si pas de contenu JSON par exemple)
    let data;
    try {
        data = await apiRes.json();
    } catch {
        data = null;
    }

    // Création de la réponse Next.js
    const response = NextResponse.json({ data }, { status: apiRes.status });

    return response;

}