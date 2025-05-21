"use client"
import { useCallback, useState } from "react"

const useLoading = (initial=false) => {
    const [loading,setLoading] = useState(initial)
    
    const stopLoading = useCallback(() => setLoading(false),[])
    const startLoading = useCallback(() => setLoading(true),[])

    return {loading,stopLoading,startLoading}
}

export default useLoading