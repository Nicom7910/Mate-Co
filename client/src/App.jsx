import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Catalog from "./views/Catalog.jsx";
import Home from "./views/Home.jsx";
import Product from "./views/Product.jsx";

const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Catalog />} />
      <Route path="/products/:id" element={<Product />} />
    </Route>
  </Routes>
);

export default App;
