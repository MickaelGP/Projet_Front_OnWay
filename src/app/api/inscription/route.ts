process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import { NextResponse } from "next/server";
import { API_ROUTES, API_URL } from "@/lib/apiRoutes";

export async function POST(request: Request){

    const { UtilEmail, UtilMdp, UtilPseudo, UtilGenre } = await request.json();

    const apiExterne = await fetch(API_URL + API_ROUTES.inscription, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ UtilPseudo, UtilEmail, UtilMdp,  UtilGenre}),
    });

    const data = await apiExterne.json();

    const response =  NextResponse.json({ data } , { status: apiExterne.status });

    return response;
}