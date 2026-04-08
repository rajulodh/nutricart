import { Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { categories } from "@/data/storefront";
import { useAuth } from "@/context/AuthContext";

interface SiteNavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const SiteNavbar = ({ cartCount, onCartClick }: SiteNavbarProps) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = searchQuery.trim();
    navigate(query ? `/shop?search=${encodeURIComponent(query)}` : "/shop");
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between gap-4 px-4">
        <Link className="flex shrink-0 flex-col" to="/">
          <span className="text-2xl font-black tracking-tight text-gold">NUTRITION CART</span>
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Performance store</span>
        </Link>

        <form className="hidden flex-1 md:flex" onSubmit={handleSearchSubmit}>
          <div className="relative mx-auto w-full max-w-xl">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              className="h-12 w-full rounded-full border border-border bg-secondary pl-11 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search whey, creatine, gainers, or recovery formulas"
              value={searchQuery}
            />
          </div>
        </form>

        <nav className="hidden items-center gap-6 lg:flex">
          {categories.slice(0, 5).map((category) => (
            <NavLink
              key={category.slug}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-gold"
              to={`/shop?category=${category.slug}`}
            >
              {category.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            aria-label={isAuthenticated ? "Go to account" : "Go to login"}
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-foreground sm:flex"
            to={isAuthenticated ? "/account" : "/auth"}
          >
            <User className="h-4 w-4" />
          </Link>
          <Link
            aria-label="Go to blog"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-foreground sm:flex"
            to="/blog"
          >
            <Heart className="h-4 w-4" />
          </Link>
          <button
            aria-label="Open cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
            onClick={onCartClick}
            type="button"
          >
            <ShoppingCart className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </button>
          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary lg:hidden"
            onClick={() => setMobileOpen((current) => !current)}
            type="button"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 pb-6 lg:hidden">
          <form className="pt-4" onSubmit={handleSearchSubmit}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                className="h-12 w-full rounded-full border border-border bg-secondary pl-11 pr-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search products"
                value={searchQuery}
              />
            </div>
          </form>

          <div className="mt-5 space-y-2">
            {categories.map((category) => (
              <Link
                className="block rounded-2xl border border-border px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                key={category.slug}
                onClick={() => setMobileOpen(false)}
                to={`/shop?category=${category.slug}`}
              >
                {category.name}
              </Link>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <Link
              className="rounded-2xl border border-border px-4 py-3 text-center text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              onClick={() => setMobileOpen(false)}
              to={isAuthenticated ? "/account" : "/auth"}
            >
              {isAuthenticated ? user?.name || "Account" : "Login"}
            </Link>
            <Link
              className="rounded-2xl border border-border px-4 py-3 text-center text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              onClick={() => setMobileOpen(false)}
              to="/blog"
            >
              Guides
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default SiteNavbar;
