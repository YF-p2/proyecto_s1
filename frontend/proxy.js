

import { NextResponse } from "next/server";

//como es servercomponent no podemos usar usePathname -> request.nextUrl
//'proxy' actúa como un bloqueador de rutas/archivos
export function proxy(request) {
    /*
    
    */
    const token = request.cookies.get("token")?.value
    const { pathname } = request.nextUrl

    /*
    Como estamos haciendo un proxy redireccinal lo suyo es emplear "NextResponse.redirect"
    La idea es que en base a una condicion preestablecida por nosotros hagamos un 
        redireccionamiento para "bloquear" acceso
    */
    if (!token && pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", request.url));
        
    }

    if (token && pathname === "/login") {
        return NextResponse.redirect(new URL("/clientes", request.url));
    }
    return NextResponse.next()
}

/*
El 'matcher' actúa como filtro en el bloqueo de rutas que hace el "proxy"
    -> permite el paso de ciertos archivos para que no se rompa el funcionamiento
        y/o estética de la/s página/s
*/
/*
POR EXCLUSION: bloquea todo salvo ... -> le dice que no bloquee estas rutas:
export const config = {
    // Excluye la API de Next, archivos estáticos y el favicon
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
*/

//POR INCLUSION
export const config = {
    matcher: [
        '/clientes/:path*',
        '/proyectos/:path*',
        '/tareas/:path*',

    ],
};