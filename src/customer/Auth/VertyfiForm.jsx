import { Button, Grid, TextField } from "@mui/material"
import { useEffect, useState } from "react"

const VetyfiForm = ({ email, vetyfiCode, handleClose, reset, backHandler, createUser }) => {
    const [otp, setOtp] = useState(new Array(6).fill(""))

    useEffect(()=>{
        document.getElementById(`index0`).focus()
    }, [])

    const handleChangeCode = (e, index) => {
        let newOtp = [...otp]
        newOtp[index] = e.target.value
        setOtp(newOtp)
        if (e.target.value && index < otp.length - 1) {            
            document.getElementById(`index${index+1}`).focus()
        }
        if(index == 5 && e.target.value){
            if(vetyfiCode == newOtp.join("")){
                createUser()
                handleClose(reset)
                setTimeout(()=>{
                    alert("Bạn đã đăng ký tài khoản thành công, Chúc bạn mua sắm vui vẽ!")
                }, 500)
            }

        }
    }

    const handleBack = ()=>{
        backHandler()
    }

    return (
        <div className="p-3 space-y-3">
            <h5 className="font-semibold">Xác thực tài khoản</h5>
            <p className="text-sm">Chúng tôi đã gửi một mã gồm 6 số, đến email {email}</p>
            <form action="">
                <Grid container spacing={2} sx={{ padding: 0, marginTop: "20px" }}>
                    {
                        otp.map((item, index) => (
                            <Grid item xs={2} key={index}>
                                <TextField
                                    id={`index${index}`}
                                    onKeyPress={(e) => {
                                        if (!/[0-9]/.test(e.key)) {
                                            e.preventDefault(); // Chặn ký tự không phải số
                                        }
                                    }}
                                    inputProps={{
                                        maxLength: 1,
                                        style: { textAlign: "center", },
                                    }} fullWidth name="code" sx={{ textAlign: "center" }} value={item} onChange={e => handleChangeCode(e, index)} />
                            </Grid>
                        ))
                    }
                    <Grid item xs={6}>
                        <Button onClick={handleBack}>Quay lại</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained">Gửi lại mã</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default VetyfiForm