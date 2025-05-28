import Link from "next/link"

const NavbarComponent = () => {
    return (
        <>
            <div className="w-full flex justify-center items-center py-3">
                <div className="w-3/4 flex justify-between items-center p-4 bg-amber-800 rounded-lg">
                    <div>
                        <h1>Dashboard Management</h1>
                    </div>
                    <ul className="flex gap-4 font-semibold text-md">
                        <li>
                            <Link href={'/'}>Home</Link>
                        </li>
                        <li>
                            <Link href={'/products'}>Products</Link>
                        </li>
                        <li>
                            <Link href={'/stocks'}>Stocks</Link>
                        </li>
                        <li>
                            <Link href={'/transactions'}>Transaction</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default NavbarComponent