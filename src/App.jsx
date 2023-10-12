import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  

  const retrieve= (storage) => {
    const previousSelection = JSON.parse(localStorage.getItem(storage));
    if (previousSelection === null) {
      return [];
    } else {
      return previousSelection;
    }
  }

  const [cartSelection, setCartSelection] = useState(retrieve("cart"));
  const [wishlistSelection, setWishlistSelection] = useState(retrieve("wishlist"));

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistSelection));
  }, [wishlistSelection]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartSelection));
  }, [cartSelection]);

  return (
    <div className="App">
      <Router>
        <Navbar
          cartSelection={cartSelection}
          wishlistSelection={wishlistSelection}
        />
        <div className="container main">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/shop"
              element={
                <Shop
                  cartSelection={cartSelection}
                  setCartSelection={setCartSelection}
                  wishlistSelection={wishlistSelection}
                  setWishlistSelection={setWishlistSelection}
                />
              }
            ></Route>
            <Route
              path="/cart"
              element={
                <Cart
                  cartSelection={cartSelection}
                  setCartSelection={setCartSelection}
                  wishlistSelection={wishlistSelection}
                  setWishlistSelection={setWishlistSelection}
                />
              }
            ></Route>
            <Route
              path="/wishlist"
              element={
                <Wishlist
                  cartSelection={cartSelection}
                  setCartSelection={setCartSelection}
                  wishlistSelection={wishlistSelection}
                  setWishlistSelection={setWishlistSelection}
                />
              }
            ></Route>
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
