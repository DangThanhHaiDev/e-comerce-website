import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect, useRef, useState } from "react";

import { api } from "../../config/apiConfig";
import { Box, Button, Grid, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const CreateProductTypeForm = () => {


    const [isValidForm, setValidForm] = useState(true)
    const [isExisted, setExisted] = useState(true)
    const [isDup, setDup] = useState(true)
    const [isSuccess, setSuccess] = useState(false)

    const [twoLevel, setTwoLevel] = useState([{ name: "", thirdLevel: [""] }])

    const formRef = useRef()
    useEffect(() => {
    }, [])



    const handleAddProduct = async (e) => {
        setSuccess(false)
        setValidForm(true)
        setExisted(true)
        setDup(true)
        e.preventDefault()
        const data = new FormData(e.currentTarget)

        if (!data.get("top").trim()) {
            setValidForm(false)
            return
        }
        let isValid = true

        twoLevel.map((two)=>{
            if(!two.name.trim()){
                isValid = false
            }
            two.thirdLevel.map((three)=>{
                if(!three){
                    isValid = false
                }
                return three
            })
            return two
        }, )
        
        if(!isValid){
            setValidForm(false)
            return
        }

        let isTrue = true

        twoLevel.map((item, index)=>{
            twoLevel.map((value, i)=>{
                if(index !== i && item.name.trim() === value.name.trim()){
                    isTrue = false
                }
            })
            item.thirdLevel.map((value, i)=>{
                item.thirdLevel.map((v, z)=>{
                    if(i!==z && value == v){
                        isTrue = false
                    }
                })
            })
        })

        if(!isTrue){
            setDup(false)
            return
        }
        

        const useData = {
            topCategory: data.get("top"),
            twoLevelCategoryRequests: twoLevel,
        }


        

        try {
            const response = await api.post("/api/admin/categories/create", useData)
            const { data } = response
            
            if (!data) {
                setExisted(false)
            }
            else{
                setSuccess(true)
            }


        } catch (error) {
        }
        formRef.current.reset()

    }

   

    const handleOnChangeTwo = (e, index) => {
        const newTwo = [...twoLevel]
        newTwo[index].name = e.target.value        
        setTwoLevel(newTwo)
    }
    const handleOnChangeThree = (e, index, three) => {
        const newChange = [...twoLevel]
        newChange[index].thirdLevel[three] = e.target.value
        setTwoLevel(newChange)
    }
    const handleAddCategory = () => {
       setTwoLevel([...twoLevel, {name: "", thirdLevel:[""]}])
        
    }
    const handleAddThree = (e, two)=>{
        const add = [...twoLevel]
        add[two].thirdLevel.push("")
        setTwoLevel(add)
    }

    const handleRemoveCategory = (index, level) => {
        if (level == 2 && twoLevel.length > 1) {

            setTwoLevel(twoLevel.filter((v, i) => (i != index)))
        }
        
    }

    const handleRemoveThree = (twoI, three)=>{
        const two = [...twoLevel]
        if(two[twoI].thirdLevel.length>1){
            two[twoI].thirdLevel = two[twoI].thirdLevel.filter((item, index)=>(index!=three))
            setTwoLevel(two)
        }
    }

   
    return (
        <form onSubmit={e => handleAddProduct(e)} encType="multipart/form-data" ref={formRef}>
            <div className="p-[16px]">
                <h1 className="text-4xl mt-5">Create Product Type</h1>
                <Grid container spacing={2}>


                    <Grid item xs={9}>
                        <TextField id="outlined-basic" label="Top Level Category" variant="outlined" name="top" fullWidth />
                    </Grid>
                    {
                        twoLevel.map((item, index) => (
                            <Grid key={index} item xs={12}>
                                <Box>
                                    <Grid container sx={{ padding: 0 }}>
                                        <Grid item xs={9}>
                                            <TextField id="outlined-basic" value={item.name} onChange={e => handleOnChangeTwo(e, index)} label="Second Level Category" variant="outlined" name="two" fullWidth />
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Button sx={{ textTransform: "none", color: "red" }} onClick={() => handleRemoveCategory(index, 2)}>
                                                <CloseIcon />
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                                {
                                    item.thirdLevel.map((v, i) => (
                                        <Box>
                                            <Grid container sx={{ padding: 0, marginTop:"20px" }}>
                                                <Grid item xs={5}>
                                                    <TextField id="outlined-basic" value={v} onChange={e => handleOnChangeThree(e, index, i)} label="Third Level Category" variant="outlined" name="two" fullWidth />
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <Button sx={{ textTransform: "none", color: "red" }} onClick={() => handleRemoveThree(index, i)}>
                                                        <CloseIcon />
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    ))
                                }
                                <Grid item xs={12}>
                                    <Button onClick={(e) => handleAddThree(e, index)} sx={{ textTransform: "none" }}>
                                        <AddCircleIcon />  Add new Third Category
                                    </Button>
                                </Grid>

                            </Grid>
                        ))
                    }




                    <Grid item xs={6} sx={{ textAlign: "left" }}>
                        <Button sx={{ textTransform: "none" }} onClick={handleAddCategory}>
                            <AddCircleIcon />  Add new Second Category
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        {
                            !isValidForm &&
                            <p className="text-sm text-red-700">Vui lòng nhập đầy đủ thông tin</p>

                        }
                    </Grid>
                    <Grid item xs={12}>
                        {
                            isSuccess &&
                            <p className="text-sm text-green-600">Bạn đã tạo thành công một danh mục</p>

                        }
                    </Grid>
                    <Grid item xs={12}>
                        {
                            !isDup &&
                            <p className="text-sm text-red-700">Không thể tồn tại danh mục trùng nhau</p>

                        }
                    </Grid>
                    
                    <Grid item xs={12}>
                        {
                            !isExisted &&
                            <p className="text-sm text-red-700">Danh mục này đã tồn tại</p>

                        }
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" fullWidth> <AddCircleIcon sx={{ marginRight: "10px" }} />Add new Product Type</Button>
                    </Grid>
                </Grid>
            </div>
        </form>

    )
}

export default CreateProductTypeForm