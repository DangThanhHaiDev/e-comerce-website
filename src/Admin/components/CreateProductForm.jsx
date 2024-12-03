import { Button, Grid, MenuItem, TextField } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesByLevel, getCategoriesByLevel2, getCategoriesByLevel3 } from "../../State/Category/Action";
import { createProduct } from "../../State/Product/Action";

const CreateProductForm = () => {
    const dispatch = useDispatch()
    const top = useSelector(store => store.category.category)
    const two = useSelector(store => store.category.category2)
    const three = useSelector(store => store.category.category3)
    const formRef = useRef()

    const [lv1, setLv1] = useState('')
    const [lv2, setLv2] = useState('')
    const [lv3, setLv3] = useState('')

    const hanldeChangeTop = (e) => {
        dispatch(getCategoriesByLevel2(e.target.value))
        setLv1(e.target.value)
    }

    const hanldeChangeTwo = (e) => {
        dispatch(getCategoriesByLevel3(e.target.value))
        setLv2(e.target.value)
    }

    const handleChangeThree = (e) => {
        setLv3(e.target.value)
    }

    useEffect(() => {
        dispatch(getCategoriesByLevel(1))
    }, [])

    

    const handleAddProduct = (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const useData = {
            title: data.get("title"),
            description: data.get("des"),
            price: data.get("price"),
            discountedPrice: data.get("discountedPrice"),
            discountPresent: data.get("discountedPercen"),
            quantity: data.get("quantity"),
            brand: data.get("brand"),
            color: data.get("color"),
            imageUrl: data.get("imageUrl"),
            topLevelCategory: data.get("level1Category"),
            secondLevelCategory: data.get("level2Category"),
            thirdLevelCategory: data.get("level2Category"),
            sizes: [
                { name: "S", quantity: data.get("smallQuantity") },
                { name: "M", quantity: data.get("mediumQuantity") },
                { name: "M", quantity: data.get("largeQuantity") },
            ]
        }
        formRef.current.reset()
        dispatch(createProduct(useData))
    }

    return (
        <form onSubmit={e => handleAddProduct(e)} ref={formRef}>
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
                            onChange={e => hanldeChangeTop(e)}
                            sx={{ textAlign: "left" }}

                            id="outlined-select-currency-native"
                            select
                            label="Top level Category"
                            name="level1Category"
                            value={lv1}
                            defaultChecked={top ? top[0].id : ""}

                            fullWidth
                            slotProps={{
                                select: {
                                    native: true,
                                },
                            }}
                        >
                            {
                                top &&
                                top.map((item) => (<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>))
                            }
                        </TextField>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            onChange={e => hanldeChangeTwo(e)}
                            sx={{ textAlign: "left" }}
                            id="outlined-select-currency-native"
                            select
                            label="Two level Category"
                            name="level2Category"
                            // defaultValue="EUR"
                            fullWidth
                            slotProps={{
                                select: {
                                    native: true,
                                },
                            }}

                        >
                            {
                                two &&
                                two.map((item) => (<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>))
                            }
                        </TextField>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            onChange={e => handleChangeThree(e)}
                            sx={{ textAlign: "left" }}
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

                        >
                            {
                                three &&
                                three.map((item) => (<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>))
                            }
                        </TextField>
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
                        <Button type="submit" variant="contained" fullWidth> <AddCircleIcon sx={{ marginRight: "10px" }} />Add new Product</Button>
                    </Grid>
                </Grid>
            </div>
        </form>

    )
}

export default CreateProductForm