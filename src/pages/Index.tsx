import { useState, useCallback } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import ShopByCategory from "@/components/ShopByCategory";
import ProductCarousel from "@/components/ProductCarousel";
import TrustBadges from "@/components/TrustBadges";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import { Product } from "@/components/ProductCard";

const bestsellers: Product[] = [
  { id: 1, name: "Biozyme Gold 100% Whey Protein", price: 3499, originalPrice: 4999, rating: 4.5, reviews: 12450, discount: 30, emoji: "🥤" },
  { id: 2, name: "Raw Whey Protein Concentrate 80%", price: 1899, originalPrice: 2499, rating: 4.3, reviews: 8320, discount: 24, emoji: "🧴" },
  { id: 3, name: "Super Gainer XXL - Chocolate", price: 2199, originalPrice: 2999, rating: 4.2, reviews: 5640, discount: 27, emoji: "🍫" },
  { id: 4, name: "Micronized Creatine Monohydrate", price: 799, originalPrice: 1199, rating: 4.6, reviews: 9870, discount: 33, emoji: "⚡" },
  { id: 5, name: "Pre-Workout Ignite XT", price: 1299, originalPrice: 1799, rating: 4.4, reviews: 3210, discount: 28, emoji: "🔥" },
  { id: 6, name: "BCAA Pro 7000 - Watermelon", price: 999, originalPrice: 1499, rating: 4.1, reviews: 4560, discount: 33, emoji: "🍉" },
  { id: 7, name: "Peanut Butter Dark Chocolate", price: 449, originalPrice: 599, rating: 4.7, reviews: 15200, discount: 25, emoji: "🥜" },
  { id: 8, name: "Fish Oil Omega-3 Triple Strength", price: 699, originalPrice: 999, rating: 4.3, reviews: 2890, discount: 30, emoji: "🐟" },
];

const newArrivals: Product[] = [
  { id: 9, name: "Iso-Whey Zero Carb Isolate", price: 3999, originalPrice: 5499, rating: 4.8, reviews: 1230, discount: 27, emoji: "🏆" },
  { id: 10, name: "L-Glutamine Recovery Plus", price: 899, originalPrice: 1199, rating: 4.2, reviews: 780, discount: 25, emoji: "💊" },
  { id: 11, name: "EAA Essential Amino Acids", price: 1199, originalPrice: 1699, rating: 4.5, reviews: 560, discount: 29, emoji: "🧬" },
  { id: 12, name: "Hydro Whey Platinum Edition", price: 4299, originalPrice: 5999, rating: 4.9, reviews: 340, discount: 28, emoji: "💎" },
];

const Index = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = useCallback((product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, quantity: 1, image: product.emoji }];
    });
    setCartOpen(true);
  }, []);

  const handleUpdateQuantity = useCallback((id: number, qty: number) => {
    if (qty < 1) return;
    setCartItems((prev) => prev.map((item) => item.id === id ? { ...item, quantity: qty } : item));
  }, []);

  const handleRemove = useCallback((id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <HeroCarousel />
      <ShopByCategory />
      <ProductCarousel title="OUR" highlight="BESTSELLERS" products={bestsellers} onAddToCart={handleAddToCart} />
      <TrustBadges />
      <ProductCarousel title="NEW" highlight="ARRIVALS" products={newArrivals} onAddToCart={handleAddToCart} />
      <BlogSection />
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={cartItems} onUpdateQuantity={handleUpdateQuantity} onRemove={handleRemove} />
    </div>
  );
};

export default Index;
