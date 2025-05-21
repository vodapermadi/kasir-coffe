"use client"
import { useState,useMemo } from "react"

const usePagination = (data=[]) => {
    const [currPage,setCurrPage] = useState(1)
    const itemsPage = 5
    const pageCount = Math.ceil(data.length / itemsPage)

    const paginatePage = useMemo(() => {
        const startIndex = (currPage - 1) * itemsPage
        return data.slice(startIndex, startIndex + itemsPage)
    },[currPage,data])

    const nextPage = () => setCurrPage((prev) => pageCount !== prev ? prev+1 : pageCount)
    const prevPage = () => setCurrPage((prev) => prev !== 1 ? prev-1 : 1)
    const gotoPage = (page) => setCurrPage(page)

    return {
        prevPage,
        nextPage,
        gotoPage,
        paginatePage,
        currPage,
        pageCount
    }
}

export default usePagination