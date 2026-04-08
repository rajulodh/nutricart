import { Instagram, Twitter, Facebook, Youtube, Send } from "lucide-react";

const Footer = () => (
  <footer className="bg-charcoal border-t border-border pt-12 pb-6">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {/* Brand */}
        <div>
          <span className="text-2xl font-black text-gold">NUTRITION<span className="text-foreground"> CART</span></span>
          <p className="text-sm text-muted-foreground mt-3">Premium sports nutrition for athletes who demand the best. Lab-tested, science-backed, results-driven.</p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-bold text-foreground mb-3">Company</h4>
          {["About Us", "Careers", "Contact Us", "Blog"].map((l) => (
            <a key={l} href="#" className="block text-sm text-muted-foreground hover:text-gold transition-colors mb-2">{l}</a>
          ))}
        </div>
        <div>
          <h4 className="font-bold text-foreground mb-3">Support</h4>
          {["Track Order", "Return Policy", "FAQs", "Customer Support"].map((l) => (
            <a key={l} href="#" className="block text-sm text-muted-foreground hover:text-gold transition-colors mb-2">{l}</a>
          ))}
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-bold text-foreground mb-3">Stay Updated</h4>
          <p className="text-sm text-muted-foreground mb-3">Get exclusive offers & fitness tips.</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 bg-secondary border border-border rounded-l-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button className="bg-primary text-primary-foreground px-4 rounded-r-lg hover:brightness-110 transition">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">© 2026 Nutrition Cart. All rights reserved.</p>
        <div className="flex gap-4">
          {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
            <a key={i} href="#" className="text-muted-foreground hover:text-gold transition-colors"><Icon size={18} /></a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
