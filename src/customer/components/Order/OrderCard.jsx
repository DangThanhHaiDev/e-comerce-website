import { Button, Grid, TableCell } from "@mui/material"
import AdjustIcon from '@mui/icons-material/Adjust';
import { useNavigate } from "react-router-dom";

const OrderCard = ({ order, status, orderId }) => {
    const navigate = useNavigate()
    return (
        <div>
            <div onClick={() => navigate(`account/order/${2}`)} className="p-5 shadow-lg hover:shadow-2xl border cursor-pointer hover:opacity-70 active:opacity-100">
                <Grid container spacing={2} sx={{ justifyContent: "space-between", paddingTop:"20px" }}>
                    <Grid item xs={6}>
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
                                Delivered on March 03
                            </span>
                            <p className="text-sm">
                                {status === "PENDING" && "Đang chờ xác nhận"}
                                {status === "CONFIRMED" && "Đã xác nhận đơn hàng"}
                                {status === "SHIPPED" && "Đang hàng đã được giao"}
                                {status === "DELIVERED" && "Đơn hàng đang giao"}

                            </p>
                        </p>

                        }
                        {false && <p>
                            <span>
                                Expected Delivery On Mar 03
                            </span>
                        </p>}
                    </Grid>

                    
                </Grid>

            </div>
            {
                status === "SHIPPED" &&
                <Button fullWidth variant="contained" sx={{backgroundColor:"#BA6C44", ":hover":{backgroundColor:"#BA6C44", opacity:0.8}}} onClick={() => navigate(`/rating/${orderId}`)}>Đánh giá</Button>

            }
        </div>

    )
}
export default OrderCard