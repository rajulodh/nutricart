import { bestsellers, newArrivals } from "@/data/storefront";
import { useStore } from "@/context/StoreContext";
import BlogPreview from "@/components/store/BlogPreview";
import CategoryShowcase from "@/components/store/CategoryShowcase";
import HomeHero from "@/components/store/HomeHero";
import StoreProductCarousel from "@/components/store/StoreProductCarousel";
import TrustSection from "@/components/store/TrustSection";

const HomePage = () => {
  const { addToCart } = useStore();

  return (
    <>
      <HomeHero />
      <CategoryShowcase />
      <StoreProductCarousel title="OUR" highlight="BESTSELLERS" products={bestsellers} onAddToCart={addToCart} />
      <TrustSection />
      <StoreProductCarousel title="NEW" highlight="ARRIVALS" products={newArrivals} onAddToCart={addToCart} />
      <BlogPreview />
    </>
  );
};

export default HomePage;
