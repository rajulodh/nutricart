import { ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "@/data/storefront";
import { formatPrice } from "@/lib/format";

interface StoreProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const StoreProductCard = ({ product, onAddToCart }: StoreProductCardProps) => {
  const Icon = product.icon;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10">
      <Link className="block" to={`/products/${product.slug}`}>
        <div className="relative flex aspect-square items-center justify-center bg-gradient-to-br from-secondary via-card to-secondary p-6">
          <span className="absolute left-4 top-4 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
            {product.badge}
          </span>
          <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] bg-primary/10 shadow-[0_0_60px_rgba(255,204,0,0.12)] transition-transform duration-500 group-hover:scale-105">
            <Icon className="h-12 w-12 text-gold" />
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link className="line-clamp-2 text-lg font-bold leading-snug transition-colors hover:text-gold" to={`/products/${product.slug}`}>
          {product.name}
        </Link>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{product.summary}</p>

        <div className="mt-4 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} className={`h-4 w-4 ${index < Math.round(product.rating) ? "fill-current text-gold" : "text-muted-foreground"}`} />
          ))}
          <span className="ml-2 text-xs text-muted-foreground">{product.reviews.toLocaleString()} reviews</span>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <span className="text-2xl font-black text-gold">{formatPrice(product.price)}</span>
          <span className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
        </div>

        <button
          className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
          onClick={() => onAddToCart(product)}
          type="button"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to cart
        </button>
      </div>
    </article>
  );
};

export default StoreProductCard;
