// Désactive la vérification SSL (uniquement en développement !)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Importe les objets nécessaires pour gérer les requêtes et réponses dans Next.js
import { NextRequest, NextResponse } from "next/server";
// Importe les constantes pour l'URL de l'API et les routes
import { API_URL, API_ROUTES } from "@/lib/apiRoutes";

// Handler pour la méthode GET (récupérer les infos utilisateur)
export async function GET(req: NextRequest) {
  // Récupère les cookies envoyés par le navigateur (pour l'authentification)
  const cookieHeader = req.headers.get("cookie");

  // Prépare les en-têtes à envoyer à l'API externe
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Si on a des cookies, on les ajoute aux en-têtes pour l'API externe
  if (cookieHeader) {
    headers["Cookie"] = cookieHeader;
  }

  // Appel de l'API externe pour récupérer les infos du profil utilisateur
  const apiRes = await fetch(`${API_URL}${API_ROUTES.infoProfil}`, {
    method: "GET",
    headers,
  });

  // Reçoit la réponse de l'API externe
  const data = await apiRes.json();

  // Crée la réponse à retourner au client avec les données et le statut de l'API externe
  const response = NextResponse.json({ data }, { status: apiRes.status });

  // Retourne la réponse finale au client
  return response;
}
