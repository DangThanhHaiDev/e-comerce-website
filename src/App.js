import logo from "./logo.svg";
import "./App.css";
import Navigation from "./customer/components/navigation/Navigation";
import HomePage from "./customer/pages/HomePage";
import Footer from "./customer/components/footer/Footer";
import Product from "./customer/components/product/Product.jsx";
import ProductDetails from "./customer/components/ProductDetails/ProductDetails.jsx";
import Cart from "./customer/components/Cart/Cart.jsx";
import Checkout from "./customer/components/checkout/Checkout.jsx";

function App() {
  return (
    <div className="App">
      <Navigation />
      <div>
        {/* <HomePage />
        <Product />
        <ProductDetails /> */}
        <div className="mt-10">
          {/* <Cart /> */}
          <Checkout />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
