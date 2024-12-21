import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { cancelOrder, confirmOrder, deliveredOrder, getAllOrders, getOrdersByDate, shipOrder } from "../../State/Admin/Order/Action";
import { Avatar, Box, Button, Card, CardHeader, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ConfirmDialog from "./Confirm";
import { format } from "date-fns";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import SearchIcon from '@mui/icons-material/Search';




const OrderTable = () => {
    const dispatch = useDispatch()
    const orders = useSelector(store => store.adminOrder.orders)
    const order = useSelector(store => store.adminOrder.order)
    const [orderActive, setOrderActive] = useState(-1)
    const [orderStatusActive, setOrderStatusActive] = useState("")
    const [isCacel, setCancel] = useState(false)

    console.log(orders);

    const [open, setOpen] = useState(false)
    const [startDate, setStartDay] = useState(dayjs(new Date()))
    const [endDate, setEndDate] = useState(dayjs(new Date()).add(5, 'day'))

    useEffect(() => {
        dispatch(getAllOrders())
    }, [order, isCacel])

    const handleOpenConfirm = () => {
        setOpen(true)
    }
    const handleCloseConfirm = () => {
        setOpen(false)
    }
    const handleActive = (orderId, status) => {
        if (status === "SHIPPED" || status === "CANCELED") {
            return
        }
        setOrderActive(orderId)
        setOrderStatusActive(status)
        handleOpenConfirm()
    }
    const handleCancel = (orderId) => {
        setCancel(true)
        setOrderActive(orderId)
        handleOpenConfirm()
    }
    const handleConfirmed = (orderId, status, cancel) => {
        if (cancel) {
            dispatch(cancelOrder(orderId))
            setCancel(false)
        }
        else if (status === "PENDING") {
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

    const handleFilterByDate = () => {
        const formattedStartDate = startDate.format('YYYY-MM-DD');
        const formattedEndDate = endDate.format('YYYY-MM-DD');
        dispatch(getOrdersByDate({ startDate: formattedStartDate, endDate: formattedEndDate }))
    }
    const handleGetAll = () => {
        dispatch(getAllOrders())
    }
    return (
        <div>
            <Card className='mt-2'>
                <CardHeader title="All Orders" className='text-left' />

                <div className="flex justify-end mb-8 items-center justify-between">
                    <div className="text-left ml-3">
                        <Button onClick={handleGetAll} variant="contained">All orders</Button>

                    </div>
                    <div className="flex justify-end items-center">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                                <DatePicker
                                    label="Từ ngày"
                                    value={startDate}
                                    onChange={(newValue) => setStartDay(newValue)}
                                />
                                <DatePicker
                                    label="Đến ngày"
                                    value={endDate}
                                    onChange={(newValue) => setEndDate(newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                        <Button onClick={handleFilterByDate} variant="outlined" sx={{ height: "3rem", my: "auto", marginLeft: "10px" }}>
                            <SearchIcon />
                        </Button>
                    </div>

                </div>
                <TableContainer component={Paper} sx={{ ml: "16px" }} >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Product Images</TableCell>
                                <TableCell align="center">Created At</TableCell>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center">Order Id</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Next Step</TableCell>
                                <TableCell align="center">Cancel</TableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders && orders.length > 0 &&
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
                                        <TableCell align="center"><p className="text-center">{format(new Date(item.createdAt), 'dd/MM/yyyy HH:mm:ss')}</p></TableCell>
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
                                        <TableCell align="center">{Number(item.discountedPrice).toLocaleString("vi-VN")}đ</TableCell>
                                        <TableCell align="center">
                                            <p className={`rounded-2xl p-2 ${item.orderStatus === 'PENDING' ? 'bg-yellow-400' :
                                                    item.orderStatus === 'DELIVERED' ? 'bg-green-400' :
                                                        item.orderStatus === 'SHIPPED' ? 'bg-blue-400' :
                                                            item.orderStatus === 'CANCELED' ? 'bg-red-400' :
                                                                item.orderStatus === 'CONFIRMED' ? 'bg-purple-400' :
                                                                    'bg-gray-400' // Default color
                                                }`}>{item.orderStatus}</p>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Avatar onClick={e => handleActive(item.id, item.orderStatus)} sx={{ backgroundColor: "#9155fd", margin: "auto", cursor: "pointer", opacity: item.orderStatus === "SHIPPED" || item.orderStatus === "CANCELED" ? "0.6" : "1" }} className="active:opacity-60">
                                                <NavigateNextIcon />
                                            </Avatar>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button variant="contained" sx={{
                                                backgroundColor: "#b71f3b", ":hover": {
                                                    backgroundColor: "#b71f3b"
                                                },
                                            }} disabled={item.orderStatus === "SHIPPED" || item.orderStatus === "CANCELED"} onClick={e => handleCancel(item.id)}>
                                                Cancel
                                            </Button>
                                        </TableCell>



                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
            {/* <div className='flex justify-center mt-3'>
            <Pagination count={products?.totalPages} onChange={(e, newPage)=>handleChangePage(newPage)} color="secondary" />

        </div> */}
            <ConfirmDialog open={open} handleCloseConfirm={handleCloseConfirm} handleConfirmed={handleConfirmed} id={orderActive} status={orderStatusActive} isCancel={isCacel} />
        </div>
    )
}
export default OrderTable