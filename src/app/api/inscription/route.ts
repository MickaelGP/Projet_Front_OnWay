//Désactive la vérification du certificat SSL pour les requêtes sortantes (à éviter en production)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Importe la méthode de réponse "NextResponse" fournie par Next.js pour gérer les réponses HTTP
import { NextResponse } from "next/server";

// Importe les constantes de l’application contenant l’URL de l’API et les routes
import { API_ROUTES, API_URL } from "@/lib/apiRoutes";

// Fonction asynchrone appelée lorsqu'une requête POST est reçue sur cette route
export async function POST(request: Request){

    // Récupère les données JSON envoyées dans le corps de la requête
    const { UtilEmail, UtilMdp, UtilPseudo, UtilGenre, UtilNaissance } = await request.json();

    // Effectue un appel à une API externe avec les données reçues
    const apiExterne = await fetch(API_URL + API_ROUTES.inscription, {
      method: "POST",// Méthode HTTP
      headers: {
        "Content-type": "application/json", // Spécifie que le corps est au format JSON
      },
      body: JSON.stringify({ UtilPseudo, UtilEmail, UtilMdp,  UtilGenre, UtilNaissance}),
    });

    // Attend et récupère la réponse JSON de l’API externe
    const data = await apiExterne.json();

    // Crée une réponse HTTP côté serveur avec le même code de statut que celui retourné par l’API externe
    const response =  NextResponse.json({ data } , { status: apiExterne.status });

    // Renvoie la réponse finale au frontend
    return response;
}