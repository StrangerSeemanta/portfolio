import { Roles } from "@/types/globals";
import { auth } from "@clerk/nextjs/server";

export async function checkUserRole(role:Roles):Promise<boolean>{
    const {sessionClaims} = await auth();
    return sessionClaims?.metadata.role === role;
}