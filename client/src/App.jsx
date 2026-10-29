import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import { selectToken } from "./redux/authSlice.js";
import { fetchCart } from "./redux/cartSlice.js";
import { fetchUser, selectIsAdmin, selectUser } from "./redux/userSlice.js";
import Catalog from "./views/Catalog.jsx";
import Home from "./views/Home.jsx";
import Login from "./views/Login.jsx";
import Register from "./views/Register.jsx";
import Product from "./views/Product.jsx";
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
  const hasUser = Boolean(useSelector(selectUser));
  const admin = useSelector(selectIsAdmin);
  const canShop = hasUser && !admin;

  useEffect(() => {
    if (!token) return;
    const request = dispatch(fetchUser());
    return () => request.abort();
  }, [token, dispatch]);

  useEffect(() => {
    if (!canShop) return;
    const request = dispatch(fetchCart());
    return () => request.abort();
  }, [canShop, dispatch]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Catalog />} />
        <Route path="/products/:id" element={<Product />} />
        <Route
          path="/cart"
          element={admin ? <Navigate to="/" replace /> : <Cart />}
        />
        <Route
          path="/checkout"
          element={admin ? <Navigate to="/" replace /> : <Checkout />}
        />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />}>
          <Route index element={<Navigate to="/admin/products" replace />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<AdminProductNew />} />
          <Route path="products/:id/edit" element={<AdminProductEdit />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="categories/new" element={<AdminCategoryNew />} />
          <Route path="categories/:id/edit" element={<AdminCategoryEdit />} />
          <Route path="stats" element={<AdminStats />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default App;
