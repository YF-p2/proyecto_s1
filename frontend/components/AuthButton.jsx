"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AuthButton({isLogged}){
    const router = useRouter()

    const handleLogout = async () =>{
        await fetch("/api/auth/logout", {method: "POST"})
        router.push("/login")
        router.refresh()
    }

    if(!isLogged){
        return <Link href="/login">Login</Link>
    }

    return <Link href="/login" onClick={handleLogout}>Logout</Link>
}