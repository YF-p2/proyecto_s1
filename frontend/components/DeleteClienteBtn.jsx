"use client"

import  deleteCliente  from "@/services/api";
import  { deleteProyecto }  from "@/services/api";

import { useState } from "react"
import { useRouter } from "next/navigation";
import Style from "./DeleteClienteBtn.module.css"


export default function DeleteClienteBtn({
    idDelete,
    seccion,
    direccion,
}) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();


    const handleDelete = async () => {

        const aceptar = window.confirm("¿Seguro que desea eliminar a este cliente?")

        if (!aceptar) return

        setLoading(true)
        setError("")

        try {
            if (seccion === "cliente") {
                await deleteCliente(idDelete)
            }

            else if (seccion === "proyecto") {
                await deleteProyecto(idDelete)
            }

            else {
                throw new Error("La seccion introducida no coincide")
            }

            if (direccion) {
                router.push(direccion)
            }

            router.refresh()

        } catch (err) {
            setError(err.message)

        } finally {
            setLoading(false)
        }

    }


    return (
        <div>
            <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className={Style.btnBorrar}
            >
                Eliminar {seccion}
            </button>

            {error && <p>{error}</p>}
        </div>

    )

}