import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const verifToken = async () => {
  const cookieStore = await cookies();
  const cookieToken = cookieStore.get("session_token");
  if (cookieToken === undefined) {
    redirect("/connexion");
  }
};

export const connecter = async () =>{
  const cookieStore = await cookies();
  const cookieToken = cookieStore.get("session_token");
  let result : boolean;
  if (cookieToken === undefined) {
    result = false;
  } else {
    result = true;
  }
  return result;
}
