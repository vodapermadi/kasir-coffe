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
                activeNotif("success get data", "success")
                setProduct(data)
            }
        } catch (error) {
            activeNotif("failed fetch data", "error")
        } finally {
            setTimeout(() => {
                deactiveNotif()
                stopLoading()
            }, 1000)
        }
    }

    const handleDelete = async(id) => {
        try {
            startLoading()
            const {data,error} = await supabase.from("products").delete().eq("id",id)
            if (error) throw error
            else {
                activeNotif("success delete data", "success")
                setProduct(data)
            }
        } catch (error) {
            activeNotif("failed fetch data", "error")
        }finally {
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        }
    }

    const handleAction = (id) => {
        router.push(`/products/actions/${id}`)
    }

    return (
        <>
            <div className="w-full flex min-h-screen justify-center relative">
                <div className="w-3/4">
                    {loading && (
                        <LoadingComponent />
                    )}

                    {notif.status && (
                        <NotifComponent status={notif.message} value={notif.value} />
                    )}

                    <div className="pt-4">
                        <button onClick={() => router.push(`/products/actions`)} className="py-2 px-3 bg-amber-900 rounded font-semibold hover:scale-105 duration-300 hover:cursor-pointer">Add Menu</button>
                    </div>
                    {!loading && !notif.status && (
                        <>
                            <div className="w-full py-4 grid grid-cols-4 gap-2">
                                {product.map((row) => {
                                    return (
                                        <div key={row.id} className="bg-amber-400 text-black text-right p-2 rounded flex flex-col">
                                            <span>{row.name}</span>
                                            <span>{convertCurrentcy(row.price * 1000)}</span>
                                            <div className="w-full flex gap-2 px-2 mt-3">
                                                <button onClick={() => handleDelete(row.id)} className="w-1/2 flex justify-center items-center py-1 rounded bg-red-600 hover:bg-red-800 duration-300 hover:cursor-pointer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                        <path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 11v6m-4-6v6M6 7v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7M4 7h16M7 7l2-4h6l2 4"></path>
                                                    </svg>
                                                </button>
                                                <button onClick={() => handleAction(row.id)} className="w-1/2 flex justify-center items-center py-1 rounded bg-blue-600 hover:bg-blue-800 duration-300 hover:cursor-pointer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 48 48">
                                                        <path fill="#fff" d="M32.206 6.025a6.907 6.907 0 1 1 9.768 9.767L39.77 18L30 8.23zM28.233 10L8.038 30.197a6 6 0 0 0-1.572 2.758L4.039 42.44a1.25 1.25 0 0 0 1.52 1.52l9.487-2.424a6 6 0 0 0 2.76-1.572l20.195-20.198z"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default ProductPage