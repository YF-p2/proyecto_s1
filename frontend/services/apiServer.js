import { cookies } from "next/headers"
import { API_INTERNAL } from "./config"
import { redirect } from "next/navigation"


async function serverFetch(path) {
    const token = (await cookies()).get("token")?.value
    return fetch(`${API_INTERNAL}/api/${path}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        cache: "no-store",
    })
}

export async function getClienteId(id) {
    const response = await serverFetch(`/clientes/${id}`)

    if (response.status === 404) return null;

    if (response.status === 401) redirect("/login");
    if (response.status === 403) throw new Error("No tienes permiso para ver este recurso");

    if (!response.ok) {
        throw new Error(`No se puede obtener al cliente con id ${id}`)
    }

    return response.json()
}


export async function getProyectosId(id) {
    const response = await serverFetch(`/proyectos/${id}`)

    if (response.status === 404) return null;

    if (response.status === 401) redirect("/login");
    if (response.status === 403) throw new Error("No tienes permiso para ver este recurso");

    if (!response.ok) {
        throw new Error(`No se puede obtener el proyecto con id ${id}`)
    }


    return response.json()
}