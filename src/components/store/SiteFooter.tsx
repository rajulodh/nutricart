import { Facebook, Instagram, Send, Twitter, Youtube } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

const SiteFooter = () => {
  const [email, setEmail] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      toast.error("Enter an email address to subscribe.");
      return;
    }

    toast.success("Thanks for subscribing. We will keep you posted.");
    setEmail("");
  }

  return (
    <footer className="border-t border-border bg-charcoal pt-14 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr_0.7fr_1fr]">
          <div>
            <p className="text-2xl font-black text-gold">NUTRITION CART</p>
            <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
              Premium sports nutrition for athletes who want clearer decisions, sharper branding, and a storefront that feels built for trust.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-foreground">Company</h2>
            <div className="mt-4 space-y-3">
              <Link className="block text-sm text-muted-foreground transition-colors hover:text-gold" to="/about">
                About us
              </Link>
              <Link className="block text-sm text-muted-foreground transition-colors hover:text-gold" to="/blog">
                Blog
              </Link>
              <Link className="block text-sm text-muted-foreground transition-colors hover:text-gold" to="/contact">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-foreground">Support</h2>
            <div className="mt-4 space-y-3">
              <Link className="block text-sm text-muted-foreground transition-colors hover:text-gold" to="/support#track-order">
                Track order
              </Link>
              <Link className="block text-sm text-muted-foreground transition-colors hover:text-gold" to="/support#returns">
                Return policy
              </Link>
              <Link className="block text-sm text-muted-foreground transition-colors hover:text-gold" to="/support#faq">
                FAQs
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-foreground">Stay updated</h2>
            <p className="mt-4 text-sm text-muted-foreground">Get launch alerts, product drops, and training content.</p>
            <form className="mt-4 flex" onSubmit={handleSubmit}>
              <input
                className="h-11 flex-1 rounded-l-full border border-border bg-secondary px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Your email"
                type="email"
                value={email}
              />
              <button className="flex h-11 w-14 items-center justify-center rounded-r-full bg-primary text-primary-foreground transition hover:brightness-110" type="submit">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">Copyright 2026 Nutrition Cart. All rights reserved.</p>
          <div className="flex gap-3">
            {[
              { href: "https://www.instagram.com/", icon: Instagram, label: "Instagram" },
              { href: "https://x.com/", icon: Twitter, label: "X" },
              { href: "https://www.facebook.com/", icon: Facebook, label: "Facebook" },
              { href: "https://www.youtube.com/", icon: Youtube, label: "YouTube" },
            ].map((item) => (
              <a
                aria-label={item.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-gold"
                href={item.href}
                key={item.label}
                rel="noreferrer"
                target="_blank"
              >
                <item.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
