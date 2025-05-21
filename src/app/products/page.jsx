"use client"
import LoadingComponent from "@/components/loadingComponent"
import NotifComponent from "@/components/notifComponent"
import useLoading from "@/hooks/useLoading"
import useNotif from "@/hooks/useNotif"
import { convertCurrentcy } from "@/utils/helper"
import { supabase } from "@/utils/supabase"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const ProductPage = () => {
    const { loading, stopLoading, startLoading } = useLoading()
    const { notif, activeNotif, deactiveNotif } = useNotif()
    const [product, setProduct] = useState([])
    const router = useRouter()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            startLoading()
            const { data, error } = await supabase.from("products").select("*")

            if (error) throw error
            else {
                activeNotif("success get data","success")
                setProduct(data)
            }
        } catch (error) {
            activeNotif("failed fetch data","error")
        } finally {
            setTimeout(() => {
                deactiveNotif()
                stopLoading()
            }, 1000)
        }
    }

    return (
        <>
            <div className="w-full min-h-screen relative px-12">
                {loading && (
                    <LoadingComponent />
                )}

                {notif.status && (
                    <NotifComponent status={notif.message} value={notif.value} />
                )}

                <div className="px-4 pt-4">
                    <button onClick={() => router.push(`/products/create`)} className="py-2 px-3 bg-amber-900 rounded font-semibold hover:scale-105 duration-300 hover:cursor-pointer">Add Menu</button>
                </div>
                {!loading && !notif.status && (
                    <>
                        <div className="w-full h-full p-4 grid grid-cols-4 gap-2">
                            {product.map((row) => {
                                return(
                                    <div key={row.id} className="bg-amber-400 text-black text-right p-2 rounded flex flex-col">
                                        <span>{row.name}</span>
                                        <span>{convertCurrentcy(row.price * 1000)}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default ProductPage