//Désactive la vérification du certificat SSL pour les requêtes sortantes (à éviter en production)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Importe la méthode de réponse "NextResponse" fournie par Next.js pour gérer les réponses HTTP
import { NextRequest, NextResponse } from "next/server";

// Importe les constantes de l’application contenant l’URL de l’API et les routes
import { API_ROUTES, API_URL } from "@/lib/apiRoutes";

export async function DELETE(request: NextRequest) {
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

  const { utilId } = await request.json();
  console.log(utilId);
  const apiExterne = await fetch(API_URL + API_ROUTES.deleteCompte, {
    method: "DELETE", // Méthode HTTP
    headers,
    body: utilId,
  });

  // Attend et récupère la réponse JSON de l’API externe
  const data = await apiExterne.json();

  // Crée une réponse HTTP côté serveur avec le même code de statut que celui retourné par l’API externe
  const response = NextResponse.json({ data }, { status: apiExterne.status });

  // Renvoie la réponse finale au frontend
  return response;
}
