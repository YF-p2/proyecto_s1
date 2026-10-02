const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getClientes(){
    const response = await fetch(`${API_URL}/api/clientes`)

    if(!response.ok){
        throw new Error('No se pueden obtener la lista de clientes')
    }
    
    return response.json()
}