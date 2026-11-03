import CategoriesSection from "../components/home/CategoriesSection.jsx";
import CategoryShelves from "../components/home/CategoryShelves.jsx";
import FeaturedProducts from "../components/home/FeaturedProducts.jsx";
import Hero from "../components/home/Hero.jsx";
import useLoad from "../hooks/useLoad.js";
import { fetchProducts } from "../redux/productsSlice.js";

const Home = () => {
  useLoad(fetchProducts);

  return (
    <>
      <Hero />
      <CategoriesSection />
      <FeaturedProducts />
      <CategoryShelves />
    </>
  );
};

export default Home;
