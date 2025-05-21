import { useCallback, useState } from "react"

const useNotif = (value="",status=false,message="success") => {
    const [notif,setNotif] = useState({
        status:status,
        value:value,
        message:message
    })

    const activeNotif = useCallback((val,mes) => setNotif({
        status:true,
        value:val,
        message:mes
    }))

    const deactiveNotif = useCallback(() => setNotif({
        status:false,
        value:"",
        message:"success"
    }))

    return {notif,activeNotif,deactiveNotif}
}

export default useNotif