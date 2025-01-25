import './App.css';
import Navbar from './Components/navbar/navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Shop from './Pages/shop';
import Product from './Pages/product';
import LoginSignup from './Pages/loginSignup';
import ShopCategory from './Pages/shopCategory';
import Cart from './Pages/cart';
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
       <Route path="/mens" element={ <ShopCategory category="men"/>}/>
       <Route path="/womens" element={ <ShopCategory category="women"/>}/>
       <Route path="/kids" element={ <ShopCategory category="kids"/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
