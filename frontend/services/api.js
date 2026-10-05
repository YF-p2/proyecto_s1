const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getClientes(){
    const response = await fetch(`${API_URL}/api/clientes`)

    if(!response.ok){
        throw new Error('No se pueden obtener la lista de clientes')
    }
    
    return response.json()
}

export async function createCliente(data){
    const response = await fetch(`${API_URL}/api/clientes`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json", //IDICAR AL BACK QUE ENVIAMOS DATOS EN JSON
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        throw new Error("No se ha podido crear el cliente");
    }

    return response.json();
    
}



export async function getProyectos(){
    const response = await fetch(`${API_URL}/api/proyectos`)
    if(!response.ok){
        throw new Error('No se pueden obtener la lista de proyectos')
    }
    return response.json()
}

export async function getTareas(){
    const response = await fetch(`${API_URL}/api/tareas`)
    if(!response.ok){
        throw new Error('No se pueden obtener la lista de tareas')
    }
    return response.json()
}