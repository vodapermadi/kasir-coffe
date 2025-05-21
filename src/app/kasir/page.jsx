"use client"
import { convertCurrentcy } from "@/utils/helper"
import { supabase } from "@/utils/supabase"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import SelectMenuKasir from "./SelectMenu"
import Checkout from "./Checkout"

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

        getMenu()
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
            {mode === "select_menu" && products.length > 0 && (
                <SelectMenuKasir products={products} />
            )}

            {mode === "checkout" && (
                <Checkout addQtyItem={addQtyItem} calculateTotal={calculateTotal} cart={cart} changeMode={changeMode} checkOutOrder={checkOutOrder} reduceQtyItem={reduceQtyItem} removeItem={removeItem} />
            )}
        </>
    )
}

export default CashierPage
