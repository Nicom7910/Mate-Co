import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import { logout, selectToken } from "./redux/authSlice.js";
import { fetchUser, selectIsAdmin, selectUser } from "./redux/userSlice.js";
import Catalog from "./views/Catalog.jsx";
import Home from "./views/Home.jsx";
import Login from "./views/Login.jsx";
import Register from "./views/Register.jsx";
import Product from "./views/Product.jsx";
import useCart from "./hooks/useCart.js";
import Cart from "./views/Cart.jsx";
import Orders from "./views/Orders.jsx";
import Profile from "./views/Profile.jsx";
import Admin from "./views/Admin.jsx";
import AdminProducts from "./views/AdminProducts.jsx";
import AdminProductEdit from "./views/AdminProductEdit.jsx";
import AdminProductNew from "./views/AdminProductNew.jsx";
import AdminCategories from "./views/AdminCategories.jsx";
import AdminCategoryEdit from "./views/AdminCategoryEdit.jsx";
import AdminCategoryNew from "./views/AdminCategoryNew.jsx";
import Checkout from "./views/Checkout.jsx";
import AdminStats from "./views/AdminStats.jsx";

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const admin = useSelector(selectIsAdmin);
  const cart = useCart(token, Boolean(user) && !admin);

  useEffect(() => {
    if (!token) return;
    const request = dispatch(fetchUser());
    return () => request.abort();
  }, [token, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    cart.reset();
  };

  return (
    <Routes>
      <Route
        element={<Layout onLogout={handleLogout} cartCount={cart.count} />}
      >
        <Route path="/" element={<Home loggedIn={Boolean(token)} />} />
        <Route path="/products" element={<Catalog />} />
        <Route
          path="/products/:id"
          element={
            <Product
              loggedIn={Boolean(token)}
              isAdmin={admin}
              onAddToCart={cart.addItem}
            />
          }
        />
        <Route
          path="/cart"
          element={
            admin ? (
              <Navigate to="/" replace />
            ) : (
              <Cart
                loggedIn={Boolean(token)}
                cart={cart.cart}
                onChangeQuantity={cart.changeQuantity}
                onRemove={cart.removeItem}
                onClear={cart.clear}
              />
            )
          }
        />
        <Route
          path="/checkout"
          element={
            admin ? (
              <Navigate to="/" replace />
            ) : (
              <Checkout cart={cart.cart} onCheckout={cart.checkout} />
            )
          }
        />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />}>
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
          <Route path="stats" element={<AdminStats token={token} />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default App;
