import { Star, ShoppingCart } from "lucide-react";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  discount: number;
  emoji: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <div className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 flex flex-col">
      {/* Image area */}
      <div className="relative aspect-square bg-charcoal-light flex items-center justify-center overflow-hidden">
        <span className="text-6xl sm:text-7xl group-hover:scale-110 transition-transform duration-500">{product.emoji}</span>
        {product.discount > 0 && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
            {product.discount}% OFF
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <h3 className="text-sm font-bold text-foreground line-clamp-2 mb-2">{product.name}</h3>
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={12} className={i < Math.floor(product.rating) ? "text-gold fill-gold" : "text-muted-foreground"} />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2 mt-auto mb-3">
          <span className="text-lg font-black text-gold">₹{product.price.toLocaleString()}</span>
          <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
        </div>
        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-primary text-primary-foreground font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm hover:brightness-110 transition-all hover:scale-[1.02] active:scale-95"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
