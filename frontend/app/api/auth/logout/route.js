import { cookies } from "next/headers";
import { NextResponse } from "next/server"; 
import {API_INTERNAL} from "@/services/config"

export async function POST() {
    const cookieStored = await cookies()
    const token = cookieStored.get("token")?.value

    if(token){
        await fetch(`${API_INTERNAL}/api/logout`, {
            method: "POST",
            headers: {Authorization: `Bearer ${token}`},
            cache: "no-store",

        }).catch(() => {})
    }

    cookieStored.delete("token")
    return NextResponse.json({message: "Sesión cerrada"})
}