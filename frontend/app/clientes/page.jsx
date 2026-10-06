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

    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const search = searchParams.get("search") || "";

    useEffect(() => {

        getClientes(page, search)
            .then(data => {
                if (search) {
                    if (data) {
                        setClientes([data]);
                        setPagination(1);
                        setError('');
                    } else {
                        setClientes([]);
                        setPagination(null);
                        setError("CIF no encontrado");
                    }

                } else {
                    setClientes(data.data); //datos concretos de los clientes
                    setPagination(data)
                    setError('')
                }

            })
            .catch(error => {
                setClientes([]);
                setPagination(null);
                setError(error.message);
            });

    }, [page, search]);


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


                {error &&
                    <div className={Styles.containerError}>
                        <p className={Styles.errorMessage}>{error}</p>

                        <Link href="/clientes" >Limpiar búsqueda</Link>
                    </div>
                }


                {clientes.map(cliente => (
                    <div key={cliente.id} className={Styles.unCliente}>
                        <p>{cliente.nombre}</p>
                        <p>DNI:{cliente.cif}</p>
                        <br></br>
                    </div>

                ))}

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