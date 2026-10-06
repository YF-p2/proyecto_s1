"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export function useSearchForm(){
    const [search, setSearch] = useState("");
    const router = useRouter();

    const handleChange = (e) =>{
        setSearch(e.target.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        
        const params = new URLSearchParams();

        if(search.trim()){
            params.set("search", search.trim())
        }

        router.push(`/clientes?${params.toString()}`)
    }

    return {
        search,
        handleChange,
        handleSubmit
    }
}