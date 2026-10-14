import { cookies } from "next/headers";
import { NextResponse } from "next/server"; 
import {API_INTERNAL} from "@/services/config"

/*
uso de nextresponse para controlar cookies, reescritura, menajdores de route
*/

export async function POST(request) {
    
    //extraemos la peticion del "cuerpo" del login para obtener los datos:
    const body = await request.json()
                        .catch(() => null)

    if(!body?.email || !body?.password){
        return NextResponse.json(
            {message: "El correo y la constraseña son obligatorios"},
            {status: 400}
        )
    }


    const res = await fetch(`${API_INTERNAL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({email: body.email, password: body.password}),
        cache: "no-store",
    })

    //manejo error con objeto vacío
    const data = await res.json().catch(() => ({}))

    //si sale mal le cogen los valores obtenidos del back -> AuthController.php (login())
    if(!res.ok){
        return NextResponse.json(
            {message: data.message ?? "Credenciales inválidas"},
            {status: res.status}
        )
    }

    (await cookies()).set("token", data.token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60* 8,
    })

    return NextResponse.json({user: data.user})
}