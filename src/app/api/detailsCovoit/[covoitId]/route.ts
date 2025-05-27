//Désactive la vérification du certificat SSL pour les requêtes sortantes (à éviter en production)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Importe la méthode de réponse "NextResponse" fournie par Next.js pour gérer les réponses HTTP
import { NextResponse } from "next/server";

// Importe les constantes de l’application contenant l’URL de l’API et les routes
import { API_ROUTES, API_URL } from "@/lib/apiRoutes";

// Fonction asynchrone appelée lorsqu'une requête GET est reçue sur cette route
export async function GET(
  request: Request,
  { params }: { params: { covoitId: string } }
) {
  // Extraction de l’identifiant du covoiturage depuis les paramètres de la route
  const { covoitId } = params;

  // Appel à l'API externe pour récupérer les détails d’un covoiturage spécifique.
  const apiRes = await fetch(
    `${API_URL}${API_ROUTES.detailsCovoit}${covoitId}`,
    {
      method: "GET", // Méthode HTTP utilisée
      headers: {
        "Content-Type": "application/json", // Indique qu’on attend une réponse au format JSON
      },
    }
  );

  // Transformation de la réponse HTTP en objet JSON
  const data = await apiRes.json();

  // Retourne la réponse avec les données obtenues et le code HTTP
  return NextResponse.json({ data }, { status: apiRes.status });
}
