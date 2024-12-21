import { Button, Grid, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { register } from "../../State/Auth/Action";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";

const RegisterForm = ({handleCheckEmailSuccess}) => {
    const navigate = useNavigate();

    const [isValidFirstName, setValidFirstName] = useState(true)
    const [isValidLastName, setValidLastName] = useState(true)
    const [isValidEmail, setValidEmail] = useState(true)
    const [isValidPassword, setValidPassword] = useState(true)
    const [isExistedEmail, setIsExistedEmail] = useState(true)
    const [isLoading, setLoading] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault();
        reset()
        const d = new FormData(event.currentTarget);
        const firstName = d.get("firstName").trim()
        const lastName = d.get("lastName").trim()
        const email = d.get("email").trim()
        const password = d.get("password").trim()
        let isValidForm = true

        if (!firstName) {
            setValidFirstName(false)
            isValidForm = false
        }
        if (!lastName) {
            setValidLastName(false)
            isValidForm = false
        }
        if (!testEmail(email)) {
            setValidEmail(false)
            isValidForm = false
        }
        if (!testPassword(password)) {
            setValidPassword(false)
            isValidForm = false
        }
        if (!isValidForm) { return }

        const useData = {
            email, password, firstName, lastName
        };
        try {
            setLoading(true)            
            const response = await axios.post(`${API_BASE_URL}/email/send`, { email, name: lastName })
            const { data } = response
            console.log(data);
            
            if (data.success) {
                handleCheckEmailSuccess(email, data.vertifyCode, firstName, lastName, password)
            }
            
        } catch (error) {
            setIsExistedEmail(false)

        }
        setLoading(false)

    };

    const testEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const testPassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
        return passwordRegex.test(password);
    }

    // Ví dụ sử dụng


    const reset = () => {
        setValidEmail(true)
        setValidFirstName(true)
        setValidLastName(true)
        setValidPassword(true)
        setIsExistedEmail(true)
    }
    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            id="firstName"
                            name="firstName"
                            label="Họ"
                            variant="outlined"
                            fullWidth
                        />
                        {
                            !isValidFirstName &&
                            <p className="text-sm text-red-700">Họ không dc bỏ trống</p>

                        }

                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            id="lastName"
                            name="lastName"
                            variant="outlined"
                            label="Tên"
                            fullWidth
                        />
                        {
                            !isValidLastName &&
                            <p className="text-sm text-red-700">Tên không dc bỏ trống</p>
                        }
                    </Grid>


                    <Grid item xs={12}>
                        <TextField
                            id="email"
                            name="email"
                            variant="outlined"
                            label="Email"
                            fullWidth
                        />
                        {
                            !isValidEmail &&
                            <p className="text-sm text-red-700">Email không hợp lệ</p>

                        }
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            id="password"
                            name="password"
                            label="Mật khẩu"
                            type="password"
                            fullWidth
                        />
                        {
                            !isValidPassword &&
                            <p className="text-sm text-red-700">Mật khẩu phải có ít nhất một ký tự hoa, thường và một ký tự đặc biệt và trên 8 ký tự</p>

                        }
                    </Grid>
                    <Grid item sx={12}>
                        {
                            !isExistedEmail &&
                            <p className="text-sm text-red-700">Email đã tồn tại</p>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            disabled={isLoading}
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{ padding: 1.5, backgroundColor: "#9155fd" }}
                        >
                            Register
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <div className="flex items-center justify-center">
                            <Typography variant="body2" color="textSecondary">
                                if you have already account?
                            </Typography>

                            <Button
                                disabled={isLoading}
                                sx={{ fontSize: "1rem", textTransform: "none" }}
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default RegisterForm;
