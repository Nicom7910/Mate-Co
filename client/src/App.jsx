import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import { getToken, removeToken, saveToken } from "./utils/token.js";
import Catalog from "./views/Catalog.jsx";
import Home from "./views/Home.jsx";
import Login from "./views/Login.jsx";
import Register from "./views/Register.jsx";
import Product from "./views/Product.jsx";
import useCart from "./hooks/useCart.js";
import Cart from "./views/Cart.jsx";
import Orders from "./views/Orders.jsx";
import Profile from "./views/Profile.jsx";
import useCurrentUser from "./hooks/useCurrentUser.js";
import isAdmin from "./utils/isAdmin.js";
import Admin from "./views/Admin.jsx";
import AdminProducts from "./views/AdminProducts.jsx";
import AdminProductEdit from "./views/AdminProductEdit.jsx";
import AdminProductNew from "./views/AdminProductNew.jsx";
import AdminCategories from "./views/AdminCategories.jsx";
import AdminCategoryEdit from "./views/AdminCategoryEdit.jsx";
import AdminCategoryNew from "./views/AdminCategoryNew.jsx";

const App = () => {
  const [token, setToken] = useState(getToken);
  const cart = useCart(token);
  const currentUser = useCurrentUser(token);

  const handleLogin = (newToken) => {
    saveToken(newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    removeToken();
    setToken(null);
    cart.reset();
    currentUser.reset();
  };

  return (
    <Routes>
      <Route
        element={
          <Layout
            token={token}
            onLogout={handleLogout}
            cartCount={cart.count}
            isAdmin={isAdmin(currentUser.user)}
          />
        }
      >
        <Route path="/" element={<Home loggedIn={Boolean(token)} />} />
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
        <Route
          path="/orders"
          element={
            <Orders
              token={token}
              user={currentUser.user}
              loading={currentUser.loading}
            />
          }
        />
        <Route path="/profile" element={<Profile token={token} />} />
        <Route
          path="/admin"
          element={
            <Admin
              token={token}
              user={currentUser.user}
              loading={currentUser.loading}
            />
          }
        >
          <Route index element={<Navigate to="/admin/products" replace />} />
          <Route path="products" element={<AdminProducts token={token} />} />
          <Route
            path="products/new"
            element={<AdminProductNew token={token} />}
          />
          <Route
            path="products/:id/edit"
            element={<AdminProductEdit token={token} />}
          />
          <Route
            path="categories"
            element={<AdminCategories token={token} />}
          />
          <Route
            path="categories/new"
            element={<AdminCategoryNew token={token} />}
          />
          <Route
            path="categories/:id/edit"
            element={<AdminCategoryEdit token={token} />}
          />
        </Route>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onLogin={handleLogin} />} />
      </Route>
    </Routes>
  );
};

export default App;
