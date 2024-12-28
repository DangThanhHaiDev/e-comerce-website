import { useDispatch } from "react-redux";
import AddressCard from "../AddressCard/AddressCard";
import { Box, Button, Grid, TextField } from "@mui/material";
import { createOrder } from "../../../State/Order/Action";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../../config/apiConfig";

const DeleveryAddress = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate(location.search)
  const searchParams = new URLSearchParams()
  const [addresses, setAddresses] = useState([])
  const [isValidFull, setValidFull] = useState(true)
  const [isValidPhone, setValidPhone] = useState(true)


  useEffect(() => {
    getAddresses()
  }, [])

  const getAddresses = async () => {
    try {
      const response = await api.get('/api/users/addresses')
      const { data } = response
      setAddresses(data)
      console.log(data);


    } catch (error) {

    }
  }

  const handleSubmit = (e) => {
    setValidFull(true)
    setValidPhone(true)
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const address = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      streetAddress: data.get("address"),
      city: data.get("city"),
      mobile: data.get("phoneNumber"),
    };
    if (!address.firstName || !address.lastName || !address.city || !address.streetAddress) {
      setValidFull(false)
      return
    }
    if (!isVietnamPhoneNumber(address.mobile)) {
      setValidPhone(false)
      return
    }
    dispatch(createOrder({ address, navigate }))
  };

  function isVietnamPhoneNumber(phoneNumber) {
    const vietnamPhoneRegex = /^0\d{9}$/;
    return vietnamPhoneRegex.test(phoneNumber);
  }


  const handleSubmit2 = async (address) => {
    try {
      address.isExist = true
      const { data } = await api.post(`api/orders/`, address)
      navigate({ search: `step=3&order_id=${data.id}` })
    } catch (error) {

    }
  }

  return (
    <Grid container className="px-20" sx={{ paddingTop: 2 }} columnSpacing={2}>

      <Grid
        item
        xs={12}
        lg={5}
        className="px-5 border overflow-y-scroll rounded-e-md h-[30.5rem] shadow-md"
        sx={{ textAlign: "center" }}
      >
        {
          addresses.length > 0 &&
          addresses.map((address) => (
            <div>
              <AddressCard address={address} />
              <div className="w-full flex pl-5">
                <Button
                  sx={{ fontSize: "0.8rem", bgcolor: "RGB(145 85 253)" }}
                  size="large"
                  variant="contained"
                  className="pl-5"
                  onClick={() => handleSubmit2(address)}
                >
                  Delivery Here
                </Button>
              </div>
            </div>
          ))

        }

      </Grid>

      <Grid item lg={7} xs={12} className="border">
        <Box className="border rounded-s-md shadow-md p-5">
          <form onSubmit={(e) => handleSubmit(e)}>
            <Grid container sx={{ padding: 0 }} spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField

                  id="firstName"
                  className="firstName"
                  name="firstName"
                  fullWidth
                  label="First Name"
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="lastName"
                  className="lastName"
                  name="lastName"
                  label="Last Name"
                  fullWidth

                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="address"
                  className="address"
                  name="address"

                  fullWidth
                  label="Address"
                  multiline
                  rows={4}
                  autoComplete="street-address"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="city"
                  className="city"
                  name="city"
                  label="City"

                  fullWidth
                  autoComplete="locality"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="phoneNumber"
                  className="phoneNumber"
                  name="phoneNumber"

                  label="Phone Number"
                  fullWidth
                  autoComplete="tel"
                />
              </Grid>
              <Grid item xs={12}>
                {
                  !isValidFull &&
                  <p className="text-sm text-red-700 text-left">Vui lòng nhập đầy đủ thông tin</p>

                }
              </Grid>
              <Grid item xs={12}>
                {
                  !isValidPhone &&
                  <p className="text-sm text-red-700 text-left">Số điện thoại không hợp lệ</p>

                }
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="w-full flex">
                  <Button
                    variant="contained"
                    size="large"
                    sx={{ bgcolor: "RGB(145 85 253)", mt: 2 }}
                    type="submit"
                  >
                    Delevery Here
                  </Button>
                </div>
              </Grid>
            </Grid>
          </form>
        </Box>

      </Grid>
    </Grid>
  );
};
export default DeleveryAddress;
