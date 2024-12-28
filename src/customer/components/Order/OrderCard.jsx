import { Box, Button, Grid, Modal, TableCell, Typography } from "@mui/material"
import AdjustIcon from '@mui/icons-material/Adjust';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { cancelOrder } from "../../../State/Admin/Order/Action";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };





const OrderCard = ({ order, status, orderId, reload }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const handleCancel = ()=>{
        dispatch(cancelOrder(orderId))
        handleClose()
        reload()
    }
    return (
        <div>
            <div className="p-5 shadow-lg hover:shadow-2xl border cursor-pointer active:opacity-100">
                <Grid container spacing={2} sx={{ justifyContent: "space-between", paddingTop: "20px" }}>
                    <Grid item xs={4}>
                        <div className="flex cursor-pointer items-start">
                            <img className="w-[5rem] h-[5rem] object-cover object-top" src={order?.product?.imageUrl} alt="anh" />
                            <div className="ml-5 space-y-2 text-left">
                                <p>{order.product.title}</p>
                                <p className="opacity-50 text-xs font-semibold">Size: {order.size}</p>
                                <p className="opacity-50 text-xs font-semibold">Số lượng: {order.quantity}</p>
                                <p className="opacity-50 text-xs font-semibold">Đơn hàng số: {orderId}</p>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <p>{(order.discountedPrice * order.quantity).toLocaleString("vi-VN")}đ</p>
                    </Grid>
                    <Grid item xs={4}>
                        {true && <p>
                            <AdjustIcon sx={{ width: "15px", height: "15px" }} className="text-green-600 mr-2 text-sm" />
                            <span>
                                Giao nhanh hỏa tốc
                            </span>
                            <p className="text-sm">
                                {status === "PENDING" && "Đang chờ xác nhận"}
                                {status === "CONFIRMED" && "Đã xác nhận đơn hàng"}
                                {status === "SHIPPED" && "Đang hàng đã được giao"}
                                {status === "DELIVERED" && "Đơn hàng đang giao"}
                                {status === "CANCELED" && "Đơn hàng đã bị hủy do lí do nào đó"}
                            </p>
                        </p>

                        }

                    </Grid>
                    <Grid item xs={2}>
                        {
                            status === "PENDING"
                            && <Button sx={{ color: "red" }} onClick={handleOpen}>Hủy đơn</Button>
                        }
                    </Grid>


                </Grid>

            </div>
            {
                status === "SHIPPED" &&
                <Button fullWidth variant="contained" sx={{ backgroundColor: "#BA6C44", ":hover": { backgroundColor: "#BA6C44", opacity: 0.8 } }} onClick={() => navigate(`/rating/${order.id}`)}>Đánh giá</Button>

            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Hủy đơn hàng
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Bạn có chắc chắn muốn hủy đơn hàng không?
                    </Typography>
                    <Button onClick={handleClose}>
                        Tôi ấn nhầm
                    </Button>
                    <Button sx={{color:"red", marginLeft:"20px"}} onClick={handleCancel}>
                        Đồng ý
                    </Button>
                </Box>
            </Modal>
        </div>


    )
}
export default OrderCard