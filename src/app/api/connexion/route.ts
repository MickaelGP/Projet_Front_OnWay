process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import { NextResponse } from "next/server";
import { API_ROUTES, API_URL } from "@/lib/apiRoutes";
export async function POST(request: Request) {
  const { utilEmail, utilMdp } = await request.json();

  const apiExterne = await fetch(API_URL + API_ROUTES.connexion, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ utilEmail, utilMdp }),
  });

  const data = await apiExterne.json();

  const setCookie = apiExterne.headers.get("set-cookie");
  const response = NextResponse.json({ data }, { status: apiExterne.status });
  if (setCookie) {
    response.headers.set("set-cookie", setCookie);
  }
  
  return response;
}
