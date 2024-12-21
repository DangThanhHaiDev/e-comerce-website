import { red, blue } from "@mui/material/colors";
import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { api } from "../../config/apiConfig";

let data = [
    ["Month", "Doanh thu"],
    ["Tháng 1", 100],
    ["Tháng 2", 1170],
    ["Tháng 3", 660],
    ["Tháng 4", 1030],
    ["Tháng 5", 1030],
    ["Tháng 6", 1030],
    ["Tháng 7", 1030],
    ["Tháng 8", 1030],
    ["Tháng 9", 1030],
    ["Tháng 10", 1030],
    ["Tháng 11", 1030],
    ["Tháng 12", 1030],
];

const options = {
    chart: {
        title: "Doanh thu của từng tháng trong năm 2024",
    },
    colors: [red[500], blue[400]], // Màu từ MUI
    vAxis: {
        title: "Doanh thu (triệu VNĐ)",
        gridlines: { count: 5 },
    },
    hAxis: {
        title: "Tháng",
    },
    backgroundColor: "#FAFAFA", // Nền biểu đồ
};

const Sales = () => {
    const [revenue, setRevenue] = useState([])

    const getRevenue = async()=>{
        try {
            const response = await api.get(`api/admin/orders/revenue/${new Date().getFullYear()}`)
            const {data} = response
            render(data)
            
        } catch (error) {
            
        }
    }
    
    const render = (d)=>{
        let arr = new Array(13)
        arr[0] = ["Month", "Doanh thu"]

        d.map(item=>{
            arr[item.month] = [`Tháng ${item.month}`, item.revenue]
        })
        
        for(let i=1 ; i<=12 ; i++){
            if(!arr[i]){
                arr[i] = [`Tháng ${i}`, 0]
            }
        }
        setRevenue(arr)        
    }

    useEffect(()=>{
        getRevenue()
    }, [])

    return (
        <div className="flex justify-center items-center bg-gray-100 p-6 rounded-lg shadow-xl w-full">
            <div className="w-full max-w-5xl bg-white p-5 rounded-lg shadow-lg">
                <Chart
                    chartType="Bar"
                    width="100%"
                    height="400px"
                    data={revenue.length ? revenue :data}
                    options={options}
                />
            </div>
        </div>
    );
};

export default Sales;
