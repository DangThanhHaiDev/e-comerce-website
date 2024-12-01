import { Grid } from "@mui/material"
import Achivement from "./Achivement"
import MonthlyOverview from "./MonthlyOveriew"
import ProductTable from "./ProductsTable"

const Dashboard = ()=>{
    return(
        <div>
            <Grid container spacing={2} sx={{padding:0, ml:"10px"}}>
                <Grid item xs={12} md={4}>
                    <Achivement/>
                </Grid>
                <Grid item xs={12} md={8}>
                    <MonthlyOverview/>
                </Grid>
                {/* <Grid xs={12} md={8} sx={{paddingLeft:"16px", marginTop:"20px"}}>
                    <ProductTable />
                </Grid> */}
            </Grid>
        </div>
    )
}

export default Dashboard