import { Avatar, Button, Card, CardHeader, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { deleteProduct, findProducts } from "../../State/Product/Action"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect, useState } from "react"
import { api } from "../../config/apiConfig"

const CustomerTable = ()=>{
    const dispatch = useDispatch()
    const products = useSelector(store => store.product.products)
    const isDelete = useSelector(store=>store.product.isDelete)
    const [customers, setCustomers] = useState([])

    const [page, setPage] = React.useState(1)
    const location = useLocation()
    const navigate = useNavigate()

    const getAllCustomer = async()=>{
        const response = await api.get("/api/users/all")
        const {data} = response
        setCustomers(data)
    }

    
    React.useEffect(() => {
        const data = {
            category: "",
            pageNumber: page,
            pageSize: 6,
            color: null,
            sizes: null,
            minPrice: 0,
            maxPrice: 0,
            sort: 'price_low'
        }
        
        dispatch(findProducts(data))
    }, [page, location.search, isDelete])

    useEffect(()=>{
        getAllCustomer()
    }, [])


    const handleChangePage =(newPage)=>{
        const searchParams = new URLSearchParams(location.search)
        searchParams.set("page", newPage)
        const query = searchParams.toString()
        navigate({search:`${query}`})
        setPage(newPage)
    }
    const hanldeDelProduct = (id) => {
        dispatch(deleteProduct(id))
    }

    const handleBlock = async(id)=>{        
        try {
            await api.post("/api/users/block", id)
        } catch (error) {
            
        }
        getAllCustomer()
    }
    const handleUnBlock = async(id)=>{
        try {
            await api.post("/api/users/unBlock", id)
        } catch (error) {
            
        }
        getAllCustomer()
    }
    return (
        <div>
            <Card className='mt-2'>
                <CardHeader title="All Users" className='text-left' />
                <TableContainer component={Paper} sx={{ ml: "16px" }} >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">First Name</TableCell>
                                <TableCell align="center">Last Name</TableCell>
                                <TableCell align="center">Created At</TableCell>
                                <TableCell align="center">Number Orders</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Total Money</TableCell>
                                <TableCell align="center">Block</TableCell>
                                <TableCell align="center">UnBlock</TableCell>



                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(customers) && customers.length > 0 &&
                                customers?.map((c) => (
                                    <TableRow
                                        key={c.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center">
                                            {c.email}
                                        </TableCell>
                                        <TableCell align="center">{c.firstName}</TableCell>
                                        <TableCell align="center">{c.lastName}</TableCell>
                                        <TableCell align="center">{c.createdAt}</TableCell>
                                        <TableCell align="center">{c.ordersNumber}</TableCell>
                                        <TableCell align="center">{!c.block? "Còn hoạt động": "Bị chặn"}</TableCell>
                                        <TableCell align="center">{Number(c.money).toLocaleString("vi-VN")}đ
                                        </TableCell>
                                        <TableCell align="center"><Button disabled={c.block} variant="contained" onClick={e=>handleBlock(c.id)}>Block</Button></TableCell>
                                        <TableCell align="center"><Button disabled={!c.block} variant="contained" onClick={e=>handleUnBlock(c.id)}>Un Block</Button></TableCell>

                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
            <div className='flex justify-center mt-3'>
                <Pagination count={products?.totalPages} onChange={(e, newPage)=>handleChangePage(newPage)} color="secondary" />

            </div>
        </div>

    );
}

export default CustomerTable