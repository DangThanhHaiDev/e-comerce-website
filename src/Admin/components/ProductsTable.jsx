import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, findProducts } from '../../State/Product/Action';
import { Avatar, Box, Button, Card, CardHeader, FormControl, Grid, InputLabel, Menu, MenuItem, Pagination, Select, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../config/apiConfig';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ConfirmDelProduct from './ConfirmDel';
import ProductModify from './ProductModify';
import { toast, ToastContainer } from 'react-toastify';





export default function ProductTable() {
    const dispatch = useDispatch()
    const products = useSelector(store => store.product.products)
    const isDelete = useSelector(store => store.product.isDelete)
    const [title, setTitle] = React.useState("")

    const [page, setPage] = React.useState(1)
    const location = useLocation()
    const navigate = useNavigate()
    const [productActive, setProductActive] = React.useState(null)
    const [open, setOpen] = React.useState(false)
    const [openProductModify, setOpenProductModify] = React.useState(false)


    const [category, setCategory] = React.useState([])
    const [categoryAcive, setCategoryActive] = React.useState("")
    const [productUpdate, setProductUpdate] = React.useState(null)

    React.useEffect(() => {
        getCategoty()
    }, [])

    const handleOpenModify = (product) => {
        setOpenProductModify(true)
    }

    const handleCloseModify = () => {
        setOpenProductModify(false)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getCategoty = async () => {
        try {
            const response = await api.get("/api/admin/categories/all")
            const { data } = response

            const categories = data.map((c) => {
                return c.name
            })

            setCategory([...new Set(categories)]);
        } catch (error) {

        }
    }




    React.useEffect(() => {

        const data = {
            category: categoryAcive,
            pageNumber: page,
            pageSize: 6,
            color: null,
            sizes: null,
            minPrice: 0,
            maxPrice: 0,
            sort: 'price_low',
            title: title
        }
        dispatch(findProducts(data))
    }, [page, location.search, isDelete, categoryAcive, title])



    const handleChangePage = (newPage) => {
        const searchParams = new URLSearchParams(location.search)
        searchParams.set("page", newPage)
        const query = searchParams.toString()
        navigate({ search: `${query}` })
        setPage(newPage)
    }
    const hanldeDelProduct = (id) => {
        dispatch(deleteProduct(id))

    }

    const onChangeProduct = (product) => {
        setProductActive(product)
        handleClickOpen()
    }


    const handleChange = (event) => {
        setCategoryActive(event.target.value)
        const searchParams = new URLSearchParams(location.search)
        searchParams.set("category", event.target.value)
        const query = searchParams.toString()
        navigate({ search: `${query}` })
        setPage(1)
    };

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleAll = () => {
        const data = {
            category: "",
            pageNumber: page,
            pageSize: 6,
            color: null,
            sizes: null,
            minPrice: 0,
            maxPrice: 0,
            sort: 'price_low',
            title: ""
        }

        dispatch(findProducts(data))
        setCategoryActive("")
        setTitle("")
    }

    const handleOpenEdit = (product) => {
        setProductUpdate(product)
        setOpenProductModify(true)
    }

    const updateSuccess = () => {
        toast.success("Update thành công sản phẩm")
        handleCloseModify()
        setProductUpdate(null)
        const data = {
            category: "",
            pageNumber: page,
            pageSize: 6,
            color: null,
            sizes: null,
            minPrice: 0,
            maxPrice: 0,
            sort: 'price_low',
            title: ""
        }

        dispatch(findProducts(data))
        setCategoryActive("")
        setTitle("")
    }

    return (
        <div>
            <Card className='mt-2'>
                <CardHeader title="All Products" className='text-left' />
                <Grid container sx={{ ml: "16px" }} spacing={2}>
                    <Grid item xs={3}>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Lọc theo danh mục</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={categoryAcive}
                                    label="Danh mục"
                                    onChange={handleChange}
                                >
                                    {
                                        category.length > 0 && category.map(c => (
                                            <MenuItem value={c}>{c}</MenuItem>
                                        ))
                                    }
                                    {/* <Menu> */}
                                    {/* <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem> */}
                                    {/* </Menu> */}

                                </Select>
                            </FormControl>
                        </Box>

                    </Grid>
                    <Grid item xs={3}>
                        <TextField fullWidth label="Nhập title" value={title} onChange={e => handleTitle(e)} />
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant='outlined' onClick={handleAll}>Xem tất cả</Button>
                    </Grid>
                </Grid>


                <TableContainer component={Paper} sx={{ ml: "16px", mt: "30px" }} >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center">description</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Quantity</TableCell>
                                <TableCell align="center">Category</TableCell>
                                <TableCell align="center">Action</TableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products?.productList?.length > 0 &&
                                products?.productList.map((p) => (
                                    <TableRow
                                        key={p.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Avatar>
                                                <img src={p.imageUrl} width="40px" height="40px" alt='Anh' />

                                            </Avatar>
                                        </TableCell>
                                        <TableCell align="center">{p?.title}</TableCell>
                                        <TableCell align="center">{p?.description}</TableCell>
                                        <TableCell align="center">{p&&  Number(p.price).toLocaleString("vi-VN")}đ</TableCell>
                                        <TableCell align="center">{p?.quantity}</TableCell>
                                        <TableCell align="center">{p?.category.name}</TableCell>
                                        <TableCell align="center">
                                            <Button onClick={e => handleOpenEdit(p)}>
                                                <BorderColorIcon />
                                            </Button>
                                            <Button sx={{ color: "red" }} onClick={() => onChangeProduct(p)} ><DeleteIcon /></Button>

                                        </TableCell>

                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
            <div className='flex justify-center mt-3'>
                <Pagination count={products?.totalPages} onChange={(e, newPage) => handleChangePage(newPage)} color="secondary" />

            </div>
            <ConfirmDelProduct productId={productActive?.id} hanldeDelProduct={hanldeDelProduct} open={open} handleClose={handleClose} />
            <ProductModify key={productUpdate?.id || 1} open={openProductModify} product={productUpdate} handleClose={handleCloseModify} success={updateSuccess}/>
            <ToastContainer />

        </div>

    );
}
