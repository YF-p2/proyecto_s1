import ClienteForm from "@/components/ClienteForm";
import { getClienteId } from "@/services/api";
import { notFound } from "next/navigation";

export default async function EditarCliente({ params }) {

    const { id } = await params;
    const cliente = await getClienteId(id);

    if (!cliente) {
        return notFound();
    }

    return (

        <ClienteForm
            clienteId = {id}
            initialValues={{
                nombre: cliente.nombre,
                cif: cliente.cif,
                email: cliente.email,
                telefono: cliente.telefono,
                estado: cliente.estado,
            }}
        />
    );
}

