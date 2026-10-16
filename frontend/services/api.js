const API_URL = "/api/proxy";

export async function getClientes(page = 1, search = "") {

    const params = new URLSearchParams();

    params.set("page", page);

    if (search) {
        params.set("search", search)
    }

    const response = await fetch(`${API_URL}/clientes?${params.toString()}`)

    if (!response.ok) {
        throw new Error('No se puede obtener la lista de clientes')
    }

    return response.json()
}


export async function getAllClientes() {
    const response = await fetch(`${API_URL}/clientes/all`)

    if (!response.ok) {
        throw new Error('No se puede obtener la lista de con todos los clientes')
    }

    return response.json()
}



/*
export async function getClienteId(id) {

    const response = await fetch(`${API_URL}/clientes/${id}`)

    if (response.status === 404) return null;

    if (!response.ok) {
        throw new Error(`No se puede obtener al cliente con id ${id}`)
    }

    return response.json()
}
*/

export async function createCliente(data) {
    const response = await fetch(`${API_URL}/clientes`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    if (response.status === 400) {
        const result = await response.json()
        const error = new Error("Datos no válidos")
        error.errors = result.errors
        throw error
    }
    const result = await response.json();

    console.log("STATUS:", response.status);
    console.log("RESULT:", JSON.stringify(result, null, 2));

    await checkAuth(response, "No se ha podido crear el cliente");
    return response.json();
}


export async function updateCliente(id, data) {

    console.log("ID:", id);
    console.log("DATA:", data);
    console.log("JSON:", JSON.stringify(data));

    const response = await fetch(`${API_URL}/clientes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })

    if (response.status === 400) {
        const result = await response.json()
        const error = new Error("Datos no válidos")
        error.errors = result.errors
        throw error
    }

    await checkAuth(response, "No se ha actualizado el cliente");
    return response.json();


}


export default async function deleteCliente(id) {
    const response = await fetch(`${API_URL}/clientes/${id}`, {
        method: "DELETE",
    });

    await checkAuth(response, "No se ha podido eliminar el cliente");
    return response.json();
}


export async function getProyectos(page = 1) {

    const params = new URLSearchParams();
    params.set("page", page);

    const response = await fetch(`${API_URL}/proyectos?${params.toString()}`)


    await checkAuth(response, "No se pueden obtener la lista de proyectos");
    return response.json();
}



/*
export async function getProyectosId(id) {

    const response = await fetch(`${API_URL}/proyectos/${id}`)

    if (response.status === 404) return null;

    if (!response.ok) {
        throw new Error(`No se puede obtener el proyecto con id ${id}`)
    }

    return response.json()
}
*/


export async function createProyecto(data) {
    const response = await fetch(`${API_URL}/proyectos`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    if (response.status === 400) {
        const result = await response.json()
        const error = new Error("Datos no válidos")
        error.errors = result.errors
        throw error
    }

    console.log("STATUS:", response.status);
    console.log("RESULT:", JSON.stringify(result, null, 2));

    await checkAuth(response, "No se ha podido crear el proyecto");
    return response.json();
}



export async function updateProyecto(id, data) {
    const response = await fetch(`${API_URL}/proyectos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })

    if (response.status === 400) {
        const result = await response.json()
        const error = new Error("Datos no válidos")
        error.errors = result.errors
        throw error
    }

    await checkAuth(response, "No se ha actualizado el proyecto");
    return response.json();

}


export async function deleteProyecto(id) {
    const response = await fetch(`${API_URL}/proyectos/${id}`, {
        method: "DELETE",
    });

    await checkAuth(response, "No se ha podido eliminar el proyecto");
    return response.json();

}


export async function getTareas() {
    const response = await fetch(`${API_URL}/tareas`)

    await checkAuth(response, "No se ha podido eliminar el proyecto");
    return response.json();
}


async function checkAuth(response, mensaje) {
    if (response.status === 401) {
        window.location.href = "/login";
        throw new Error("Sesión caducada");
    }
    if (response.status === 403) {
        throw new Error("No tienes permiso para realizar esta acción");
    }
    if (!response.ok) {
        throw new Error(mensaje);
    }
}