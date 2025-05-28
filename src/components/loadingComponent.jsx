const LoadingComponent = () => {
    return (
        <>
            <div className="absolute w-full h-full flex justify-center items-center left-0 top-0">
                <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600"></div>
            </div>
        </>
    )
}

export default LoadingComponent