"use client"
import { convertCurrentcy } from "@/utils/helper"
import Image from "next/image"

const Checkout = ({changeMode,addQtyItem,reduceQtyItem,removeItem,checkOutOrder,calculateTotal,cart}) => {
    return (
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
    )
}

export default Checkout