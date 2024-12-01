import { Button, Grid, MenuItem, TextField } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesByLevel, getCategoriesByLevel2 } from "../../State/Category/Action";
const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];
const CreateProductForm = () => {
    const dispatch = useDispatch()
    const top = useSelector(store => store.category.category)
    const two = useSelector(store => store.category.category)


    useEffect(() => {
        dispatch(getCategoriesByLevel(1))
    }, [])
    useEffect(() => {
        if (top && top[0])
            dispatch(getCategoriesByLevel2(top[0].id))
    }, [top])
    return (
        <div className="p-[16px]">
            <h1 className="text-4xl mt-5">Add New Product</h1>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField id="outlined-basic" label="Image Url" variant="outlined" name="imageUrl" fullWidth />
                </Grid>
                <Grid item xs={6}>
                    <TextField id="outlined-basic" label="Brand" variant="outlined" name="brand" fullWidth />
                </Grid>
                <Grid item xs={6}>
                    <TextField id="outlined-basic" label="Title" variant="outlined" name="title" fullWidth />
                </Grid>
                <Grid item xs={6}>
                    <TextField id="outlined-basic" label="Color" variant="outlined" name="color" fullWidth />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="outlined-number"
                        label="Quantity"
                        name="quantity"
                        type="number"
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="outlined-number"
                        label="Price"
                        name="price"
                        type="number"
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="outlined-number"
                        label="Dicounted Price"
                        name="discountedPrice"
                        type="number"
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="outlined-number"
                        label="Dicounted Percen"
                        name="discountedPercen"
                        type="number"
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        sx={{ textAlign: "left" }}

                        id="outlined-select-currency-native"
                        select
                        label="Top level Category"
                        name="level1Category"
                        defaultValue={top && top[0] ? top[0].id : ''}
                        fullWidth
                        slotProps={{
                            select: {
                                native: true,
                            },
                        }}
                    >
                        {
                            top ?
                                top.map((item) => (<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>))
                                : ''
                        }
                    </TextField>
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="outlined-select-currency-native"
                        select
                        label="Two level Category"
                        name="level2Category"
                        defaultValue="EUR"
                        fullWidth
                        slotProps={{
                            select: {
                                native: true,
                            },
                        }}

                    ></TextField>
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="outlined-select-currency-native"
                        select
                        label="Three level Category"
                        name="level3Category"
                        defaultValue="EUR"
                        fullWidth
                        slotProps={{
                            select: {
                                native: true,
                            },
                        }}

                    ></TextField>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        name="des"
                        defaultValue="Description"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Size"
                        id="outlined-size-small"
                        defaultValue="S"
                        size="S"
                        disabled="true"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="outlined-number"
                        label="Quantity"
                        name="smallQuantity"
                        type="number"
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Size"
                        id="outlined-size-small"
                        size="S"
                        defaultValue="M"
                        disabled="true"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="outlined-number"
                        label="Quantity"
                        name="mediumQuantity"
                        type="number"
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Size"
                        id="outlined-size-small"
                        size="S"
                        defaultValue="L"
                        disabled="true"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="outlined-number"
                        label="Quantity"
                        name="largeQuantity"
                        type="number"
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" fullWidth> <AddCircleIcon sx={{ marginRight: "10px" }} />Add new Product</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default CreateProductForm