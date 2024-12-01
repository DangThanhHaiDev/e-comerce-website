import "./App.css";
import { Route, Routes } from "react-router-dom";
import CustomerRoutes from "./Routes/CustomerRoutes.jsx";
import AdminRoutes from "./Routes/AdminRoutes.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<CustomerRoutes />}></Route>
        <Route path="/admin/*" element={<AdminRoutes/>}></Route>
      </Routes>      
    </div>
  );
}

export default App;
