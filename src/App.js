import './App.css';
import Navbar from './Components/navbar/navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Shop from './Pages/shop';
import Product from './Pages/product';
import LoginSignup from './Pages/loginSignup';
import ShopCategory from './Pages/shopCategory';
import Cart from './Pages/cart';
import Footer from './Components/footer/footer';
import men_banner from './Components/assets/banner_mens.png';
import women_banner from './Components/assets/banner_women.png';
import kids_banner from './Components/assets/banner_kids.png';
function App() {
  return (
    <div>
      <BrowserRouter>
     <Navbar/>
     <Routes>
       <Route path="/" element={<Shop/>}/>
       <Route path="/product" element={<Product/>}>
         <Route path=":productId" element={<Product/>}/>
       </Route>
       <Route path="/cart" element={<Cart/> }/>
       <Route path="/login" element={ <LoginSignup/>}/>
       <Route path="/mens" element={ <ShopCategory banner={men_banner} category="men"/>}/>
       <Route path="/womens" element={ <ShopCategory banner={women_banner} category="women"/>}/>
       <Route path="/kids" element={ <ShopCategory banner={kids_banner} category="kids"/>}/>
     </Routes>
     <Footer/>
     </BrowserRouter>
    </div>
  );
}

export default App;
