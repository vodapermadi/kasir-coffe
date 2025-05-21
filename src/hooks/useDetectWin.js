const { useState, useEffect } = require("react")

const useDetectWin = () => {
    const [windowDetect,setWindowDetect] = useState(undefined)

    useEffect(() => {
        if(typeof window !== undefined){
            setWindowDetect(true)
        }
    })

    return {windowDetect}
}

export default useDetectWin