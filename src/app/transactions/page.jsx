"use client"
import { supabase } from "@/utils/supabase"
import { useState, useEffect } from "react"
import ListTransaction from "./ListTransaction"
import ListItemTransaction from "./ListItemTransaction"

const TransactionPage = () => {
    const [transactions, setTransactions] = useState([])
    const [transactionItem, setTransactionItem] = useState([])

    useEffect(() => {
        getTransactions()
        getTransactionItem()
    }, [])

    const getTransactions = async () => {
        try {
            const { data, error } = await supabase.from("transactions").select("*").order("created_at", { ascending: false })
            if (error) throw error
            else setTransactions(data)
        } catch (error) {
            alert(error.message)
        }
    }

    const getTransactionItem = async () => {
        try {
            const { data, error } = await supabase.from("transaction_items").select("*").order("created_at", { ascending: false })
            if (error) throw error
            else setTransactionItem(data)
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <>
            <div className="w-full flex justify-center items-center">
                <div className="w-3/4 flex flex-col gap-4">
                    <ListTransaction transactions={transactions} />
                    <ListItemTransaction transactions={transactionItem} />
                </div>
            </div>
        </>
    )
}

export default TransactionPage