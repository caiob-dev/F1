import { useState } from "react"
import rb21 from "../assets/rb21.png"
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useEffect } from "react";

export default function NotFound() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(true)


    useEffect(() => {
        const timer = setTimeout(()=> setLoading(false), 800)

        return () => clearTimeout(timer)
    }, [])

    if (loading) {
        return (
          <section className="min-h-dvh flex justify-center pt-5 text-2xl text-white">
           <LoadingSpinner/>
          </section>
        );
      } 

    return (
        <section className="flex flex-col items-center gap-10 pt-5">
           {error && (
               <p className="text-fundo-vermelho text-[20px]">Sorry, this page does not exist yet :(</p>
               )}
                <p className="text-blue-400 text-[20px]">But you can look this beautiful car 😍 </p>
            
                <img src={rb21} className="max-w-[90%]" alt="Red bull car"/>
                
        </section>
    )
}