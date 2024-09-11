import logo from './logo.svg';
import './App.css';
import Navigation from './customer/components/navigation/Navigation'
import HomePage from './customer/pages/HomePage';
import Footer from './customer/components/footer/Footer';
import Product from './customer/components/product/Product.jsx';

function App() {
  return (
    <div className="App">
      <Navigation />
      <div>
        <HomePage />
        <Product />
      </div>
      <Footer/>
    </div>
  );
}
  
export default App;
