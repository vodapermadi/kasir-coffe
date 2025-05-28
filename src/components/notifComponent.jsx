const NotifComponent = ({value,status}) => {
    return(
        <>
            <div className="absolute w-full h-full flex left-0 items-start justify-center py-5">
                <div className={`w-[250px] py-3 px-2 border-2 shadow-lg ${status === "success" ? "bg-green-200 text-black border-green-500 shadow-green-400" : "bg-red-200 text-black border-red-500 shadow-red-400"} rounded-lg font-semibold text-lg`}>
                    {value}
                </div>
            </div>
        </>
    )
}

export default NotifComponent