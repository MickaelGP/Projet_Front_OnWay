// Désactive la vérification SSL (uniquement en développement !)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import { NextRequest, NextResponse } from "next/server";
import { API_URL, API_ROUTES } from "@/lib/apiRoutes";

// POST handler pour la déconnexion
export async function POST(req: NextRequest) {
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

  // Appel de l'API ASP.NET pour la déconnexion
  const apiRes = await fetch(`${API_URL}${API_ROUTES.deconnexion}`, {
    method: "POST",
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

  // Suppression manuelle du cookie dans le navigateur
  response.cookies.set("session_token", "", {
    path: "/",
    expires: new Date(0), // Date expirée
    httpOnly: true,
    secure: false, // Doit être le même que dans le backend
    sameSite: "lax",
  });

  return response;
}
