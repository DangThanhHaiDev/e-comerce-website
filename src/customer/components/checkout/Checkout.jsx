import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useLocation, useNavigate } from "react-router-dom";
import DeleveryAddress from "./DeliveryAddressForm";
import OrderSummary from "./OrderSummary";
import { Button } from "@mui/material";

const steps = ["Login", "Delevery Address", "Order Summary", "Payment"];

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Lấy thông tin query string từ URL
  const querySearch = new URLSearchParams(location.search);

  // Đặt giá trị mặc định cho bước hiện tại từ query string
  const [activeStep, setActiveStep] = React.useState(() => {
    return querySearch.get("step") ? +querySearch.get("step") : 1;
  });

  // Cập nhật query string mỗi khi activeStep thay đổi
  React.useEffect(() => {
    // Trực tiếp sửa đổi URLSearchParams
    querySearch.set("step", activeStep);
    navigate({ search: `?${querySearch.toString()}` }, { replace: true });  // Cập nhật URL
  }, [activeStep, navigate]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(1);
  };

  return (
    <div>
      <div className="xl:px-20">
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep - 1}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </div>

      <div className="mt-10">
        {activeStep === 2 ? <DeleveryAddress /> : <OrderSummary />}
      </div>

      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button disabled={activeStep === 1} onClick={handleBack}>
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button onClick={handleNext}>
          {activeStep === steps.length ? "Finish" : "Next"}
        </Button>
      </Box>
    </div>
  );
}
