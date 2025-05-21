import Pagination from "@/components/Pagination"
import usePagination from "@/hooks/usePagination"
import { convertCurrentcy } from "@/utils/helper"

const ListTransaction = ({ transactions }) => {
    const { prevPage, gotoPage, nextPage, paginatePage, currPage, pageCount } = usePagination(transactions)
    return (
        <div className="w-full flex flex-col gap-3">

        <table className="min-w-full divide-y divide-amber-900 overflow-x-auto">
            <thead className="bg-amber-900">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-amber-200 uppercase tracking-wider">
                        Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-amber-200 uppercase tracking-wider">
                        Total
                    </th>
                </tr>
            </thead>
            <tbody className="bg-amber-100 divide-y divide-amber-900">
                {transactions.length > 0 ? paginatePage.map((row) => {
                    return (
                        <tr key={row.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-800">
                                {row.amount} item
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-800">
                                {convertCurrentcy(row.total * 1000)}
                            </td>
                        </tr>
                    )
                }) : (
                    <tr>
                        <td colSpan={2} className="px-6 py-4 whitespace-nowrap text-sm text-amber-800">
                            Data not found
                        </td>
                    </tr>
                )}
            </tbody>
        </table>

        <Pagination
                currPage={currPage}
                nextPage={nextPage}
                prevPage={prevPage}
                pageCount={pageCount}
                gotoPage={gotoPage}
            />
        </div>
    )
}

export default ListTransaction