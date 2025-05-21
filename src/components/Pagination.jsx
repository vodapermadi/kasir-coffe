import { getPaginationRange } from "@/utils/helper"

const Pagination = ({prevPage,nextPage,currPage,pageCount,gotoPage}) => {
    return(
        <>
        <div className="flex gap-2 mt-3">
                <button onClick={() => prevPage()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24">
                        <path fill="#fff" d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6l6 6z"></path>
                    </svg>
                </button>
                {getPaginationRange(currPage,pageCount).map((row) => {
                    return (
                        <button key={row} onClick={() => gotoPage(row)} className="w-[30px] h-[30px] rounded bg-amber-600">{row}</button>
                    )
                })}
                <button onClick={() => nextPage()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24">
                        <path fill="#fff" d="M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6z"></path>
                    </svg>
                </button>
            </div>
        </>
    )
}

export default Pagination