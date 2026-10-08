const API_URL = process.env.NEXT_PUBLIC_API_URL;



export async function getClientes(page = 1, search = "") {

    const params = new URLSearchParams();

    params.set("page", page);

    if (search) {
        params.set("search", search)
    }

    const response = await fetch(`${API_URL}/api/clientes?${params.toString()}`)

    if (!response.ok) {
        throw new Error('No se puede obtener la lista de clientes')
    }

    return response.json()
}


export async function getClienteId(id) {

    const response = await fetch(`${API_URL}/api/clientes/${id}`)

    if (response.status === 404) return null;

    if (!response.ok) {
        throw new Error(`No se puede obtener al cliente con id ${id}`)
    }

    return response.json()
}


export async function createCliente(data) {
    const response = await fetch(`${API_URL}/api/clientes`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    console.log("STATUS:", response.status);
    console.log("RESULT:", JSON.stringify(result, null, 2));

    if (!response.ok) {
        const error = new Error(
            "No se ha podido crear el cliente"
        )

        error.errors = result.errors
        throw error
    }

    return result;
}


export async function updateCliente(id, data) {

    console.log("ID:", id);
    console.log("DATA:", data);
    console.log("JSON:", JSON.stringify(data));

    const response = await fetch(`${API_URL}/api/clientes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })

    const result = await response.json()

    //=====
    console.log("UPDATE STATUS:", response.status);
    console.log("UPDATE RESULT:", result);
    //=======

    if (!response.ok) {
        const error = new Error(
            "No se ha actualizado el cliente"
        )

        error.errors = result.errors
        throw error
    }


    return result
}



export async function getProyectos(page = 1) {

    const params = new URLSearchParams();
    params.set("page", page);

    const response = await fetch(`${API_URL}/api/proyectos?${params.toString()}`)

    if (!response.ok) {
        throw new Error('No se pueden obtener la lista de proyectos')
    }
    return response.json()
}


export async function getProyectosId(id) {

    const response = await fetch(`${API_URL}/api/proyectos/${id}`)

    if (response.status === 404) return null;

    if (!response.ok) {
        throw new Error(`No se puede obtener el proyecto con id ${id}`)
    }

    return response.json()
}


export async function getTareas() {
    const response = await fetch(`${API_URL}/api/tareas`)
    if (!response.ok) {
        throw new Error('No se pueden obtener la lista de tareas')
    }
    return response.json()
}