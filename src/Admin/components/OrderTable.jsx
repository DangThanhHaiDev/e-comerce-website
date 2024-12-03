import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { confirmOrder, deliveredOrder, getAllOrders, shipOrder } from "../../State/Admin/Order/Action";
import { Avatar, Box, Button, Card, CardHeader, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ConfirmDialog from "./Confirm";

const OrderTable = () => {
    const dispatch = useDispatch()
    const orders = useSelector(store => store.adminOrder.orders)
    const order = useSelector(store => store.adminOrder.order)
    const [orderActive, setOrderActive] = useState(-1)
    const [orderStatusActive, setOrderStatusActive] = useState("")


    const [open, setOpen] = useState(false)

    useEffect(() => {
        dispatch(getAllOrders())
    }, [order])

    const handleOpenConfirm = () => {
        setOpen(true)
    }
    const handleCloseConfirm = () => {
        setOpen(false)
    }
    const handleActive = (orderId, status) => {
        setOrderActive(orderId)
        setOrderStatusActive(status)
        handleOpenConfirm()
    }
    const handleConfirmed = (orderId, status) => {
        if (status === "PENDING") {
            dispatch(confirmOrder(orderId))

        }
        else if (status === "CONFIRMED") {
            dispatch(deliveredOrder(orderId))
        }
        else if (status === "DELIVERED") {
            dispatch(shipOrder(orderId))
        }
        handleCloseConfirm()
    }

    return (
        <div>
            <Card className='mt-2'>
                <CardHeader title="All Products" className='text-left' />
                <TableContainer component={Paper} sx={{ ml: "16px" }} >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Product Images</TableCell>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center">Order Id</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Next Step</TableCell>
                                <TableCell align="center">Delete</TableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders ?
                                orders.map((item) => (
                                    <TableRow
                                        key={item.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                {item.orderItems.map((i) => (
                                                    <Avatar key={i.id}>
                                                        <img src={i.product.imageUrl} width="40px" height="40px" alt="Anh" />
                                                    </Avatar>
                                                ))}
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center">
                                            {
                                                <Box sx={{ display: 'flex', flexDirection: "column", alignItems: 'center', gap: 1 }}>
                                                    {item.orderItems.map((i) => (
                                                        <p key={i.id}>{i.product.title}, {i.quantity}</p>
                                                    ))}
                                                </Box>
                                            }
                                        </TableCell>
                                        <TableCell align="center">{item.id}</TableCell>
                                        <TableCell align="center">{Number(item.totalPrice).toLocaleString("vi-VN")}đ</TableCell>
                                        <TableCell align="center">
                                            <p className="rounded-2xl p-2 bg-gray-400">{item.orderStatus}</p>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Avatar onClick={e => handleActive(item.id, item.orderStatus)} sx={{ backgroundColor: "#9155fd", margin: "auto", cursor: "pointer" }} className="active:opacity-60">
                                                <NavigateNextIcon />
                                            </Avatar>
                                        </TableCell>


                                        {/* 
                                   
                                    <TableCell align="center">{p.category.name}</TableCell> */}


                                    </TableRow>
                                )) : ''}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
            {/* <div className='flex justify-center mt-3'>
            <Pagination count={products?.totalPages} onChange={(e, newPage)=>handleChangePage(newPage)} color="secondary" />

        </div> */}
            <ConfirmDialog open={open} handleCloseConfirm={handleCloseConfirm} handleConfirmed={handleConfirmed} id={orderActive} status={orderStatusActive} />
        </div>
    )
}
export default OrderTable