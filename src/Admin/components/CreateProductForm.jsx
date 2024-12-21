import { Box, Button, Grid, IconButton, Input, MenuItem, TextField } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesByLevel, getCategoriesByLevel2, getCategoriesByLevel3 } from "../../State/Category/Action";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { createProduct } from "../../State/Product/Action";
import { api, API_BASE_URL } from "../../config/apiConfig";
import axios from "axios";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { Bounce, toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { isNumber } from "lodash";






const CreateProductForm = () => {
    const dispatch = useDispatch()
    const top = useSelector(store => store.category.category)
    const two = useSelector(store => store.category.category2)
    const three = useSelector(store => store.category.category3)
    const [file, setFile] = useState(null)
    const importRef = useRef(null)
    const [isValidForm, setValidForm] = useState(true)
    const [sizeM, setSizeM] = useState(0)
    const [sizeL, setSizeL] = useState(0)
    const [sizeS, setSizeS] = useState(0)
    const [isValidSoLuong, setValidSoLuong] = useState(true)
    const [price, setPrice] = useState(0)
    const [discountPercent, setDiscountPercent] = useState(0)
    const [isSuccess, setSuccess] = useState(false)


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
        setSuccess(false)
        setValidForm(true)
        setValidSoLuong(true)
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        if (!data.get("title") || !data.get("des") || !data.get("brand") || !data.get("color") || !data.get("level1Category") || !data.get("level2Category") || !data.get("level3Category")) {
            setValidForm(false)
            return
        }
        if (Number(sizeM) + Number(sizeS) + Number(sizeL) <= 0) {
            setValidSoLuong(false)
            return
        }

        const useData = {
            title: data.get("title"),
            description: data.get("des"),
            price: Number(data.get("price")),
            discountPresent: Number(data.get("discountedPercen")),
            quantity: Number(sizeM) + Number(sizeS) + Number(sizeL),
            brand: data.get("brand"),
            color: data.get("color"),
            topLevelCategory: Number(data.get("level1Category")),
            secondLevelCategory: Number(data.get("level2Category")),
            thirdLevelCategory: Number(data.get("level3Category")),
            sizes: [
                { name: "S", quantity: Number(data.get("smallQuantity")) },
                { name: "M", quantity: Number(data.get("mediumQuantity")) },
                { name: "L", quantity: Number(data.get("largeQuantity")) },
            ]

        }
        addProduct(useData)
        setSuccess(true)
        formRef.current.reset()
    }

    const addProduct = async (reqData) => {
        try {


            const response = await api.post("http://localhost:2207/api/admin/products/", reqData);
            const { data } = response
            if (data.id) {
                uploadImage(data.id)
            }
        } catch (error) {
        }
    }
    const uploadImage = async (id) => {
        const token = localStorage.getItem('token')
        try {
            const formData = new FormData()
            formData.append("file", file)
            formData.append("id", id)

            await axios.post(`${API_BASE_URL}/api/admin/products/image`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
            })

        } catch (error) {

        }
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) {
            return
        }
        setFile(file)
    };

    const isTrueHeader = (d) => {
        if (!d.hasOwnProperty("description") || !d.hasOwnProperty("title") || !d.hasOwnProperty("brand") || !d.hasOwnProperty("discountedPercent") || !d.hasOwnProperty("quantity Size S") || !d.hasOwnProperty("price") || !d.hasOwnProperty("quantity Size L") || !d.hasOwnProperty("quantity Size M") || !d.hasOwnProperty("color") || !d.hasOwnProperty("imageUrl")) {
            return false
        }
        return true
    }

    const isTrueData = (d) => {
        if (!d.title || !d.brand || !d.color || !d.imageUrl) {
            return false;
        }
        if (!isNumber(d["quantity Size S"]) || !isNumber(d["quantity Size M"]) || !isNumber(d["quantity Size L"])) {
            return false;
        }
        if (d.discountedPercent > 100 || d.discountedPercent < 0 || d["quantity Size S"] < 0 || d["quantity Size M"] < 0 || d["quantity Size L"] < 0 || d["price"] < 0) {
            return false;
        }
        return true;
    }

    const handleFile = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) {
            return;
        }

        const reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);

        reader.onload = (event) => {
            const rs = event.target.result;
            const workbook = XLSX.read(rs, { type: "buffer" });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            if (isTrueHeader(data[0])) {
                let result = []
                data.map((product) => {

                    if (isTrueData(product)) {
                        console.log("Đúng");

                        result.push({
                            title: product.title, description: product.description, price: product.price, discountPresent: product.discountedPercent,
                            quantity: Number(product["quantity Size M"]) + Number(product["quantity Size L"]) + Number(product["quantity Size S"]),
                            brand: product.brand, color: product.color, imageUrl: product.imageUrl, topLevelCategory: product.topLevelCategory,
                            secondLevelCategory: product.secondLevelCategory, thirdLevelCategory: product.thirdLevelCategory,
                            sizes: [
                                { name: "S", quantity: Number(product["quantity Size S"]) },
                                { name: "M", quantity: Number(product["quantity Size M"]) },
                                { name: "L", quantity: Number(product["quantity Size L"]) },
                            ]
                        })
                    }
                    else {
                        console.log("sai");

                    }
                })

                if (result.length > 0) {

                    createProducts(result)
                    toast.success(`Bạn dã thêm thành công nhung san pham`)

                }


            }
            else {
                toast.error("Format file excel của bạn chưa đúng")
            }
        };

        reader.onerror = (error) => {
            console.error("Error reading file:", error);
        };
        importRef.current.value = null
    };

    const createProducts = async (reqData) => {
        try {
            const response = await api.post("/api/admin/products/creates", reqData)
            const { data } = response

            return data.row

        } catch (error) {
            return 0
        }

    }

    const handleOnChange = (e, level) => {
        switch (level) {
            case 1:
                setSizeS(e.target.value)
                break;
            case 2:
                setSizeM(e.target.value)
                break;
            case 3:
                setSizeL(e.target.value)
                break;
            case 4:
                if(Number(e.target.value)<0){
                    setPrice(0)
                    return
                }
                setPrice(e.target.value)
                break;
            case 5:
                if(Number(e.target.value)<0 || Number(e.target.value)>100){
                    setDiscountPercent(0)
                    return
                }
                setDiscountPercent(e.target.value)
                break;
            default:

        }
    }


    const handleXoaFile = () => {
        setFile(null)
    }

    return (
        <form onSubmit={e => handleAddProduct(e)} encType="multipart/form-data" ref={formRef}>
            <div className="p-[16px]">
                {/* <ToastContainer />
             */}
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                {/* Same as */}
                <ToastContainer />
                <h1 className="text-4xl mt-5">Add New Product</h1>
                <div className="text-left">
                    <input ref={importRef} type="file" id="file" accept=".xlsx" hidden onChange={e => handleFile(e)} />
                    <label htmlFor="file" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md shadow-md cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                    >
                        Import
                    </label>

                </div>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box fullWidth>
                            <input
                                // accept="image/*"
                                id="icon-button-file"
                                type="file"
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                            />
                            <label htmlFor="icon-button-file">
                                <IconButton color="primary" component="span">
                                    {
                                        file ? file.name
                                            :

                                            "Chọn file hình ảnh  cho product"
                                    }

                                    <FileUploadIcon />
                                </IconButton>
                                <Button variant="outlined" sx={{ textTransform: "none" }} onClick={handleXoaFile}>Xóa file</Button>
                            </label>
                        </Box>
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
                            name="quantity"
                            type="number"
                            disabled={true}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            fullWidth
                            label={`Số lượng sản phẩm: ${Number(sizeS) + Number(sizeM) + Number(sizeL)}`}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="outlined-number"
                            label={`Tiền sau khi giảm: ${Number(price) * ((100 - Number(discountPercent)) / 100)}`}
                            name="discountedPrice"
                            type="number"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            fullWidth
                            disabled={true}

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
                            value={price}
                            onChange={e => handleOnChange(e, 4)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="outlined-number"
                            label="Dicounted Percent"
                            name="discountedPercen"
                            type="number"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            fullWidth
                            value={discountPercent}
                            onChange={e => handleOnChange(e, 5)}
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
                            value={sizeS}
                            onChange={e => handleOnChange(e, 1)}
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
                            value={sizeM}
                            onChange={e => handleOnChange(e, 2)}
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
                            value={sizeL}
                            onChange={e => handleOnChange(e, 3)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {
                            !isValidForm &&
                            <p className="text-sm text-red-700 text-left">Vui lòng nhập đầy đủ thông tin</p>

                        }
                    </Grid>
                    <Grid item xs={12}>
                        {
                            !isValidSoLuong &&
                            <p className="text-sm text-red-700 text-left">Chưa thêm bất kì số lượng size nào</p>

                        }
                    </Grid>
                    <Grid item xs={12}>
                        {
                            isSuccess &&
                            <p className="text-sm text-green-800 text-left">Bạn đã thêm thành công sản phẩm</p>

                        }
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