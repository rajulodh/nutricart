import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { categories } from "@/data/storefront";

const CategoryShowcase = () => {
  return (
    <section className="py-14 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold">Explore categories</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Shop by category</h2>
          </div>
          <Link className="hidden text-sm font-semibold text-gold transition-colors hover:text-gold/80 sm:inline-flex" to="/shop">
            View all products
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {categories.map((category) => (
            <Link
              className="group rounded-[1.75rem] border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10"
              key={category.slug}
              to={`/shop?category=${category.slug}`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <category.icon className="h-7 w-7 text-gold" />
              </div>
              <h3 className="mt-5 text-xl font-bold">{category.name}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{category.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                Browse category
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
