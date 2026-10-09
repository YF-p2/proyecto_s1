"use client"

import { useState } from "react"
import { createProyecto, updateProyecto } from "@/services/api"
import { useRouter } from "next/navigation"

const VALORES_VACIOS = {
    cliente_id: "",
    nombre: "",
    descripcion: "",
    estado: "",
    fecha_inicio: "",
    fecha_fin: "",
} 

const ESTADOS = ["pendiente", "en_proceso", "completado"]

export  function useProyectoForm({ initialValues = VALORES_VACIOS, proyectoId = null}){

    const isEdit = proyectoId !== null
    const router =  useRouter()

    const [formValues, setFormValues] = useState(initialValues) 
    const [errors, setErrors] = useState({}) 
    const [isSubmitted, setIsSubmitted] = useState(false) 
    const [isSending, setIsSending] = useState(false) 
    const [serverError, setServerError] = useState("") 


    const handleChange = (e) =>{
        const {name, value} = e.target

        setFormValues((prev) => ({
            ...prev,
            [name]: value
        }))

        if(errors[name]){
            setErrors((prev) => ({
                ...prev,
                [name]: ""
            }))
        }

    }


    const validarForm = () =>{
        const localErrors = {} 

        if (!formValues.cliente_id) {
            localErrors.cliente_id = "Debe seleccionar un cliente" 
        }

        if (!formValues.descripcion.trim()) {
            localErrors.descripcion = "La descripción es obligatoria" 
        }

        if (!ESTADOS.includes(formValues.estado)) {
            localErrors.estado = "Debe seleccionar uno de los estados" 
        }

        if (!formValues.fecha_inicio) {
            localErrors.fecha_inicio = "La fecha de inicio es obligatoria" 
        }

        if (!formValues.fecha_fin) {
            localErrors.fecha_fin = "La fecha de fin es obligatoria" 
        } else if (formValues.fecha_inicio && formValues.fecha_fin < formValues.fecha_inicio) {
            // YYYY-MM-DD se compara bien como texto
            localErrors.fecha_fin = "La fecha de fin no puede ser anterior a la de inicio" 
        }

        setErrors(localErrors) 
        return Object.keys(localErrors).length === 0 
    }

     const handleSubmit = async (e) => {
        e.preventDefault() 

        setServerError("") 
        setErrors({}) 
        setIsSubmitted(false) 

        if (!validarForm()) return 

        setIsSending(true) 

        try {
            if (isEdit) {
                await updateProyecto(proyectoId, formValues) 
                router.push(`/proyectos/${proyectoId}`)
            } else {
                await createProyecto(formValues) 
                setFormValues(VALORES_VACIOS)  
            }
            setIsSubmitted(true) 

        } catch (error) {
            if (error.errors) {
                setErrors(error.errors) 
                setServerError("") 
            } else {
                setServerError(error.message) 
            }
        } finally {
            setIsSending(false) 
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