"use client";

import { useEffect, useState } from "react";
import { getClientes } from "../../services/api";
import { useSearchParams } from "next/navigation";
import { useSearchForm } from "../hooks/useSearchCliente";

import Styles from "./page.module.css";
import Pagination from "../../components/Pagination";
import Link from "next/link"
import EstadoPag from "@/components/EstadoPag";



export default function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [pagination, setPagination] = useState(null)
    const [error, setError] = useState(null);
    const [loadedKey, setLoadedKey] = useState(null);

    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const search = searchParams.get("search") || "";

    const key = `${page}|${search}`;
    const loading = loadedKey !== key;

    useEffect(() => {
        let cancelado = false;

        getClientes(page, search)
            .then(data => {
                if (cancelado) return;
                if (search) {
                    setClientes([data]);
                    setPagination(null);
                    setError("");
                } else {
                    setClientes(data.data);
                    setPagination(data);
                    setError("");
                }
            })
            .catch(err => {
                if (cancelado) return;
                setClientes([]);
                setPagination(null);
                setError(err.message);
            })
            .finally(() => {
                if (!cancelado) setLoadedKey(key);
            });

        return () => { cancelado = true; };
    }, [page, search, key]);



    const {
        search: searchInput,
        handleChange,
        handleSubmit
    } = useSearchForm();



    return (
        <>

            <h1 className={Styles.tituloPag}>Clientes</h1>
            <div className={Styles.opcionesContainer}>

                <Link
                    href={`/clientes/nuevo`}
                    className={Styles.botNuevo}
                >
                    Nuevo
                </Link>

                <form onSubmit={handleSubmit}>
                    <input
                        type="search"
                        placeholder="Buscar cliente por CIF"
                        value={searchInput}
                        onChange={handleChange}
                    />
                </form>
            </div>


            <div className={Styles.containerClientes}>
                <EstadoPag
                    loading={loading}
                    error={error}
                    isEmpty={clientes.length === 0}
                    emptyMessage="No se encontraron tareas."
                >
                    {clientes.map(cliente => (
                        <Link key={cliente.id} href={`/clientes/${cliente.id}`}>
                            <div className={Styles.unCliente}>
                                <p>{cliente.nombre}</p>
                                <p>DNI/CIF: {cliente.cif}</p>
                                <br />
                            </div>
                        </Link>
                    ))}
                </EstadoPag>
            </div>

            {pagination && (
                <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                />
            )}
        </>
    );
}