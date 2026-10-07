'use client';

import { useState } from "react";
import { updateCliente, createCliente } from "@/services/api"


const VALORES_VACIOS = {
    nombre: "",
    cif: "",
    email: "",
    telefono: "",
    estado: "",
};

export function useClienteForm({ initialValues = VALORES_VACIOS, clienteId = null, resetValues = false }) {

    const isEdit = clienteId !== null;
    const [formValues, setFormValues] = useState(initialValues);

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

        if (errors[name]) {
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
        setErrors({})
        setIsSubmitted(false)

        if (!validateForm()) return;

        setIsSending(true);


        try {
            if (isEdit) {
                await updateCliente(clienteId, formValues);
            } else {
                await createCliente(formValues);
                setFormValues(VALORES_VACIOS); // solo vaciamos al crear
            }
            setIsSubmitted(true);

        } catch (error) {

            if (error.errors) {
                setErrors(error.errors);
                setServerError("");
            } else {
                setServerError(error.message);
            }
        } finally {
            setIsSending(false);
        }

    }

    return {
        formValues,
        errors,
        serverError,
        isSending,
        isSubmitted,
        isEdit,
        handleChange,
        handleSubmit
    }

}
