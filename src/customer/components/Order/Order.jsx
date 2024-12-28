import { Grid } from "@mui/material";
import OrderCard from "./OrderCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderByFilter, getAllOrderByUser } from "../../../State/Order/Action";
import { useLocation, useNavigate } from "react-router-dom";

const orderStatus = [
  { label: "Chờ xác nhận", value: "PENDING" },
  { label: "Đang giao", value: "DELIVERED" },
  { label: "Đã hủy", value: "CANCELED" },
  { label: "Đã giao", value: "SHIPPED" },
];
const Order = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const orders = useSelector(store => store.order.orders)
  const [filter, setFilter] = useState([])
  const user = useSelector(store=>store.auth.user)

  

  const handleOnChangeFilter = (value) => {
    let searchParams = new URLSearchParams(location.search)
    let search = searchParams.getAll("filter")
    if (search.length > 0 && search.join("").includes(value)) {
      search = search[0].split(",").filter((item) => { return item !== value })

      if (search.length === 0) {
        searchParams.delete("filter")
      }
      else {
        searchParams.set("filter", search.join(","))
      }

    }
    else {
      search.push(value)
      searchParams.set("filter", search.join(","))
    }
    setFilter(search)
    const query = searchParams.toString()
    navigate({ search: `${query}` })
    
  }
  useEffect(() => {
    if (filter.length > 0) {
      dispatch(getAllOrderByFilter(filter))
    }
    else{
    dispatch(getAllOrderByUser())
    }
  }, [filter])

  useEffect(() => {        
    dispatch(getAllOrderByUser())
  }, [user])
  
 
  const prop = ()=>{
    dispatch(getAllOrderByUser())
  }

  return (
    <div className="px-5 lg:px-20">
      <Grid container sx={{ justifyContent: "space-between" }}>
        <Grid item xs={2.5}>
          <div className="h-auto shadow-lg bg-white p-5 sticky top-5 border">
            <h1 className="font-bold text-lg">Filter</h1>
            <div className="space-y-4 mt-10">
              <h1 className="font-semibold uppercase">Order status</h1>
              {orderStatus.map((item) => (
                <div className="flex items-center" key={item.value}>
                  <input
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    defaultValue={item.value}
                    onChange={e => handleOnChangeFilter(e.target.value)}
                  />
                  <label htmlFor={item.value} className="ml-3 text-gray-600">
                    {item.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Grid>
        <Grid item xs={9} className="space-y-5">
          {
            orders &&
            orders.map((item) => (
              <div key={item.id} className="border-gray-900">
                {item.orderItems.map((i) => (<OrderCard reload={prop} key={i.id} order={i} orderId={item.id} status={item.orderStatus} />))}
              </div>
            ))
          }
        </Grid>
      </Grid>
    </div>
  );
};
export default Order;
