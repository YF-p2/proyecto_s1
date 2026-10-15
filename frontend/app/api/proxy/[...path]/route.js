import {cookies} from "next/headers"
import { NextResponse } from "next/server"
import { API_INTERNAL } from "@/services/config"


//'request' tiene la info de la peticion
/*
'params' tiene los parametros dinamicos de la ruta -> gracias a [...path]
Como este archivo (route.js) se encuentra dentro de una ruta dinámica ([...path]), todo
lo que aparece en la url del front, previo a 'proxy', es ignorado, y [...path]
captura lo que viene a continuacion

    http://localhost:3000/api/proxy/clients/5

    Automaticamente 'path' se convierte en un array tipo: ["clientes", "5"]
    gracias a la magia de la ruta dinámica

*/
async function handler(request, {params}) {
    
    const {path} = await params //extraemos array de carpetas/ruta de la peticion
    const token = (await cookies()).get("token")?.value

    /*
    - Creamos nueva url a partir de IP del back (api_internal)
    - El array de carpetas se reconstruye separandolo por '/'
    - De la URL original se extraen parametros de busqueda y/o filtros ->'.search'
        -> '.search' coge los parametros "extra" de la URL del front que vienen después
            del '?'. Estos se pegan a la nueva url que creamos y que va a recibir el back

    Por el sistema proxy que montamos, la ruta que se genera incluye 'proxy' como fragmento de la ruta,
    pero esto el back no lo entiende. Por eso creamos una URL de 0, incluyendo el "host del back"
    + /api, la extracción de path (/clientes, /proyectos ...) y los parametros del search
    */
    const url = `${API_INTERNAL}/api/${path.join("/")}${new URL(request.url).search}`

    const headers = {"Content-Type": "application/json"}
    if(token){
        headers.Authorization = `Bearer ${token}`
    }
    
    //const hasBody = !["GET", "HEAD"].includes(request.method)
    /*
    Si es una peticion get o head no llevan body asociado. Solo piden info, no llevan datos adjuntos
    Manejamos aqui esto para definir luego la peticion
    */
    let hasBody = true
    if(request.method === "GET" || request.method === "HEAD"){
        hasBody = false
    }

    //hacemos peticion al back -> nextjs hace de puente entre peticion y back
    const result = await fetch(url, {
        method: request.method,
        headers,
        body: hasBody ? await request.text() : undefined,
        cache: "no-store",
    })

    //devolvemos resultado al navegador
    /*
    - result.text() convierte a texto plano la info que se devuelve
    - si no hay ningun valor asociado a  'content-type' en header ponemos por default el 'application/json'
    */
    return new NextResponse(await result.text(), {
        status: result.status,
        headers: {"Content-Type": result.headers.get("Content-Type") ?? "application/json"},
    })

}

//indicamos a nextjs que el 'handler' se encargará de este tipo de peticiones
export { handler as GET, handler as POST, handler as PUT, handler as DELETE };

