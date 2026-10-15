import { notFound } from "next/navigation";
import { getClienteId } from "../../../services/apiServer";
import DeleteClienteBtn from "@/components/DeleteClienteBtn";

import Link from "next/link"
import Styles from "./page.module.css";

//con 'params' extraemos valores variables de la ruta de archivos/url -> params: {id: X}
export default async function ClienteDetalle({ params }) {

    //el valor del 'identificador' que queremos es el nombre de la carpeta "variable", es decir, [id]
    //  de ahí el propio Router sabe cual es la variable que queremos.
    const { id } = await params; // { x } debe coincidir con nombre de esa carpeta
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

                <div className={Styles.btnContainer}>
                    <Link href="/clientes" className={Styles.botVolver}>Lista Clientes</Link>
                    <DeleteClienteBtn
                        idDelete={id}
                        seccion="cliente"
                        direccion="/clientes"
                    />

                </div>

            </div>
        </>
    );
}
