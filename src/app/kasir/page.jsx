"use client"

import { convertCurrentcy } from "@/utils/helper"
import { supabase } from "@/utils/supabase"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const CashierPage = () => {
    const [mode, setMode] = useState("select_menu")
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    const router = useRouter()

    useEffect(() => {
        const getMenu = async () => {
            try {
                const { data, error } = await supabase
                    .from("products")
                    .select("*, categories(*)")
    
                if (error) throw error
                setProducts(data)
            } catch (error) {
                alert(error.message)
            }
        }

        return () => getMenu()
    }, [])

    const changeMode = (name, data = null) => {
        if (name === "checkout") {
            const existingItem = cart.find((item) => item.id === data.id)
            if (!existingItem) {
                setCart([...cart, { ...data, qty: 1 }])
            }
            setMode(name)
        }
        else setMode(name)
    }

    const addQtyItem = (id) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, qty: item.qty + 1 } : item
            )
        )
    }

    const reduceQtyItem = (id) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id && item.qty > 1
                    ? { ...item, qty: item.qty - 1 }
                    : item
            )
        )
    }

    const removeItem = (id) => {
        setCart((prev) => prev.filter(row => row.id !== id))
    }

    const checkOutOrder = async () => {
        try {
            const sumAllQty = cart.reduce((total, item) => total + item.qty, 0)
            const sumTotal = cart.reduce((total, item) => total + item.price * item.qty, 0)

            const { data: transactions_data, error: transactions_error } = await supabase.from("transactions").insert([
                {
                    amount: sumAllQty,
                    total: sumTotal
                }
            ]).select("*")

            console.log(transactions_data)

            let tempData = []
            cart.forEach((row) => {
                tempData.push({
                    id_transaction: transactions_data[0].id,
                    product_name: row.name,
                    price: row.price,
                    quantity: row.qty,
                    sub_total: row.price * row.qty
                })
            })

            const { data: transaction_item, error: transaction_error } = await supabase.from("transaction_items").insert(tempData)

            if (transactions_error) throw transactions_error
            else if (transaction_error) throw transaction_error
            else alert("success buy")
        } catch (error) {
            alert(error.message)
        } finally {
            router.refresh()
            console.log("success")
        }
    }

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.qty * 1000, 0)
    }

    return (
        <>
            {mode === "select_menu" && (
                <div className="w-full flex justify-center items-center">
                    <div className="grid w-3/4 grid-cols-3 gap-3">
                        {products.map((row) => (
                            <div
                                key={row.id}
                                onClick={() => changeMode("checkout", row)}
                                className="bg-amber-400 text-black text-right p-2 rounded flex flex-col cursor-pointer hover:opacity-80"
                            >
                                <span>{row.name}</span>
                                <span>{convertCurrentcy(row.price * 1000)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {mode === "checkout" && (
                <div className="h-screen py-8">
                    <div className="container mx-auto px-4">
                        <h1 className="text-2xl font-semibold mb-4">Order Cart</h1>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="md:w-3/4">
                                <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-4">
                                    <table className="w-full text-white">
                                        <thead>
                                            <tr>
                                                <th className="text-left font-semibold">Product</th>
                                                <th className="text-left font-semibold">Price</th>
                                                <th className="text-left font-semibold">Quantity</th>
                                                <th className="text-left font-semibold">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map((row) => (
                                                <tr key={row.id}>
                                                    <td className="py-4">
                                                        <div className="flex items-center">
                                                            <Image
                                                                className="h-16 w-16 mr-4"
                                                                src={`https://tailwindflex.com/images/logo.svg`}
                                                                alt="Product"
                                                            />
                                                            <span className="font-semibold">{row.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4">{convertCurrentcy(row.price * 1000)}</td>
                                                    <td className="py-4">
                                                        <div className="flex items-center">
                                                            <button
                                                                onClick={() => reduceQtyItem(row.id)}
                                                                className="border rounded-md py-1 px-3 mr-2"
                                                            >
                                                                -
                                                            </button>
                                                            <span className="text-center w-8">{row.qty}</span>
                                                            <button
                                                                onClick={() => addQtyItem(row.id)}
                                                                className="border rounded-md py-1 px-3 ml-2"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="py-4">
                                                        <div className="flex items-center gap-3">
                                                            <span>{convertCurrentcy(row.price * row.qty * 1000)}</span>
                                                            <button className="p-2 bg-red-700 rounded hover:cursor-pointer" onClick={() => removeItem(row.id)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 1216 1312">
                                                                    <path fill="#fff" d="M1202 1066q0 40-28 68l-136 136q-28 28-68 28t-68-28L608 976l-294 294q-28 28-68 28t-68-28L42 1134q-28-28-28-68t28-68l294-294L42 410q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294l294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68L880 704l294 294q28 28 28 68"></path>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td className="py-4 text-center" colSpan={4} >
                                                    <button onClick={() => changeMode("select_menu")} className="bg-amber-500 text-2xl font-semibold rounded w-[150px] py-2">+</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="md:w-1/4">
                                <div className="bg-gray-800 text-white rounded-lg shadow-md p-6">
                                    <h2 className="text-lg font-semibold mb-4">Summary</h2>
                                    <div className="flex justify-between mb-2">
                                        <span>Subtotal</span>
                                        <span>{convertCurrentcy(calculateTotal())}</span>
                                    </div>
                                    <hr className="my-2" />
                                    <div className="flex justify-between mb-2">
                                        <span className="font-semibold">Total</span>
                                        <span className="font-semibold">{convertCurrentcy(calculateTotal())}</span>
                                    </div>
                                    <button onClick={() => checkOutOrder()} className="bg-amber-500 font-semibold text-white py-2 px-4 rounded-lg mt-4 w-full">
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {mode === "final" && (
                <div></div>
            )}
        </>
    )
}

export default CashierPage
