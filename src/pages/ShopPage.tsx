import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { categories, products } from "@/data/storefront";
import { useStore } from "@/context/StoreContext";
import StoreProductCard from "@/components/store/StoreProductCard";

const ShopPage = () => {
  const { addToCart } = useStore();
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const featuredFilter = searchParams.get("featured");
  const searchTerm = searchParams.get("search")?.trim().toLowerCase() || "";

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory ? product.categorySlug === selectedCategory : true;
    const matchesFeatured = featuredFilter ? product.featured === featuredFilter : true;
    const searchableText = `${product.name} ${product.summary} ${product.description}`.toLowerCase();
    const matchesSearch = searchTerm ? searchableText.includes(searchTerm) : true;

    return matchesCategory && matchesFeatured && matchesSearch;
  });

  const selectedCategoryName = categories.find((category) => category.slug === selectedCategory)?.name;

  return (
    <section className="container mx-auto px-4 py-12 sm:py-16">
      <div className="rounded-[2rem] border border-border bg-gradient-to-br from-card via-card to-secondary p-8 shadow-2xl shadow-black/20">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold">Shop Nutrition</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Professional supplements for training, recovery, and consistency.
            </h1>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Explore clean formulations, dependable bestsellers, and new arrivals curated for athletes who want fewer guesses and better routines.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full px-6">
              <Link to="/auth">Create account</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-6">
              <Link to="/blog">Read buying guides</Link>
            </Button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              !selectedCategory ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary hover:text-foreground"
            }`}
            to="/shop"
          >
            All categories
          </Link>
          {categories.map((category) => (
            <Link
              key={category.slug}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === category.slug
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary hover:text-foreground"
              }`}
              to={`/shop?category=${category.slug}`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {selectedCategoryName ? `${selectedCategoryName} products` : "All products"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {filteredProducts.length} products
            {searchTerm ? ` matching "${searchTerm}"` : ""}
            {featuredFilter ? ` in ${featuredFilter === "new" ? "new arrivals" : "bestsellers"}` : ""}
          </p>
        </div>
        {(selectedCategory || searchTerm || featuredFilter) && (
          <Button asChild variant="ghost" className="justify-start px-0 text-gold hover:text-gold">
            <Link to="/shop">Clear filters</Link>
          </Button>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <StoreProductCard key={product.id} product={product} onAddToCart={addToCart} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="mt-12 rounded-3xl border border-dashed border-border bg-card/70 px-6 py-12 text-center">
          <h3 className="text-xl font-semibold">No products matched this view.</h3>
          <p className="mt-2 text-muted-foreground">
            Try a different category or clear the current filters to explore the full catalog.
          </p>
          <Button asChild className="mt-6 rounded-full px-6">
            <Link to="/shop">Browse all products</Link>
          </Button>
        </div>
      )}
    </section>
  );
};

export default ShopPage;
