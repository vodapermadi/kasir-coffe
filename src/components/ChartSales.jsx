"use client"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const SalesMonitoring = () => {

    const data = [
        {
            name: "Page A",
            uv: 2000
        },
        {
            name: "Page B",
            uv: 6000
        },
        {
            name: "Page B",
            uv: 6000
        }, {
            name: "Page B",
            uv: 6000
        }, {
            name: "Page B",
            uv: 6000
        }, {
            name: "Page B",
            uv: 6000
        }, {
            name: "Page B",
            uv: 6000
        }, {
            name: "Page B",
            uv: 6000
        }, {
            name: "Page B",
            uv: 6000
        }, {
            name: "Page B",
            uv: 6000
        }, {
            name: "Page B",
            uv: 6000
        }, {
            name: "Page B",
            uv: 6000
        }
    ]

    return (
        <ResponsiveContainer width="60%" height={300} >
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" style={{ fontSize: '12px' }} />
                <YAxis style={{ fontSize: '12px' }} />
                <Tooltip />
                <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default SalesMonitoring