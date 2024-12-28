import { Avatar, Button, Pagination, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { api, API_BASE_URL } from "../../config/apiConfig";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import SearchIcon from '@mui/icons-material/Search';

import dayjs from "dayjs";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

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

const TopProduct = () => {

    const [products, setProducts] = useState({})
    const [page, setPage] = useState(1)
    const [number, setNumber] = useState(0)
    const [startDate, setStartDay] = useState(dayjs(new Date()))
    const [endDate, setEndDate] = useState(dayjs(new Date()).add(5, 'day'))
    
    
    const handleFilterByDate = async() => {
        const formattedStartDate = startDate.format('YYYY-MM-DD');
        const formattedEndDate = endDate.format('YYYY-MM-DD');

        try {
            const response = await api.get(`/api/admin/products/best?pageSize=6&pageNumber=${page - 1}&limit=${number}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`)
            const { data } = response
            setProducts(data)
        } catch (error) {

        }
    }


    useEffect(() => {
        getProducts()
    }, [page, number])

    const getProducts = async () => {
        try {
            const response = await api.get(`/api/admin/products/best?pageSize=6&pageNumber=${page - 1}&limit=${number}`)
            const { data } = response
            setProducts(data)
        } catch (error) {

        }
    }

    const handleChangePage = (newPage) => {
        setPage(newPage)
    }

    const handleNumber = (e) => {
        setNumber(e.target.value)
    }

    const handleXemAll = ()=>{
        setNumber(0)
    }

    return (
        <div>
            <h2 className="font-semibold text-2xl p-10">Danh sách những Sản phẩm bán chạy nhất</h2>
            <div className="flex p-5 justify-between">
                <TextField onChange={e => handleNumber(e)} className="w-[30%]" id="standard-basic" label="Bạn muốn xem đến top bao nhiêu" value={number} variant="standard" type="number" />
                <div className="flex justify-end items-center items-center">
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
                <div>
                    <Button variant="contained" sx={{textTransform:"none"}} onClick={handleXemAll}>Xem tất cả</Button>
                </div>
            </div>
            <div className="p-5">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Image</StyledTableCell>
                                <StyledTableCell align="center">brand</StyledTableCell>
                                <StyledTableCell align="center">Title&nbsp;</StyledTableCell>
                                <StyledTableCell align="center">price&nbsp;</StyledTableCell>
                                <StyledTableCell align="center">Giảm giá</StyledTableCell>

                                <StyledTableCell align="center">Đã bán</StyledTableCell>
                                <StyledTableCell align="center">Doanh thu</StyledTableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products?.totalPages && products.productList.map((row, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell component="th" scope="row">
                                        <Avatar>
                                            <img src={row.image} />
                                        </Avatar>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.brand}</StyledTableCell>
                                    <StyledTableCell align="center">{row.title}</StyledTableCell>
                                    <StyledTableCell align="center">{Number(row.price).toLocaleString("vi-VN")} đ</StyledTableCell>
                                    <StyledTableCell align="center">{row.discountPercent}%</StyledTableCell>
                                    <StyledTableCell align="center">{row.quantity}</StyledTableCell>
                                    <StyledTableCell align="center">{Number(row.revenue).toLocaleString("vi-VN")} đ</StyledTableCell>

                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className='flex justify-center mt-3'>
                <Pagination count={products?.totalPages} onChange={(e, newPage) => handleChangePage(newPage)} color="secondary" />

            </div>

        </div>
    )
}

export default TopProduct