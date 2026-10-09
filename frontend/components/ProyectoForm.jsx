"use client"

import Style from "./ClienteForm.module.css"
import { useEffect, useState } from "react"
import { useProyectoForm } from "@/app/hooks/useProyectoForm"
import { getAllClientes } from "@/services/api"

export default function ProyectoForm({ initialValues, proyectoId }) {
    
    const {
        formValues,
        errors,
        serverError,
        isSending,
        isSubmitted,
        isEdit,
        handleChange,
        handleSubmit,

    } = useProyectoForm({ initialValues, proyectoId })

    const [listaClientes, setListaClientes] = useState([])
    const [errorClientes, setErrorClientes] = useState("")

    useEffect(() => {
        let cancelado = false

        getAllClientes()
            .then(data => {
                if (!cancelado) setListaClientes(data)
            })
            .catch(err => {
                if (!cancelado) setErrorClientes(err.message)
            })

        return () => { cancelado = true }
    }, [])

    return (
        <>
            {isSubmitted && (
                <div className={Style.mensajeValidar}>Formulario enviado con éxito</div>
            )}

            {serverError && <p className={Style.errorEnvio}>{serverError}</p>}

            {isSending ? (
                <div className={Style.cargando}>
                    <svg fill="hsl(228, 97%, 42%)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                        width="48" height="48"
                    >
                        <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25" /><path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite" /></path>
                    </svg>
                </div>
            ) : (
                <div className={Style.formContainer}>
                    <h1>{ isEdit ? "Editar proyecto" : "Nuevo proyecto"}</h1>

                    <form className={Style.formulario} onSubmit={handleSubmit}>
                        <div>
                            <p>Cliente:</p>
                            <select
                                name="cliente_id"
                                value={formValues.cliente_id}
                                onChange={handleChange}
                            >
                                
                                <option value="">Selecciona un cliente</option>
                                {listaClientes.map(cliente => (
                                    <option key={cliente.id} value={cliente.id}>
                                        {cliente.nombre}
                                    </option>
                                ))}
                            </select>
                            {errorClientes && <p className={Style.errorForm}>{errorClientes}</p>}
                            {errors.cliente_id && <p className={Style.errorForm}>{errors.cliente_id}</p>}
                        </div>

                        <div>
                            <p>Nombre Proyecto:</p>
                            <input
                                type="text"
                                name="nombre"
                                value={formValues.nombre}
                                onChange={handleChange}
                            />
                            {errors.nombre && <p className={Style.errorForm}>{errors.nombre}</p>}
                        </div>

                        <div>
                            <p>Descripción:</p>
                            <input
                                type="text"
                                name="descripcion"
                                value={formValues.descripcion}
                                onChange={handleChange}
                                placeholder="Descripción:"
                            />
                            {errors.descripcion && <p className={Style.errorForm}>{errors.descripcion}</p>}
                        </div>

                        <div>
                            <p>Estado:</p>
                            <select name="estado" value={formValues.estado} onChange={handleChange}>
                                <option value="">Estado</option>
                                <option value="pendiente">Pendiente</option>
                                <option value="en_proceso">En proceso</option>
                                <option value="completado">Completado</option>
                            </select>
                            {errors.estado && <p className={Style.errorForm}>{errors.estado}</p>}
                        </div>

                        <div>
                            <p>Fecha de inicio:</p>
                            <input
                                type="date"
                                name="fecha_inicio"
                                value={formValues.fecha_inicio}
                                onChange={handleChange}
                            />
                            {errors.fecha_inicio && <p className={Style.errorForm}>{errors.fecha_inicio}</p>}
                        </div>

                        <div>
                            <p>Fecha de fin:</p>
                            <input
                                type="date"
                                name="fecha_fin"
                                value={formValues.fecha_fin}
                                onChange={handleChange}
                                min={formValues.fecha_inicio || undefined}
                            />
                            {errors.fecha_fin && <p className={Style.errorForm}>{errors.fecha_fin}</p>}
                        </div>

                        <button type="submit">{ isEdit ? "Guardar cambios" : "Crear proyecto"}</button>
                    </form>
                </div>
            )}
        </>
    )
}