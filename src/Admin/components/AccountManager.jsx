import { Avatar, Button, Card, CardHeader, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { deleteProduct, findProducts } from "../../State/Product/Action"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect, useState } from "react"
import { api } from "../../config/apiConfig"
import { debounce } from "lodash"

const AccountManager = () => {

    const [admins, setAdmins] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    const [searchByEmail, setSearchByEmail] = useState("")

    const [page, setPage] = React.useState(1)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        getAllUsersAdmin(page)
    }, [page])
    useEffect(() => {
        if (searchByEmail)
            searchUserByEmail()
    }, [searchByEmail])

    const getAllUsersAdmin = async (pageNumber) => {
        const response = await api.get(`/api/users/adminUsers?pageNumber=${pageNumber - 1}&pageSize=6`);
        const { data } = response
        setAdmins(data.users)
        setTotalPages(data.totalPages)
    }

    const handleChangePage = (newPage) => {
        const searchParams = new URLSearchParams(location.search)
        searchParams.set("page", newPage)
        const query = searchParams.toString()
        navigate({ search: `${query}` })
        setPage(newPage)
    }

    const handleCreateAccount = () => {
        navigate("/admin/account/create")
    }

    const handleBlock = async (id) => {
        try {
            await api.post("/api/users/block", id)
        } catch (error) { }
        getAllUsersAdmin(page)
    }

    const handleUnBlock = async (id) => {
        try {
            await api.post("/api/users/unBlock", id)
        } catch (error) { }
        getAllUsersAdmin(page)
    }

    const searchUserByEmail = async () => {
        if (!searchByEmail) {
            getAllUsersAdmin(1)
            return
        }
        try {
            const response = await api.get(`/api/users/search/email?pageSize=6&pageNumber=0&email=${searchByEmail}`)
            const { data } = response
            setAdmins(data.users)
            setTotalPages(data.totalPages)
        } catch (error) { }
    }



    const handleOnChangeEmail = (e) => {
        if (!e.target.value.trim()) {
            getAllUsersAdmin(1)
        }
        setSearchByEmail(pre => e.target.value)
    }

    return (
        <div>
            <Card className='mt-2'>
                <CardHeader title="Quản trị viên website" className='text-left' />
                <div className="text-left ml-3 flex space-x-20">
                    <Button variant="contained" onClick={handleCreateAccount}>
                        Create new Account
                    </Button>
                    <div className="space-x-5">
                        <TextField label="Nhập vào Email" value={searchByEmail} onChange={handleOnChangeEmail} />
                    </div>
                </div>
                <TableContainer component={Paper} sx={{ ml: "16px", marginTop: "20px" }} >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">First Name</TableCell>
                                <TableCell align="center">Last Name</TableCell>
                                <TableCell align="center">Task</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Block</TableCell>
                                <TableCell align="center">UnBlock</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {admins?.length > 0 &&
                                admins.map((c) => (
                                    <TableRow
                                        key={c.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center">{c.email}</TableCell>
                                        <TableCell align="center">{c.firstName}</TableCell>
                                        <TableCell align="center">{c.lastName}</TableCell>
                                        <TableCell align="center">{c.role}</TableCell>
                                        <TableCell align="center">{!c.block ? "Active" : "Blocked"}</TableCell>
                                        {
                                            c.role !== "admin" &&
                                            <TableCell align="center">
                                                <Button disabled={c.block} onClick={() => handleBlock(c.id)} variant="contained">Block</Button>
                                            </TableCell>
                                        }
                                        {
                                            c.role !== "admin" &&
                                            <TableCell align="center">
                                                <Button disabled={!c.block} onClick={() => handleUnBlock(c.id)} variant="contained">UnBlock</Button>
                                            </TableCell>
                                        }

                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
            <div className='flex justify-center mt-3'>
                <Pagination count={totalPages} onChange={(e, newPage) => handleChangePage(newPage)} color="secondary" />
            </div>
        </div>
    );
}

export default AccountManager
