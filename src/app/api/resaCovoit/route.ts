//Désactive la vérification du certificat SSL pour les requêtes sortantes (à éviter en production)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Importe la méthode de réponse "NextResponse" fournie par Next.js pour gérer les réponses HTTP
import { NextResponse } from "next/server";

// Importe les constantes de l’application contenant l’URL de l’API et les routes
import { API_ROUTES, API_URL } from "@/lib/apiRoutes";

// Fonction asynchrone appelée lorsqu'une requête POST est reçue sur cette route
export async function POST(request: Request){
    const cookieHeader = request.headers.get("cookie");

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    if (cookieHeader) {
        headers["Cookie"] = cookieHeader;
    }
    const {resaDate, resaNbSiege, resaCovoit} = await request.json();

    const apiExterne = await fetch(API_URL + API_ROUTES.reserverCovoit,{
        method: "POST",
        headers,
        body: JSON.stringify({
            resaDate,
            resaNbSiege,
            resaCovoit,
        }),
    });

     const data = await apiExterne.json();

    const response = NextResponse.json({ data }, { status: apiExterne.status });

    return response;
}