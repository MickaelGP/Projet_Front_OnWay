//Désactive la vérification du certificat SSL pour les requêtes sortantes (à éviter en production)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Importe la méthode de réponse "NextResponse" fournie par Next.js pour gérer les réponses HTTP
import { NextRequest, NextResponse } from "next/server";

// Importe les constantes de l’application contenant l’URL de l’API et les routes
import { API_ROUTES, API_URL } from "@/lib/apiRoutes";

// Fonction asynchrone appelée lorsqu'une requête POST est reçue sur cette route
export async function PUT(request:  NextRequest) {
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
  // Récupère les données JSON envoyées dans le corps de la requête
  const { utilPseudo, utilPrenom, utilNom, utilNaissance, utilEmail, utilTelephone, utilGenre } = await request.json();

  // Effectue un appel à une API externe avec les données reçues
  const apiExterne = await fetch(API_URL + API_ROUTES.modifProfil, {
    method: "PUT", // Méthode HTTP
    headers,
    body: JSON.stringify({
      utilPseudo, 
      utilPrenom, 
      utilNom, 
      utilNaissance, 
      utilEmail, 
      utilTelephone, 
      utilGenre
    }),
  });

  // Attend et récupère la réponse JSON de l’API externe
  const data = await apiExterne.json();

  // Crée une réponse HTTP côté serveur avec le même code de statut que celui retourné par l’API externe
  const response = NextResponse.json({ data }, { status: apiExterne.status });

  // Renvoie la réponse finale au frontend
  return response;
}
