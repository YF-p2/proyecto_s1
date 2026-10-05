"use client";
import Navbar from "../components/NavBar";

export default function Layout({ children }) {
    return (
        <html lang="es">
            <body>
                <Navbar />
                {children}

            </body>
        </html>
    );
}