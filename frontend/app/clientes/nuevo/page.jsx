"use client";

import ClienteForm from "@/components/ClienteForm";
import { createCliente } from "@/services/api"; 

export default function NuevoCliente() {

    return (
        <ClienteForm
            onSubmit={createCliente}
            resetValues={true}
        />
    )
}
