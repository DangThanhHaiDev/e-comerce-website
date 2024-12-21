import { Avatar, Box, Grid } from "@mui/material"
import { useEffect } from "react"
import { useSelector } from "react-redux"

const Profile = () => {
    const user  = useSelector(store=>store.auth.user)
    useEffect(()=>{
        
        
    }, [])
    return (
        <div className="p-5">
            <Grid container spacing={2} sx={{padding:0}}>
                <Grid item xs={9}>
                    <div className="flex items-center justify-start">
                        <Avatar sx={{ width: "10rem", height: "10rem" }}></Avatar>
                    </div>
                </Grid>
                <Grid item xs={9}>
                    <div className="flex items-center justify-start">
                        <p className="text-[#fdcb82] text-2xl font-bold">{user?.lastName +" "+ user?.firstName}</p>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className="flex items-center justify-start">
                        <Box>
                            <Grid container sx={{padding:0}} spacing={2}>
                                <Grid item xs={4}>
                                    <p className="text-lg font-semibold text-left  ">Email</p>
                                </Grid>
                                <Grid item xs={5}>
                                    <p className="text-lg text-left ">{user?.email}</p>
                                </Grid>
                                <Grid item xs={4}>
                                    <p className="text-lg font-semibold text-left">First Name</p>
                                </Grid>
                                <Grid item xs={5}>
                                    <p className="text-lg text-left ">{user?.firstName}</p>
                                </Grid>
                                <Grid item xs={4}>
                                    <p className="text-lg font-semibold text-left   ">Last Name</p>
                                </Grid>
                                <Grid item xs={5}>
                                    <p className="text-lg text-left ">{user?.lastName}</p>
                                </Grid>
                                <Grid item xs={4}>
                                    <p className="text-lg font-semibold text-left   ">Moble Phone</p>
                                </Grid>
                                <Grid item xs={5}>
                                    <p className="text-lg text-left ">{user?.mobile}</p>
                                </Grid>
                                <Grid item xs={4}>
                                    <p className="text-lg font-semibold text-left   ">Address</p>
                                </Grid>
                                <Grid item xs={5}>
                                    <p className="text-lg text-left ">Hồ Chí Minh</p>
                                </Grid>
                            </Grid>
                        </Box>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Profile