"use client";

import Style from "./page.module.css";
import { useClienteForm } from "@/app/hooks/useClienteForm";

export default function NuevoCliente() {
    const {
        formValues,
        errors,
        serverError,
        isSending,
        isSubmitted,
        handleChange,
        handleSubmit,
    } = useClienteForm();

    return (
        <>
            {isSubmitted && (
                <div className={Style.mensajeValidar}>Formulario enviado con éxito</div>
            )}

            {serverError && (
                <p className={Style.errorEnvio}>{serverError}</p>
            )}

            {isSending ? (
                <div className={Style.cargando}>Enviando datos...</div>
            ) : (
                <div className={Style.formContainer}>
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
    );
}
