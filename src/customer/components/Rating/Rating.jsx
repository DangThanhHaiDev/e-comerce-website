import { Button, Grid, Rating, TextField } from "@mui/material";
import { useState } from "react";
import { api } from "../../../config/apiConfig";
import { useNavigate, useParams } from "react-router-dom";

    const Feedback = () => {
        const [start, setStart] = useState(5);
        const params = useParams()
        const navigate = useNavigate()
        
        

        const handleChange = (e, value) => {
            setStart(value);
        };

        const handleToSendComment = (e) => {
            e.preventDefault()
            const data = new FormData(e.currentTarget)  
            postFeedback(data)          
        }

        const postFeedback = async(data)=>{
            try {
                const response = await api.post(`api/product/rating/${params.id}`, {comment: data.get("comment"), quality: start})
                alert("Shop cảm ơn bạn vì đã đóng góp ý kiến để shop phát triển hơn")
                navigate("/account/order")
            } catch (error) {
                
            }
        }

        return (
            <div className="p-4 bg-gray-50">
                <form onSubmit={e=>handleToSendComment(e)}>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Rating precision={0.5} size="large" value={start} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            {start > 4 && (
                                <p className="text-green-600 font-semibold text-lg bg-green-100 p-2 rounded-md shadow-sm">
                                    Sản phẩm này rất tuyệt vời
                                </p>
                            )}
                            {start > 3 && start <= 4 && (
                                <p className="text-blue-600 font-medium text-lg bg-blue-100 p-2 rounded-md shadow-sm">
                                    Sản phẩm này tốt
                                </p>
                            )}
                            {start > 2 && start <= 3 && (
                                <p className="text-yellow-600 font-medium text-lg bg-yellow-100 p-2 rounded-md shadow-sm">
                                    Sản phẩm này cũng bình thường
                                </p>
                            )}
                            {start >= 1 && start <= 2 && (
                                <p className="text-orange-600 font-medium text-lg bg-orange-100 p-2 rounded-md shadow-sm">
                                    Sản phẩm này không tốt
                                </p>
                            )}
                            {start < 1 && (
                                <p className="text-red-600 font-semibold text-lg bg-red-100 p-2 rounded-md shadow-sm">
                                    Sản phẩm này rất tệ
                                </p>
                            )}
                        </Grid>
                        <Grid item xs={9}>
                            <TextField name="comment" multiline fullWidth minRows={5} label="Nhập bình luận của bạn" />
                        </Grid>
                        <Grid item xs={3}>
                            <div className="flex w-full items-end h-full">
                                <Button type="submit" variant="contained" className="items-end" fullWidth>Gửi</Button>
                            </div>
                        </Grid>
                    </Grid>
                </form> 
            </div>
        );
    };

    export default Feedback;
