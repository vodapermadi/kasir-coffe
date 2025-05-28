import Pagination from "@/components/Pagination"
import usePagination from "@/hooks/usePagination"
import { convertCurrentcy, formatDate } from "@/utils/helper"
import React from "react"

const ListTransaction = ({ transactions }) => {
    const { prevPage, gotoPage, nextPage, paginatePage, currPage, pageCount } = usePagination(transactions)

    let currDate = ""
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
                        const itemDate = formatDate(row.created_at)
                        const isNewDate = itemDate !== currDate
                        currDate = itemDate

                        return (
                            <React.Fragment key={row.id}>
                                {isNewDate && (
                                    <tr>
                                        <td colSpan={2} className="px-6 py-2 whitespace-nowrap text-sm text-amber-100 bg-amber-600 text-center">{itemDate}</td>
                                    </tr>
                                )}
                                <tr key={row.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-800">
                                        {row.amount} item
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-800">
                                        {convertCurrentcy(row.total * 1000)}
                                    </td>
                                </tr>
                            </React.Fragment>
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