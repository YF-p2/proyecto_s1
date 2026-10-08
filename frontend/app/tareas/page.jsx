
"use client"

import { useEffect, useState } from "react"
import { getTareas } from "@/services/api"
import EstadoPag from "@/components/EstadoPag";

import Styles from "./page.module.css";

export default function tareas() {

    const [tareas, setTareas] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        setLoading(true)

        getTareas()
            .then(data => {
                setTareas(data)
                setError("")
            })

            .catch(err => {
                setTareas([]);
                setError(err.message);

            })

            .finally(() => {
                setLoading(false)
            })

    }, [])

    return (
        <>
            <h1 className={Styles.titulo}>Lista de tareas</h1>

            <div className={Styles.containertareas}>


                <EstadoPag
                    loading={loading}
                    error={error}
                    isEmpty={tareas.length === 0}
                    emptyMessage="No se encontraron tareas."
                > 
                    <table>
                        <thead>
                            <tr>
                                <th>ID Tarea</th>
                                <th>ID Proyecto </th>
                                <th>Titulo</th>
                                <th>Descripcion</th>
                                <th>Prioridad</th>
                                <th>Estado</th>
                                <th>Fecha Limite</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tareas.map(tarea => (

                                <tr key={tarea.id}>
                                    <td>{tarea.id}</td>
                                    <td>{tarea.proyecto_id}</td>
                                    <td>{tarea.titulo}</td>
                                    <td>{tarea.descripcion}</td>
                                    <td>{tarea.prioridad}</td>
                                    <td>{tarea.estado}</td>
                                    <td>{tarea.fecha_limite}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </EstadoPag>
            </div>
        </>



    )
}