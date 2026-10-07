"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export function useSearchForm(){

    const [search, setSearch] = useState("");
    const router = useRouter();

    const handleChange = (e) =>{
        
        const valor = e.target.value
        setSearch(valor)

        if(valor === ""){
            router.push("/clientes")
        }
    }



    const handleSubmit = (e) =>{
        e.preventDefault()
        
        const params = new URLSearchParams();

        if(search.trim()){
            params.set("search", search.trim())
            router.push(`/clientes?${params.toString()}`);
        }else{
            router.push("/clientes")
        }

        
    }

    return {
        search,
        handleChange,
        handleSubmit
    }
}