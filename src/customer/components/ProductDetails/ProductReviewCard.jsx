import { Avatar, Box, Grid, Rating } from "@mui/material";

const ProductReviewCard = ({review, rating}) => {
  return (
    <div>
      <Grid container columnSpacing={8} spacing={2} sx={{padding: 2, gap: 1}}>
        <Grid xs={1} item>
          <Box>
            <Avatar
              className="text-white"
              sx={{ width: 50, height: 50, bgcolor: "#9155fd"}}
            >
              {review.user.lastName}
            </Avatar>
          </Box>
        </Grid>
        <Grid item xs={9} sx={{textAlign: "left"}}>
          <div className="space-y-2 text-md">
            <div>
              <p className="font-semibold text-lg">{review.user.lastName}</p>
              <p className="opacity-60 text-sm">{review.createdAt}</p>
            </div>
          </div>
          <Rating value={rating} name="half-rating" readOnly precision={.5} sx={{fontSize: "1.2rem"}}/>
          <p className="text-sm">{review.review}</p>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductReviewCard;
