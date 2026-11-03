import CategoriesSection from "../components/home/CategoriesSection.jsx";
import CategoryShelves from "../components/home/CategoryShelves.jsx";
import FeaturedProducts from "../components/home/FeaturedProducts.jsx";
import Hero from "../components/home/Hero.jsx";

const Home = () => (
  <>
    <Hero />
    <CategoriesSection />
    <FeaturedProducts />
    <CategoryShelves />
  </>
);

export default Home;
