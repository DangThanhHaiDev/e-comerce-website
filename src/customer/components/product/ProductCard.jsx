import './ProductCard.scss'

const ProductCard = ({product})=>{
    return(
        <div className="productCard w-[15rem] m-3 transition-all cursor-pointer max-sm:w-full mb-4">
            <div className="h-[20rem]">
                <img className="w-full h-full object-cover object-left-top" src={product.imageUrl}/>
            </div> 
            <div className="textPart py-3 px-3 text-left">
                <p className="font-bold opacity-80">{product.brand}</p>
                <p className="opacity-60">{product.title}</p>
            </div>
            <div className="flex space-x-3 px-3">
                <p className="font-semibold">{product.discountedPrice}</p>
                <p className="line-through opacity-80">{product.price}</p>
                <p className="text-red-600 font-semibold">{product.discountPersent} off</p>
            </div>
        </div>
    )
}

export default ProductCard