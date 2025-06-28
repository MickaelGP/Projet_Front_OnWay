import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Fonction middleware qui s'exécute avant d'accéder à certaines pages
export function middleware(request: NextRequest) {
  // On récupère le cookie nommé "session_token" (sert à vérifier si l'utilisateur est connecté)
  const cookieToken = request.cookies.get("session_token");
  // Si le cookie n'existe pas, l'utilisateur n'est pas connecté
  if (cookieToken === undefined) {
    // On redirige l'utilisateur vers la page de connexion
    return NextResponse.redirect(new URL("/connexion", request.url));
  }
  // Si le cookie existe, on laisse l'utilisateur accéder à la page demandée
  return NextResponse.next();
}

// Configuration du middleware : il s'applique sur toutes les pages /utilisateur/* et /admin/*
export const config = {
  matcher: ["/utilisateur/:path*", "/admin/:path*"],
};
