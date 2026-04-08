import { ShieldCheck, FlaskConical, Award } from "lucide-react";

const badges = [
  { icon: ShieldCheck, title: "100% Authentic", desc: "Every product is verified & genuine" },
  { icon: FlaskConical, title: "Lab Tested", desc: "Third-party tested for purity" },
  { icon: Award, title: "Clinically Proven", desc: "Science-backed formulations" },
];

const TrustBadges = () => (
  <section className="py-12 sm:py-16 bg-charcoal">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
        {badges.map((badge) => (
          <div key={badge.title} className="flex flex-col items-center text-center gap-3 p-6 rounded-xl bg-secondary/50 border border-border">
            <badge.icon size={40} className="text-gold" />
            <h3 className="text-lg font-bold text-foreground">{badge.title}</h3>
            <p className="text-sm text-muted-foreground">{badge.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBadges;
