import { notFound } from "next/navigation";
import { getProyectosId } from "../../../services/api";

import Link from "next/link"
import Styles from "./page.module.css";

export default async function proyectoDetalle({ params }) {
    const { id } = await params;
    const proyecto = await getProyectosId(id);

    console.log("ID:", id);
    console.log("PROYECTO:", proyecto);

    if (!proyecto) notFound();

    return (
        <>
            <div className={Styles.detalleContainer}>

                <h1 className={Styles.titulo}>Detalles de proyecto</h1>

                <div className={Styles.proyectoTarjeta}>
                    <h2>{proyecto.nombre}</h2>
                    <p><strong>ID cliente:</strong> {proyecto.cliente_id}</p>
                    <p><strong>Descripcion:</strong> {proyecto.descripcion}</p>
                    <p><strong>Estado:</strong> {proyecto.estado}</p>
                    <p><strong>Inicio:</strong> {proyecto.fecha_inicio}</p>
                    <p><strong>Fin:</strong> {proyecto.fecha_fin}</p>

                </div>

                <Link href="/proyectos" className={Styles.botVolver}>Lista proyectos</Link>
            </div>
        </>
    );
}
