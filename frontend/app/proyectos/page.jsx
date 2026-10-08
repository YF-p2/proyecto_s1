"use client"


import { useEffect, useState } from "react"
import { getProyectos } from "@/services/api"
import { useSearchParams } from "next/navigation";

import Pagination from "@/components/Pagination";
import Styles from "./page.module.css";
import Link from "next/link";
import EstadoPag from "@/components/EstadoPag";

export default function Proyectos() {

    const [proyectos, setProyectos] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [error, setError] = useState(null);
    const [loadedKey, setLoadedKey] = useState(null);


    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;

    const key = `${page}`;
    const loading = loadedKey !== key;

    useEffect(() => {

        getProyectos(page)
            .then(data => {
                setProyectos(data.data)
                setPagination(data);
                setError("")
                setLoadedKey(key)
            })

            .catch(err => {
                setProyectos([]);
                setPagination(null);
                setError(err.message);
                setLoadedKey(key);

            })

    }, [page])

    return (
        <>
            <h1 className={Styles.titulo}>Lista de Proyectos</h1>

            <div className={Styles.containerProyectos}>
                <EstadoPag
                    loading={loading}
                    error={error}
                    isEmpty={proyectos.length === 0}
                    emptyMessage="No se encontraron tareas."
                >
                    {proyectos.map(proy => (

                        <div className={Styles.unProyecto} key={proy.id}>
                            <p>{proy.nombre}</p>
                            <p>Estado: {proy.estado}</p>

                            <Link href={`/proyectos/${proy.id}`} className={Styles.btnDetalles}>
                                Detalles
                            </Link>
                        </div>
                    ))}
                </EstadoPag>
            </div>

            {pagination && (
                <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    myPath="/proyectos"
                />
            )}

        </>



    )
}