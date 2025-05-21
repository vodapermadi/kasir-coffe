"use client"
import SalesMonitoring from "@/components/ChartSales"
import useDetectWin from "@/hooks/useDetectWin"
import { supabase } from "@/utils/supabase"

const HomePage = () => {
  const { windowDetect } = useDetectWin()

  return (
    <>
      {windowDetect && (
        <div className="w-full">
          <SalesMonitoring />
        </div>
      )}
    </>
  )
}

export default HomePage