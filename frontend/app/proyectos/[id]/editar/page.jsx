import ProyectoForm from "@/components/ProyectoForm";
import { getProyectosId } from "@/services/api";
import { notFound } from "next/navigation";

export default async function Editarproyecto({ params }) {

    const { id } = await params;
    const proyecto = await getProyectosId(id);

    if (!proyecto) {
        return notFound();
    }

    return (

        <ProyectoForm
            proyectoId = {id}
            initialValues={{
                cliente_id: proyecto.cliente_id,
                nombre: proyecto.nombre,
                descripcion: proyecto.descripcion,
                estado: proyecto.estado,
                fecha_inicio: proyecto.fecha_inicio,
                fecha_fin: proyecto.fecha_fin,
            }}
        />
    );
}

