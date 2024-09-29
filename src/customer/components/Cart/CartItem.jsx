import { Button, IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const CartItem = () => {
  return (
    <div className=" shadow-lg rounded-md border-t-2 p-3">
      <div className="flex">
        <div className="w-[7rem] h-[7rem] lg:w-[7rem] lg:h-[7rem]">
          <img
            src="https://th.bing.com/th/id/OIP.WoAOA0URWWkZ5lbhs7wP-AHaHa?rs=1&pid=ImgDetMain"
            alt=""
            className="w-full h-full object-left-top object-cover"
          />
        </div>
        <div className="text-left px-5 lg:py-2">
          <h1 className="text-md font-semibold">
            Men Slim Mid Rise Black Jeans
          </h1>
          <p className="opacity-60 text-sm">Size: L, White</p>
          <p className="opacity-60 text-sm">Seller: Crishtaliyo 2fashion</p>
          <div className="flex space-x-3 mt-2 text-sm">
            <p className="font-semibold">499</p>
            <p className="line-through opacity-80">144</p>
            <p className="text-red-600 font-semibold">83% off</p>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-10 mt-0 text-sm">
        <div className="flex items-center space-x-1 mt-1">
          <IconButton>
            <RemoveCircleOutlineIcon />
          </IconButton>
          <span className="px-5 border py-1">3</span>
          <IconButton sx={{color: "RGB(145 85 253)"}}>
            <AddCircleOutlineIcon />
          </IconButton>
        </div>
        <div>
            <Button sx={{color: "RGB(145 85 253)", fontSize: "0.8rem"}}>REMOVE</Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
