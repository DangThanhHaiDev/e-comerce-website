import { TrendingUp } from "@mui/icons-material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SettingsCellIcon from '@mui/icons-material/SettingsCell';
import { Avatar, Box, Card, CardContent, CardHeader, Grid, IconButton, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from "react-router-dom";

const salesData = [
    {
        stats: '245K',
        title: "Sales",
        color: "#FAC42F",
        icon: <TrendingUp sx={{ fontSize: "1.75rem" }} />
    },
    {
        stats: '12.5K',
        title: "Customers",
        color: "#45CE30",
        icon: <AccountCircleIcon sx={{ fontSize: "1.75rem" }} />
    },
    {
        stats: '1.54K',
        title: "Best Products",
        color: "#D63031",
        icon: <SettingsCellIcon sx={{ fontSize: "1.75rem" }} />
    },
    {
        stats: '88K',
        title: "Revenue",
        color: "#2475B0",
        icon: <AttachMoneyIcon sx={{ fontSize: "1.75rem" }} />
    }
]




const MonthlyOverview = () => {
    const navigate = useNavigate()

    const handleTopProduct = (title)=>{

        if(title === "Best Products"){
            navigate("/admin/products/seller")
        }
    }
    

    const renderStats = () => {
        return salesData.map((item, index) => (
            <Grid item xs={12} sm={3} key={item.title} sx={{ display: "flex", justifyContent: "center", alignItems: "center", justifyContent: "start" }}>
                <Box>
                    <div onClick={()=>handleTopProduct(item.title)}>
                        <Avatar sx={{ mr: 3, width: 44, height: 44, boxShadow: 3, color: "white", background: `${item.color}` }}>{item.icon}</Avatar>
    
                    </div>
                </Box>
                <Box>
                    <Typography variant="caption">{item.title}</Typography>
                    <Typography variant="h6">{item.stats}</Typography>
                </Box>
            </Grid>
        ))
    }


    return (
        <div>
            <Card className="text-left" sx={{ bgcolor: "#2C3335", color: "white" }}>
                <CardHeader title="Monthly Overview" action={<IconButton size="small">
                    <MoreVertIcon />
                </IconButton>}
                    subheader={
                        <Typography variant="body2">
                            <Box component="span" sx={{ fontWeight: 600, color: "text.primary", bgcolor: "#2C3335", color: "white" }}>
                                Total 48.5% groth
                            </Box>
                            this month
                        </Typography>
                    }
                    titleTypographyProps={{
                        sx: {
                            mb: 2.1,
                            lineHeight: '2rem !important',
                            letterSpacing: '.15px !important'
                        }
                    }}
                />
                <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
                    <Grid container spacing={[5, 0]} sx={{ padding: 0 }}>
                        {renderStats()}
                    </Grid>
                </CardContent>

            </Card>
        </div>
    )
}
export default MonthlyOverview