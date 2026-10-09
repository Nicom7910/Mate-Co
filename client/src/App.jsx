import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import { getToken, removeToken, saveToken } from "./utils/token.js";
import Catalog from "./views/Catalog.jsx";
import Home from "./views/Home.jsx";
import Login from "./views/Login.jsx";
import Register from "./views/Register.jsx";
import Product from "./views/Product.jsx";

const App = () => {
  const [token, setToken] = useState(getToken);

  const handleLogin = (newToken) => {
    saveToken(newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    removeToken();
    setToken(null);
  };

  return (
    <Routes>
      <Route element={<Layout token={token} onLogout={handleLogout} />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Catalog />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onLogin={handleLogin} />} />
      </Route>
    </Routes>
  );
};

export default App;
