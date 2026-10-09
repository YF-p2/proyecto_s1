import { notFound } from "next/navigation";
import { getProyectosId } from "@/services/api";
import DeleteClienteBtn from "@/components/DeleteClienteBtn";

import Link from "next/link"
import Styles from "./page.module.css"

export default async function ProyectoDetalle({ params }) {
    const { id } = await params;
    const proyecto = await getProyectosId(id);

    console.log("ID:", id);
    console.log("proyecto:", proyecto);

    if (!proyecto) notFound();

    return (
        <>
            <div className={Styles.detalleContainer}>

                <h1 className={Styles.titulo}>Detalles de proyecto</h1>

                <div className={Styles.proyectoTarjeta}>
                    <h2>{proyecto.nombre}</h2>
                    <p><strong>ID proyecto:</strong> {proyecto.id}</p>
                    <p><strong>Descripcion:</strong> {proyecto.descripcion}</p>
                    <p><strong>Estado:</strong> {proyecto.estado}</p>
                    <p><strong>Inicio:</strong> {proyecto.fecha_inicio}</p>
                    <p><strong>Fin:</strong> {proyecto.fecha_fin}</p>

                    <Link href={`/proyectos/${proyecto.id}/editar`} className={Styles.botEdit}>
                        Editar datos
                    </Link>
                </div>

                <div className={Styles.btnContainer}>
                    <Link href="/proyectos" className={Styles.botVolver}>Lista Proyectos</Link>
                    <DeleteClienteBtn
                        idDelete={id}
                        seccion="proyecto"
                        direccion="/proyectos"
                    />

                </div>

            </div>
        </>
    );
}
