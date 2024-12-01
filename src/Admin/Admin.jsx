import { CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, useMediaQuery, useTheme } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import DashboardIcon from '@mui/icons-material/Dashboard';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Person2Icon from '@mui/icons-material/Person2';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CreateProductForm from "./components/CreateProductForm";
import OrderTable from "./components/OrderTable";
import Dashboard from "./components/Dashboard";
import CustomerTable from "./components/CustomerTable";
import ProductsTable from "../Admin/components/ProductsTable";

const menu = [
    { name: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
    { name: "Products", path: "/admin/products", icon: <ProductionQuantityLimitsIcon /> },
    { name: "Customers", path: "/admin/customers", icon: <Person2Icon /> },
    { name: "Orders", path: "/admin/orders", icon: <LibraryBooksIcon /> },
    { name: "AddProduct", path: "/admin/product/create", icon: <AddIcon /> }
]

const Admin = () => {
    const theme = useTheme()
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"))
    const [slideBarVisible, setSlideVisible] = useState(false)
    const navigate = useNavigate()

    const handleClickIcon = (path) => {
        navigate(path)
    }

    const drawer = (
        <Box sx={{
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
        }}>
            <List sx={{ flexGrow: 1 }}>
                {menu.map((item) => (
                    <ListItem key={item.name} disablePadding onClick={() => handleClickIcon(item.path)}>
                        <ListItemButton>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText>
                                {item.name}
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            {/* Account item at the bottom */}
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText>Account</ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )

    return (
        <div>
            <div className="flex h-[100vh] w-full">
                <CssBaseline />
                <div className="w-[15%] border-r-gray-300 h-full ">
                    <div className="h-full fixed border w-[15%]">
                    {drawer}
                        
                    </div>

                </div>
                <div className="w-[84%]">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/product/create" element={<CreateProductForm />} />
                        <Route path="/products" element={<ProductsTable />} />
                        <Route path="/orders" element={<OrderTable />} />
                        <Route path="/customers" element={<CustomerTable />} />
                    </Routes>
                </div>

            </div>


        </div>
    )
}

export default Admin
