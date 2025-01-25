import React, { createContext } from "react";
import all_product from '../Components/assets/all_product';

export const ShopContext = createContext(null); // Named export

export const ShopContextProvider = ({ children }) => { // Named export
  const contextValue = { all_product };
  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContext;