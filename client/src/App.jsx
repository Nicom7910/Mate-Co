import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Home from "./views/Home.jsx";

const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
    </Route>
  </Routes>
);

export default App;
