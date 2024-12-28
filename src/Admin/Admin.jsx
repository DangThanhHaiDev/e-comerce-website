import { CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, useMediaQuery, useTheme } from "@mui/material"
import { Box } from "@mui/system"
import React, { useEffect, useState } from "react"
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
import ChecklistIcon from '@mui/icons-material/Checklist';
import CreateProductTypeForm from "./components/CreateProductTypeForm";
import AccountManager from "./components/AccountManager";
import CreateAccount from "./components/CreateAccount";
import { useDispatch, useSelector } from "react-redux";
import { getUserByToken, logout_user } from "../State/Auth/Action";
import TopProduct from "./components/TopProduct";
import { Button } from "@headlessui/react";

let menu = [
    { name: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
    { name: "Products", path: "/admin/products", icon: <ProductionQuantityLimitsIcon /> },
    { name: "Customers", path: "/admin/customers", icon: <Person2Icon /> },
    { name: "Orders", path: "/admin/orders", icon: <LibraryBooksIcon /> },
    { name: "Add Product", path: "/admin/product/create", icon: <AddIcon /> },
    { name: "Add Product Type", path: "/admin/productType/create", icon: <ChecklistIcon /> },
    { name: "Account Manager", path: "/admin/account", icon: <AccountCircleIcon /> }

]

const Admin = () => {

    const navigate = useNavigate()
    const user = useSelector(store => store.auth.user)
    const dispatch = useDispatch()
    const token = localStorage.getItem("token")
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClickIcon = (path) => {
        navigate(path)
    }

    useEffect(() => {
        if (token) {
            dispatch(getUserByToken(token))
        }
    }, [])

    if (user && user.role === "nhanvien") {
        menu = menu.filter((item) => (item.name !== "Dashboard" && item.name != "Customers" && item.name != "Account Manager"))
    }



    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleMua = ()=>{
        navigate("/")
    }
    const handleLogout = ()=>{
        dispatch(logout_user())
        navigate("/")
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
                        <ListItemText>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                Account
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleMua}>Đi đến trang mua sắm</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box >
    )

    return (
        <div>
            {
                user?.role && user.role !== "customer" ?
                    (
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
                                    <Route path="/productType/create" element={<CreateProductTypeForm />} />
                                    <Route path="/account" element={<AccountManager />}></Route>
                                    <Route path="/account/create" element={<CreateAccount />}></Route>
                                    <Route path="/products/seller" element={<TopProduct />}></Route>
                                </Routes>
                            </div>

                        </div>
                    ) : ""
            }



        </div>
    )
}

export default Admin
