import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import ProductCard, { Product } from "./ProductCard";

interface ProductCarouselProps {
  title: string;
  highlight: string;
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductCarousel = ({ title, highlight, products, onAddToCart }: ProductCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-black">
            {title} <span className="text-gold">{highlight}</span>
          </h2>
          <div className="hidden sm:flex gap-2">
            <button onClick={() => scroll("left")} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => scroll("right")} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:overflow-visible">
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-[220px] sm:w-auto">
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
