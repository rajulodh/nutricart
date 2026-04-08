import { Link } from "react-router-dom";
import { trustBadges } from "@/data/storefront";

const TrustSection = () => {
  return (
    <section className="border-y border-border bg-charcoal py-14 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-5 md:grid-cols-3">
          {trustBadges.map((badge) => (
            <Link
              className="rounded-[1.75rem] border border-border bg-secondary/50 p-6 transition-all hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10"
              key={badge.title}
              to="/about"
            >
              <badge.icon className="h-8 w-8 text-gold" />
              <h3 className="mt-5 text-xl font-bold">{badge.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{badge.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
