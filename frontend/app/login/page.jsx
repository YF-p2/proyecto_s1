"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import Styles from "./page.module.css"

export default function LoginPage() {

    const router = useRouter()
    const [isSending, setIsSending] = useState(false)
    const [valuesForm, setValuesForm] = useState({ email: "", password: "" })
    const [errors, setErrors] = useState({})
    const [serverError, setServerError] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target

        setValuesForm((prev) => ({
            ...prev,
            [name]: value
        }))

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: ""
            }))
        }
    }


    const validation = () => {
        const localMessage = {}
        if (!valuesForm.email.trim() === "") {
            localMessage.email = "El correo es obligatorio"
        }

        if (!valuesForm.password.trim() === "") {
            localMessage.password = "La contraseña es obligatoria"
        }

        setErrors(localMessage)
        return Object.keys(localMessage).length === 0
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        setServerError("")
        if (!validation()) return

        setIsSending(true)
        try {
            const result = await fetch("api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(valuesForm),
            })

            const data = await result.json().catch({})

            if (!result.ok) {
                setServerError(data.message ?? "No se ha podido iniciar sesión")
                return
            }

            router.push("/")
            router.refresh()

        } catch {
            setServerError(errors.message);
        } finally {
            setIsSending(false);
        }
    }

    return (
        <>
            <div className={Styles.formContainer}>
                {serverError && (<p className={Styles.errorEnvio}>{serverError}</p>)}
                <h1>Iniciar sesión</h1>


                <form action="" onSubmit={handleSubmit} className={Styles.miForm}>

                    <div className={Styles.formValueContainer}>
                        <label htmlFor="email">Correo:</label>
                        <input type="email" name="email" placeholder="minombre@correo.es"
                            required value={valuesForm.email} onChange={handleChange}
                        />
                        {errors.email && (
                            <p className={Styles.errorForm}>{errors.email}</p>
                        )}
                    </div>

                    <div className={Styles.formValueContainer}>
                        <label htmlFor="password">Contraseña:</label>
                        <input type="password" name="password" required
                            value={valuesForm.password} onChange={handleChange}
                        />
                        {errors.password && (
                            <p className={Styles.errorForm}>{errors.password}</p>
                        )}
                    </div>

                    <button type="submit" disabled={isSending} className={Styles.btnEnvio}>
                        {isSending ? "Entrando..." : "Iniciar Sesión"}
                    </button>
                </form>
            </div>

        </>
    )

}