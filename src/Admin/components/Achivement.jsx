import { Button, Card, CardContent, styled, Typography } from "@mui/material"

const TrigleImg = styled("img")({
    right:0,
    bottom:0,
    height:170,
    position: "absolute"
})

const TrophyImg = styled("img")({
    right: 36,
    bottom: 20,
    height: 98,
    position: "absolute"
})

const Achivement = ()=>{
    return(
        <Card sx={{position:"relative", bgcolor:"#2C3335", color:"white"}}>
            <CardContent className="text-left">
                <Typography variant="h6" sx={{letterSpacing:".25px"}}>
                    Shop Hai Dang
                </Typography>
                <Typography variant="body2">
                    Congratulations
                </Typography>
                <Typography variant="h5" sx={{my:3.1}}>420.8K</Typography>
                <Button size="small" variant="contained">Views Sales</Button>
                <TrigleImg src="https://img.lovepik.com/element/40035/8270.png_860.png"></TrigleImg>
            </CardContent>
        </Card>
    )
}

export default Achivement