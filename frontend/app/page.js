/*import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className={styles.intro}>
          <h1>
            To get started, edit the{" "}
            <code className={styles.code}>page.js</code> file.
          </h1>
          <p>
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={14}
            />
            Deploy Now
          </a>
          <a
            className={styles.secondary}
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
*/

"use client";

import { useEffect, useState } from "react";
import { getClientes } from "../services/api";

export default function Home() {
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
        <main>
            <h1>Clientes</h1>

            {error && <p>{error}</p>}

            {clientes.map(cliente => (
                <div key={cliente.id}>
                    <p>{cliente.nombre}</p>
                    <p>DNI:{cliente.cif}</p>
                    <br></br>
                </div>
                
            ))}
        </main>
    );
}