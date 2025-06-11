import { verifToken } from "@/utils/verifCookies"
export default async function DetailsComptePage(){
    await verifToken();
    return(<>
        <h1>Detail du compte X</h1>
    </>)
}