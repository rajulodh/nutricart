import { ArrowRight, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const SiteAnnouncementBar = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return null;
  }

  return (
    <div className="relative border-b border-primary/20 bg-primary text-primary-foreground">
      <div className="container mx-auto flex min-h-11 items-center justify-center px-10 py-2 text-center text-xs font-semibold sm:text-sm">
        <Link className="inline-flex items-center gap-2 hover:opacity-90" to="/shop?featured=bestseller">
          Biozyme Gold Whey is featured in our bestsellers collection with limited-time pricing.
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <button
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 transition-opacity hover:opacity-100"
        onClick={() => setVisible(false)}
        type="button"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default SiteAnnouncementBar;
