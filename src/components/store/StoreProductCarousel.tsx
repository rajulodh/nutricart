import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import type { Product } from "@/data/storefront";
import StoreProductCard from "./StoreProductCard";

interface StoreProductCarouselProps {
  title: string;
  highlight: string;
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const StoreProductCarousel = ({ title, highlight, products, onAddToCart }: StoreProductCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right") {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  }

  return (
    <section className="py-14 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold">Featured collection</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              {title} <span className="text-gold">{highlight}</span>
            </h2>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              onClick={() => scroll("left")}
              type="button"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              onClick={() => scroll("right")}
              type="button"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible" ref={scrollRef}>
          {products.map((product) => (
            <div className="w-[280px] flex-shrink-0 sm:w-auto" key={product.id}>
              <StoreProductCard product={product} onAddToCart={onAddToCart} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoreProductCarousel;
