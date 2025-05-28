import { convertCurrentcy } from "@/utils/helper"

const SelectMenuKasir = ({products,changeMode,cart}) => {
    return (
        <>
            <div className="w-full flex flex-col justify-center items-center">
                <div className="w-3/4 text-left text-xl mb-3 capitalize font-bold">
                    selected menu : {cart.length}
                </div>
                <div className="grid w-3/4 grid-cols-3 gap-3">
                    {products.length > 0 && products.map((row) => (
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
        </>
    )
}

export default SelectMenuKasir