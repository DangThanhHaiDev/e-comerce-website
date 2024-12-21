import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect, useRef, useState } from "react";

import { api, API_BASE_URL } from "../../config/apiConfig";
import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
const CreateAccount = () => {


    const [isValidForm, setValidForm] = useState(true)
    const [isValidEmail, setValidEmail] = useState(true)
    const [isValidPass, setValidPass] = useState(true)
    const [isExisted, setExisted] = useState(false)
    const [isSuccess, setSuccess] = useState(false)



    const formRef = useRef()
    useEffect(() => {
    }, [])



    const handleCreate = async (e) => {
        e.preventDefault()
        setValidForm(true)
        setValidEmail(true)
        setValidPass(true)
        setExisted(false)
        setSuccess(false)


        const data = new FormData(e.currentTarget)
        const firstName = data.get("firstName").trim()
        const lastName = data.get("lastName").trim()
        const password = data.get("password").trim()
        const email = data.get("email").trim()
        const role = data.get('row-radio-buttons-group');
        if (!firstName || !lastName || !password || !email) {
            setValidForm(false)
            return
        }
        if (!testEmail(email)) {
            setValidEmail(false)
            return
        }
        if (!testPassword(password)) {
            setValidPass(false)
            return
        }
        const useData = {
            email,
            firstName,
            lastName,
            password,
            role
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/auth/signup`, useData)
            const { data } = response
            setSuccess(true)

        } catch (error) {
            setExisted(true)
        }
        formRef.current.reset()

    }

    const testEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const testPassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
        return passwordRegex.test(password);
    }



    return (
        <form onSubmit={e => handleCreate(e)} encType="multipart/form-data" ref={formRef}>
            <div className="p-[16px]">
                <h1 className="text-4xl mt-5 text-left">Create Account for adminstrator</h1>
                <Grid container spacing={2}>


                    <Grid item xs={9}>
                        <TextField id="outlined-basic" label="Email" variant="outlined" name="email" fullWidth />
                    </Grid>
                    <Grid item xs={9}>
                        <TextField id="outlined-basic" label="First Name" variant="outlined" name="firstName" fullWidth />
                    </Grid>
                    <Grid item xs={9}>
                        <TextField id="outlined-basic" label="Last Name" variant="outlined" name="lastName" fullWidth />
                    </Grid>
                    <Grid item xs={9}>
                        <TextField type='password' id="outlined-basic" label="Password" variant="outlined" name="password" fullWidth />
                    </Grid>

                    <Grid item xs={9}>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Role</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                defaultValue="nhanvien"
                            >
                                <FormControlLabel value="giamdoc" control={<Radio />} label="Giám đốc" />
                                <FormControlLabel value="nhanvien" control={<Radio />} label="Nhân viên" />

                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        {
                            !isValidForm &&
                            <p className="text-sm text-red-700 text-left">Vui lòng nhập đầy đủ thông tin</p>

                        }
                    </Grid>
                    <Grid item xs={12}>
                        {
                            !isValidEmail &&
                            <p className="text-sm text-red-700 text-left">Email bạn vừa nhập không hợp lệ</p>

                        }
                    </Grid>
                    <Grid item xs={12}>
                        {
                            !isValidPass &&
                            <p className="text-sm text-red-700 text-left">Mật khẩu phải trên 8 ký tự, có ký tự hoa, thường, đặc biêt</p>

                        }
                    </Grid>
                    <Grid item xs={12}>
                        {
                            isExisted &&
                            <p className="text-sm text-red-700 text-left">Email này dã tồn tại</p>

                        }
                    </Grid>
                    <Grid item xs={12}>
                        {
                            isSuccess &&
                            <p className="text-sm text-green-500 text-left">Bạn đã tạo tài khoản thành công</p>

                        }
                    </Grid>
                    <Grid item xs={9}>
                        <Button type="submit" variant="contained" fullWidth> <AddCircleIcon sx={{ marginRight: "10px" }} />Create account</Button>
                    </Grid>
                </Grid>
            </div>
        </form>

    )
}

export default CreateAccount