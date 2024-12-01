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
import { Avatar, Button, Card, CardHeader, Pagination } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function ProductTable() {
    const dispatch = useDispatch()
    const products = useSelector(store => store.product.products)
    const isDelete = useSelector(store=>store.product.isDelete)

    const [page, setPage] = React.useState(1)
    const location = useLocation()
    const navigate = useNavigate()

    
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
    return (
        <div>
            <Card className='mt-2'>
                <CardHeader title="All Products" className='text-left' />
                <TableContainer component={Paper} sx={{ ml: "16px" }} >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center">description</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Quantity</TableCell>
                                <TableCell align="center">Category</TableCell>
                                <TableCell align="center">Delete</TableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products ?
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
                                        <TableCell align="center">{p.title}</TableCell>
                                        <TableCell align="center">{p.description}</TableCell>
                                        <TableCell align="center">{p.price}</TableCell>
                                        <TableCell align="center">{p.quantity}</TableCell>
                                        <TableCell align="center">{p.category.name}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => hanldeDelProduct(p.id)} variant='outlined'>Delete</Button>
                                        </TableCell>

                                    </TableRow>
                                )) : ''}
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
