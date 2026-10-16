
"use client";

import { useEffect, useState } from "react";
import { getClientes, getProyectos, getTareas } from "../services/api";
import "./globals.css"

export default function Home() {
    const [clientes, setClientes] = useState([]);
    const [proyectos, setProyectos] = useState([]);
    const [tareas, setTareas] = useState([]);
    const [error, setError] = useState({})

    useEffect(() => {
        getClientes()
            .then(data => {
                setClientes(data.total);
            })
            .catch(error => {
                setError(error.message);
            });
    }, []);

    useEffect(() => {
        getProyectos()
            .then(data => {
                setProyectos(data.total);
            })
            .catch(error => {
                setError(error.message);
            });
    }, []);

    useEffect(() => {
        getTareas()
            .then(data => {
                console.log("Datos de tareas recibidos:", data);
                setTareas(data.length);
            })
            .catch(error => {
                setError(error.message);
            });
    }, []);

    return (
        <>
            <main>
                <div className="containerGgeneraldata">
                    <p>Clientes de la plataforma: {clientes}</p>
                    <p>Proyectos en la plataforma: {proyectos}</p>
                    <p>Tareas en la plataforma: {tareas}</p>
                </div>
            </main>
        </>
    );
}
