import { Button } from "@mui/material";
import AddressCard from "../AddressCard/AddressCard";
import CartItem from "../Cart/CartItem";

const OrderSummary = () => {
  return (
    <div className="xl:p-5 xl:px-20">
      <div className=" rounded-s-md shadow-lg border">
        <AddressCard />
      </div>
      <div className="xl:grid grid-cols-3 mt-5">
        <div className="xl:col-span-2 space-y-3 col-span-3">
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
        </div>
        <div className="xl:pl-10">
          <div className="border space-y-3 text-sm font-semibold p-5 rounded-md shadow-lg max-xl:w-full xl:sticky xl:top-5 max-xl:mt-5 max-xl:fixed max-xl:bottom-0 z-50 bg-white">
            <h1 className="uppercase text-left opacity-80">price details</h1>
            <hr />
            <div className="flex justify-between opacity-80">
              <p>Price</p>
              <p className="text-red-700">234$</p>
            </div>
            <div className="flex justify-between opacity-80">
              <p>Discount</p>
              <p className="text-red-700 opacity-80">24$</p>
            </div>
            <div className="flex justify-between opacity-80">
              <p>Delivery Charge</p>
              <p className="text-red-700">Free</p>
            </div>
            <hr />
            <div className="flex justify-between opacity-100 font-bold">
              <p>Total Amount</p>
              <p className="text-red-900">234$</p>
            </div>
            <br />
            <div>
              <Button
                variant="contained"
                className="w-full"
                sx={{ bgcolor: "#9155fd" }}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderSummary;