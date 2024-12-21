import { Grid } from "@mui/material"
import Achivement from "./Achivement"
import MonthlyOverview from "./MonthlyOveriew"
import ProductTable from "./ProductsTable"
import { BarChart } from '@mui/x-charts/BarChart';
import Chart from "react-google-charts";
import Sales from "./Sales";


const Dashboard = () => {

    return (
        <div className="h-full p-3">
            <Grid container spacing={2} sx={{ padding: 0 }}>
                <Grid item xs={12} md={4}>
                    <Achivement />
                </Grid>
                <Grid item xs={12} md={8}>
                    <MonthlyOverview />
                </Grid>
                {/* <Grid xs={12} md={8} sx={{paddingLeft:"16px", marginTop:"20px"}}>
                    <ProductTable />
                </Grid> */}
                <Grid item xs={12} sx={{minHeight:"500px", display:"flex", alignItems:"end", width:"100%"}}>
                    <Sales />
                </Grid>



            </Grid>
        </div>
    )
}

export default Dashboard



