import { notFound } from "next/navigation";
import { getClienteId } from "../../../services/api";

import Link from "next/link"
import Styles from "./page.module.css";

export default async function ClienteDetalle({ params }) {
    const { id } = await params;
    const cliente = await getClienteId(id);

    console.log("ID:", id);
    console.log("CLIENTE:", cliente);

    if (!cliente) notFound();

    return (
        <>
            <div className={Styles.detalleContainer}>

                <h1 className={Styles.titulo}>Detalles de cliente</h1>

                <div className={Styles.clienteTarjeta}>
                    <h2>{cliente.nombre}</h2>
                    <p>CIF: {cliente.cif}</p>
                    <p>Email: {cliente.email}</p>
                    <p>Teléfono: {cliente.telefono}</p>
                    <p>Estado: {cliente.estado}</p>

                    <Link href={`/clientes/${cliente.id}/editar`} className={Styles.botEdit}>
                        Editar datos
                    </Link>

                </div>

                <Link href="/clientes" className={Styles.botVolver}>Lista Clientes</Link>
            </div>
        </>
    );
}
