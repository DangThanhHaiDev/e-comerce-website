import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Textarea } from '@headlessui/react';
import { Button, Grid, TextField } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import axios from 'axios';
import { api, API_BASE_URL } from "../../config/apiConfig";



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ProductModify({ open, handleClose, product, success }) {

    const [title, setTitle] = React.useState(product?.title || "")
    const [brand, setBrand] = React.useState(product?.brand || "")
    const [des, setDes] = React.useState(product?.description || "")
    const [price, setPrice] = React.useState(product?.price || 0)
    const [discountPercent, setDiscountPercent] = React.useState(product?.discountPresent || 0)
    const [sizeS, setSizeS] = React.useState(product?.size[0].quantity || 0)
    const [sizeM, setSizeM] = React.useState(product?.size[1].quantity || 0)
    const [sizeL, setSizeL] = React.useState(product?.size[2].quantity || 0)
    const [file, setFile] = React.useState(null)
    const [isFullInfo, setFullInfo] = React.useState(true)
    const [isValidQuantity, setValidQuantity] = React.useState(true)


    React.useEffect(() => {

    }, [])

    const handleOnChange = (e, setState) => {
        if (setState === setPrice && Number(e.target.value < 0)) {
            setState(0)
        }
        if (setState === setDiscountPercent && (Number(e.target.value < 0) || Number(e.target.value) >100)) {
            setState(0)
        }
        else {
            setState(e.target.value)
        }
        if ((setState === setSizeS || setState ===setSizeM || setState ===setSizeL) && Number(e.target.value < 0)) {
            setState(0)
        }
    }

    const handleChangeFile = (e) => {
        setFile(e.target.files[0])

    }

    const handleUpdate = async () => {
        setValidQuantity(true)
        setFullInfo(true)
        if (!title || !brand || !des) {
            setFullInfo(false)
            return
        }
        if(Number(sizeM) + Number(sizeL) + Number(sizeS) <= 0){
            setValidQuantity(false)
            return
        }

        try {
            const token = localStorage.getItem("token")
            const formData = new FormData()
            formData.append("title", title)
            formData.append("brand", brand)
            formData.append("des", des)
            formData.append("price", price)
            formData.append("discountPercent", discountPercent)
            formData.append("discountedPrice", price * ((100 - discountPercent) / 100))
            formData.append("sizeS", sizeS)
            formData.append("sizeM", sizeM)
            formData.append("sizeL", sizeL)
            const response = await axios.put(`http://localhost:2207/api/admin/products/${product.id}/update`,formData, {
                headers:{
                    "Authorization": `Bearer ${token}`,
                }
            })
            const {data} =response
            success()
            
        } catch (error) {
            
        }
        const token = localStorage.getItem('token')
        try {
            const formData = new FormData()
            formData.append("file", file)
            formData.append("id", product.id)
            console.log(product.id);
            
            await axios.post(`${API_BASE_URL}/api/admin/products/image`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
            })

        } catch (error) {
                console.log(error.message);
                
        }
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <div className='relative'>
                                {
                                    file ?
                                        <img src={URL.createObjectURL(file)} alt="Ảnh" />
                                        :
                                        <img src={product?.imageUrl} alt="Ảnh" />

                                }
                                <input type="file" id="file" hidden onChange={e => handleChangeFile(e)} />
                                <label htmlFor="file" className='cursor-pointer text-[orange] absolute right-0 top-0 border-black'>
                                    <BorderColorIcon />

                                </label>
                            </div>
                            <label className='mt-4 block font-semibold' >
                                {`Tổng số sản phẩm: ${Number(sizeS) + Number(sizeM) + Number(sizeL)}`}
                            </label>
                        </Grid>
                        <Grid item xs={9}>
                            <Box>

                                <Grid container spacing={2} sx={{ padding: "0" }}>
                                    <Grid item xs={12}>
                                        <TextField label="Title" fullWidth value={title} onChange={e => handleOnChange(e, setTitle)} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField label="Brand" fullWidth value={brand} onChange={e => handleOnChange(e, setBrand)} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField label="Description" multiline rows={4} fullWidth value={des} onChange={e => handleOnChange(e, setDes)} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField label="Price" type='number' fullWidth value={price} onChange={e => handleOnChange(e, setPrice)} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField label="Discount Percent" type='number' fullWidth value={discountPercent} onChange={e => handleOnChange(e, setDiscountPercent)} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField label={`Tiền sau khi giảm: ${price * ((100 - discountPercent) / 100)}`} fullWidth />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField type='number' fullWidth label="Quantity Size S" value={sizeS} onChange={e => handleOnChange(e, setSizeS)} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField type='number' fullWidth label="Quantity Size M" value={sizeM} onChange={e => handleOnChange(e, setSizeM)} />
                                    </Grid> <Grid item xs={4}>
                                        <TextField type='number' fullWidth label="Quantity Size L" value={sizeL} onChange={e => handleOnChange(e, setSizeL)} />
                                    </Grid>

                                    {
                                        !isFullInfo &&
                                        <Grid item xs={12}>

                                            <p className='text-red-800'>Vui lòng nhập đầy đủ thông tin</p>

                                        </Grid>
                                    }
                                    {
                                        !isValidQuantity &&
                                        <Grid item xs={12}>

                                            <p className='text-red-800'>Số lượng của sản phẩm phải trên 0</p>

                                        </Grid>
                                    }

                                    <Grid item xs={12}>
                                        <Button sx={{
                                            background: "#652369", ":hover": {
                                                background: "#652369", opacity: 0.8
                                            }
                                        }} variant='contained' fullWidth onClick={handleUpdate}>Update</Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>

                    </Grid>


                </Box>

            </Modal>
        </div>
    );
}
