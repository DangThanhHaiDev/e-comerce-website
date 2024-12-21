import { Button, Grid, TextField } from "@mui/material"
import { useDispatch } from "react-redux"
import { login, login_failure, login_request, login_success } from "../../State/Auth/Action"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { API_BASE_URL } from "../../config/apiConfig"

const LoginForm = ({handleClose}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isValidLogin, setValidLogin] = useState(true)



    const handleSubmit = async (event) => {
        setValidLogin(true)
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const useData = {
            email: data.get("email"),
            password: data.get("password")
        }
        // dispatch(login(useData))
        dispatch(login_request())

        try {
            const response = await axios.post(`${API_BASE_URL}/auth/signin`, useData)
            const user = response.data


            if (user.block) {
                handleClose()
                navigate("/warning")
                return
            }

            if (user.token) {

                localStorage.setItem("token", user.token)
            }
            else {
                setTimeout(() => {
                    setValidLogin(false)
                }, 1000)
                return
            }

            dispatch(login_success(user))
            if (user.role !== 'customer') {
                navigate("/admin")
            }

        } catch (error) {
            dispatch(login_failure(error.message))
        }

    }
    return (
        <form action="" onSubmit={(event) => handleSubmit(event)} >
            <Grid container spacing={2} sx={{ padding: 0 }}>
                <Grid item xs={12}>
                    <TextField id="email" name="email" label="Email" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField id="password" name="password" type="password" label="Password" variant="outlined" fullWidth />
                </Grid>

                <Grid item xs={12}>
                    <Button type="submit" variant="contained" fullWidth sx={{ padding: "0.8rem", backgroundColor: "#9155fd" }}>Login</Button>
                </Grid>
                <Grid item xs={12}>
                    {
                        !isValidLogin &&
                        <p className="text-sm text-red-700">Tài khoản hoặc mật khẩu không chính xác</p>

                    }
                </Grid>
                <Grid item xs={12}>
                    <div className="flex justify-center">
                        <p className="flex items-center justify-center">Don't have an account?</p>
                        <Button onClick={() => navigate('/register')} sx={{ fontSize: "0.8rem" }}>Sign Up here</Button>
                    </div>
                </Grid>
            </Grid>
        </form>

    )
}

export default LoginForm