import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import { getToken, removeToken, saveToken } from "./utils/token.js";
import Catalog from "./views/Catalog.jsx";
import Home from "./views/Home.jsx";
import Login from "./views/Login.jsx";
import Register from "./views/Register.jsx";
import Product from "./views/Product.jsx";
import useCart from "./hooks/useCart.js";
import Cart from "./views/Cart.jsx";

const App = () => {
  const [token, setToken] = useState(getToken);
  const cart = useCart(token);

  const handleLogin = (newToken) => {
    saveToken(newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    removeToken();
    setToken(null);
    cart.reset();
  };

  return (
    <Routes>
      <Route
        element={
          <Layout
            token={token}
            onLogout={handleLogout}
            cartCount={cart.count}
          />
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Catalog />} />
        <Route
          path="/products/:id"
          element={
            <Product loggedIn={Boolean(token)} onAddToCart={cart.addItem} />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              loggedIn={Boolean(token)}
              cart={cart.cart}
              onChangeQuantity={cart.changeQuantity}
              onRemove={cart.removeItem}
              onClear={cart.clear}
              onCheckout={cart.checkout}
            />
          }
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onLogin={handleLogin} />} />
      </Route>
    </Routes>
  );
};

export default App;
