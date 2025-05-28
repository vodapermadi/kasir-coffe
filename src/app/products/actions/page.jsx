"use client"
import { supabase } from "@/utils/supabase"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const CreateProduct = () => {
    const [categories, setCategories] = useState([])
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await supabase.from("categories").select("*")
                if (error) throw error
                else setCategories(data)
            } catch (error) {
                alert(error.message)
            }
        }

        fetchData()
    }, [])

    const handleSubmit = async(e) => {
        try {
            const formdata = new FormData(e.target)
            const {data,error} = await supabase.from("products").insert([
                {
                    name: formdata.get("name"),
                    id_categories: formdata.get("id_categorie"),
                    price: parseFloat(formdata.get("price"))
                }
            ])

            if(error) throw error
            else alert("success create")
            
        } catch (error) {
            alert(error.message)
        }finally{
            router.push("/products")
        }
    }

    return (
        <>
            <div className="max-w-md mx-auto mt-10 bg-amber-100 shadow-lg rounded-lg overflow-hidden">
                <div className="text-2xl py-4 px-6 bg-amber-900 text-white text-center font-bold uppercase">
                    Add Menu
                </div>
                <form className="py-4 px-6" onSubmit={handleSubmit} method="post">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                            Product
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name" name="name" type="text" placeholder="Enter product name" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                            Price
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name" name="price" type="text" placeholder="Enter price" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="service">
                            Categorie
                        </label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="categorie" name="id_categorie">
                            <option value="">---</option>
                            {categories.length > 0 && categories.map((row) => {
                                return (
                                    <option key={row.id} value={row.id}>{row.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="flex items-center justify-center mb-4">
                        <button
                            className="bg-amber-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
                            type="submit">
                            Add Menu
                        </button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default CreateProduct