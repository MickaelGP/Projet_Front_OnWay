import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const verifToken = async () => {
  const cookieStore = await cookies();
  const cookieToken = cookieStore.get("session_token");
  console.log(cookieToken?.value);
  if (cookieToken === undefined) {
    redirect("/connexion");
  }
};
