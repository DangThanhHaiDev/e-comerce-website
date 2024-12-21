import { useNavigate } from 'react-router-dom'
import './ProductCard.scss'

const ProductCard = ({product})=>{
    const navigate = useNavigate()
    const handleProductCardClick = ()=>{
        navigate(`/product/${product.id}`)
    }
    
    return(
        <div onClick={()=>handleProductCardClick()}
         className="productCard w-[17rem] m-3 transition-all cursor-pointer max-sm:w-full mb-4">
            <div className="h-[20rem]">
                <img className="w-full h-full object-cover object-left-top" src={product.imageUrl} alt="anh"/>
            </div> 
            <div className="textPart py-3 px-3 text-left">
                <p className="font-bold opacity-80">{product.brand}</p>
                <p className="opacity-60">{product.title}</p>
            </div>
            <div className="flex space-x-3 px-3">
                <p className="font-semibold">{Number(product.discountedPrice).toLocaleString("vi-VN")}đ</p>
                <p className="line-through opacity-80">{ Number(product.price).toLocaleString("vi-VN")}đ</p>
                <p className="text-red-600 font-semibold">{product.discountPresent}% off</p>
            </div>
        </div>
    )
}

export default ProductCard