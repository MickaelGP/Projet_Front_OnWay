// Désactive la vérification du certificat SSL (à ne pas faire en production)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Importe NextResponse pour gérer les réponses API dans Next.js
import { NextResponse } from "next/server";
// Importe les constantes pour l'URL de l'API et les routes
import { API_ROUTES, API_URL } from "@/lib/apiRoutes";

// Fonction qui gère la requête POST pour la connexion
export async function POST(request: Request) {
  // Récupère les données envoyées dans le corps de la requête (email et mot de passe)
  const { utilEmail, utilMdp } = await request.json();

  // Envoie une requête POST à l'API externe pour vérifier les identifiants
  const apiExterne = await fetch(API_URL + API_ROUTES.connexion, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include", // Permet d'inclure les cookies dans la requête
    body: JSON.stringify({ utilEmail, utilMdp }),
  });

  // Récupère la réponse de l'API externe au format JSON
  const data = await apiExterne.json();

  // Récupère le cookie de la réponse de l'API externe (si présent)
  const setCookie = apiExterne.headers.get("set-cookie");

  // Crée la réponse à retourner au client avec les données et le statut de l'API externe
  const response = NextResponse.json({ data }, { status: apiExterne.status });

  // Si un cookie est présent, on l'ajoute à la réponse
  if (setCookie) {
    response.headers.set("set-cookie", setCookie);
  }
  
  // Retourne la réponse finale au client
  return response;
}
