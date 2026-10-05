"use client";

import { useEffect, useState } from "react";
import { getClientes } from "../../services/api";
import Styles from "./page.module.css";

export default function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [pagination, setPagination] = useState(null)
    const [error, setError] = useState(null);

    useEffect(() => {
        getClientes()
            .then(data => {
                setClientes(data.data); //datos concretos de los clientes
                setPagination(data)
            })
            .catch(error => {
                setError(error.message);
            });
    }, []);

    return (
        <>
        
        <h1>Clientes</h1>
        <div className={Styles.containerClientes}>
            

            {error && <p>{error}</p>}

            {clientes.map(cliente => (
                <div key={cliente.id} className={Styles.unCliente}>
                    <p>{cliente.nombre}</p>
                    <p>DNI:{cliente.cif}</p>
                    <br></br>
                </div>
                
            ))}
        </div>
        </>
    );
}