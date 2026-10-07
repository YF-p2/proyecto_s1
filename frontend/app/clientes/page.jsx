"use client";

import { useEffect, useState } from "react";
import { getClientes } from "../../services/api";

import Styles from "./page.module.css";
import Pagination from "../../components/Pagination";
import { useSearchParams } from "next/navigation";
import Link from "next/link"
import { useSearchForm } from "../hooks/useSearchCliente";



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
                {loading ? (
                    <div className={Styles.containerLoading}>
                        <svg fill="hsl(228, 97%, 42%)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                            width="48" height="48"
                        >
                            <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25" /><path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite" /></path>
                        </svg>
                    </div>
                ) : error ? (
                    <div className={Styles.containerError}>
                        <p className={Styles.errorMessage}>{error}</p>
                        <Link href="/clientes">Limpiar búsqueda</Link>
                    </div>
                ) : clientes.length > 0 ? (
                    clientes.map(cliente => (
                        <Link key={cliente.id} href={`/clientes/${cliente.id}`}>
                            <div  className={Styles.unCliente}>
                                <p>{cliente.nombre}</p>
                                <p>DNI/CIF: {cliente.cif}</p>

                                <br />
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No se encontraron clientes.</p>
                )}
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