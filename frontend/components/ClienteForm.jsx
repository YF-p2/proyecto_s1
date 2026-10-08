"use client"

import Style from "./ClienteForm.module.css"
import { useClienteForm } from "@/app/hooks/useClienteForm"



export default function ClienteForm({initialValues, clienteId}) {

    const {
        formValues,
        errors,
        serverError,
        isSending,
        isSubmitted,
        isEditing,
        handleChange,
        handleSubmit,

    } = useClienteForm({ initialValues, clienteId })


    return (
        <>
            {isSubmitted && (
                <div className={Style.mensajeValidar}>Formulario enviado con éxito</div>
            )}

            {serverError && (
                <p className={Style.errorEnvio}>{serverError}</p>
            )}

            {isSending ? (
                <div className={Style.cargando}>
                    <svg fill="hsl(228, 97%, 42%)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                        width="48" height="48"
                    >
                        <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25" /><path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite" /></path>
                    </svg>
                </div>
            ) : (
                <div className={Style.formContainer}>
                    <h1>Formulario de usuario</h1>

                    <form
                        action=""
                        method="post"
                        className={Style.formulario}
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <p>Usuario:</p>
                            <input
                                type="text"
                                name="nombre"
                                value={formValues.nombre}
                                onChange={handleChange}
                                placeholder="Nombre de usuario:"
                            />
                            {errors.nombre && (
                                <p className={Style.errorForm}>{errors.nombre}</p>
                            )}
                        </div>

                        <div>
                            <p>CIF:</p>
                            <input
                                type="text"
                                name="cif"
                                value={formValues.cif}
                                onChange={handleChange}
                                placeholder="CIF:"
                            />
                            {errors.cif && <p className={Style.errorForm}>{errors.cif}</p>}
                        </div>

                        <div>
                            <p>Correo electrónico:</p>
                            <input
                                type="email"
                                name="email"
                                value={formValues.email}
                                onChange={handleChange}
                                placeholder="Correo electronico:"
                            />
                            {errors.email && (
                                <p className={Style.errorForm}>{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <p>Teléfono</p>
                            <input
                                type="tel"
                                name="telefono"
                                value={formValues.telefono}
                                onChange={handleChange}
                                placeholder="Teléfono:"
                            />
                            {errors.telefono && (
                                <p className={Style.errorForm}>{errors.telefono}</p>
                            )}
                        </div>

                        <div className={Style.selectContainer}>
                            <select
                                name="estado"
                                value={formValues.estado}
                                onChange={handleChange}
                            >
                                <option value="">Estado</option>
                                <option value="activo">Activado</option>
                                <option value="inactivo">Inactivo</option>
                            </select>
                        </div>
                        {errors.estado && (
                            <p className={Style.errorForm}>{errors.estado}</p>
                        )}

                        <button type="submit">Enviar</button>
                    </form>
                </div>
            )}
        </>
    )
}
