'use client';

import { useState } from "react";
import {createCliente} from "@/services/api"


export function useClienteForm() {
    const [formValues, setFormValues] = useState({
        nombre: "",
        cif: "",
        email: "",
        telefono: "",
        estado: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [serverError, setServerError] = useState("");


    const handleChange = (e) => {
        const { name, value } = e.target

        setFormValues({
            ...formValues,
            [name]: value
        })

        if(errors[name]){
            setErrors({
                ...errors,
                [name]: ''
            })
        }
    }

    const validateForm = () => {
        const localErrors = {};

        if (!formValues.nombre.trim())
            localErrors.nombre = "El nombre es obligatorio";
        if (!formValues.cif.trim()) localErrors.cif = "El CIF es obligatorio";

        if (!formValues.email.trim()) {
            localErrors.email = "El eMail es obligatorio";
        }

        if (formValues.estado !== "activo" && formValues.estado !== "inactivo") {
            localErrors.estado = "Debe seleccionar uno de los estados";
        }

        setErrors(localErrors);
        for (const error in localErrors) {
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setServerError("");


        if (validateForm()) {
            setIsSending(true);

            try {
                await createCliente(formValues);

                setIsSubmitted(true);

                setFormValues({
                    nombre: "",
                    cif: "",
                    email: "",
                    telefono: "",
                    estado: "",
                });
            } catch (error) {
                console.error(error);
                setServerError(error.message)
            } finally {
                setIsSending(false);
            }
        }
    }

    return {
        formValues,
        errors,
        serverError,
        isSending,
        isSubmitted,
        handleChange,
        handleSubmit
    }

}
