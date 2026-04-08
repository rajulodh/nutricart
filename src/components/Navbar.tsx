import { Search, User, Heart, ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const navLinks = ["Proteins", "Gainers", "Pre/Post Workout", "Fit Foods", "Accessories"];

const Navbar = ({ cartCount, onCartClick }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-16 gap-4">
        {/* Logo */}
        <a href="/" className="flex-shrink-0">
          <span className="text-2xl font-black tracking-tight text-gold">NUTRITION<span className="text-foreground"> CART</span></span>
        </a>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Search proteins, gainers, creatine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-secondary border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a key={link} href="#" className="text-sm font-medium text-muted-foreground hover:text-gold transition-colors">
              {link}
            </a>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-3">
          <button className="hidden sm:block text-muted-foreground hover:text-foreground transition-colors"><User size={20} /></button>
          <button className="hidden sm:block text-muted-foreground hover:text-foreground transition-colors"><Heart size={20} /></button>
          <button onClick={onCartClick} className="relative text-muted-foreground hover:text-foreground transition-colors">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button className="lg:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background px-4 pb-4">
          <div className="md:hidden py-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-secondary border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
          {navLinks.map((link) => (
            <a key={link} href="#" className="block py-3 text-sm font-medium text-muted-foreground hover:text-gold border-b border-border last:border-0 transition-colors">
              {link}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
