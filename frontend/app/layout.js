import Navbar from "../components/NavBar";
import { cookies } from "next/headers";

export default async function Layout({ children }) {

    const isLogged = ((await cookies()).get("token")?.value)

    return (
        <html lang="es">
            <body>
                <Navbar isLogged={isLogged}/>
                {children}

            </body>
        </html>
    );
}