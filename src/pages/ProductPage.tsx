import { ArrowRight, CheckCircle2, ShieldCheck, Star } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getCategoryBySlug, getProductBySlug, products } from "@/data/storefront";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/format";
import StoreProductCard from "@/components/store/StoreProductCard";

const ProductPage = () => {
  const { slug } = useParams();
  const { addToCart } = useStore();
  const product = slug ? getProductBySlug(slug) : undefined;

  if (!product) {
    return <Navigate to="/shop" replace />;
  }

  const category = getCategoryBySlug(product.categorySlug);
  const Icon = product.icon;
  const relatedProducts = products
    .filter((item) => item.categorySlug === product.categorySlug && item.slug !== product.slug)
    .slice(0, 4);

  return (
    <section className="container mx-auto px-4 py-12 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-border bg-gradient-to-br from-secondary via-card to-card p-8 shadow-2xl shadow-black/20">
          <div className="flex h-full min-h-[420px] flex-col justify-between rounded-[1.5rem] border border-white/5 bg-black/10 p-6">
            <div className="flex items-start justify-between gap-4">
              <span className="rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-gold">
                {product.badge}
              </span>
              <span className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground">
                {category?.name}
              </span>
            </div>

            <div className="flex justify-center py-10">
              <div className="flex h-52 w-52 items-center justify-center rounded-[2rem] bg-primary/10 shadow-[0_0_80px_rgba(255,204,0,0.12)]">
                <Icon className="h-24 w-24 text-gold" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {product.benefits.map((benefit) => (
                <div key={benefit} className="rounded-2xl border border-border bg-background/50 p-4 text-sm text-muted-foreground">
                  <CheckCircle2 className="mb-3 h-5 w-5 text-gold" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-border bg-card p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">Product Detail</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">{product.name}</h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">{product.description}</p>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className={`h-4 w-4 ${index < Math.round(product.rating) ? "fill-current" : ""}`} />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating.toFixed(1)} rating from {product.reviews.toLocaleString()} reviews
            </span>
          </div>

          <div className="mt-8 flex items-end gap-3">
            <span className="text-4xl font-black text-gold">{formatPrice(product.price)}</span>
            <span className="text-lg text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-gold">
              Save {product.discount}%
            </span>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button className="h-12 flex-1 rounded-full text-base" onClick={() => addToCart(product)}>
              Add to cart
            </Button>
            <Button asChild variant="outline" className="h-12 flex-1 rounded-full text-base">
              <Link to="/auth">Sign in for faster checkout</Link>
            </Button>
          </div>

          <div className="mt-8 rounded-3xl border border-border bg-secondary/40 p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 h-5 w-5 text-gold" />
              <div>
                <h2 className="text-lg font-semibold">Why athletes choose this</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{product.summary}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="ghost" className="px-0 text-gold hover:text-gold">
              <Link to={`/shop?category=${product.categorySlug}`}>Explore more {category?.name}</Link>
            </Button>
            <Button asChild variant="ghost" className="px-0 text-gold hover:text-gold">
              <Link to="/blog">Read product guides</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">More from this category</h2>
            <p className="text-muted-foreground">Keep browsing complementary picks that fit the same routine.</p>
          </div>
          <Button asChild variant="outline" className="rounded-full">
            <Link to={`/shop?category=${product.categorySlug}`}>
              View all
              <ArrowRight />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {relatedProducts.map((item) => (
            <StoreProductCard key={item.id} product={item} onAddToCart={addToCart} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
