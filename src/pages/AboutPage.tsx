import { Award, FlaskConical, ShieldCheck } from "lucide-react";

const highlights = [
  {
    title: "Quality first",
    description: "We focus on ingredients and sourcing standards that hold up under scrutiny, not just marketing claims.",
    icon: ShieldCheck,
  },
  {
    title: "Practical education",
    description: "Products perform best when customers understand how and when to use them in a repeatable routine.",
    icon: FlaskConical,
  },
  {
    title: "Professional experience",
    description: "The storefront is designed to feel credible, easy to trust, and fast to navigate from discovery to account creation.",
    icon: Award,
  },
];

const AboutPage = () => {
  return (
    <section className="container mx-auto px-4 py-12 sm:py-16">
      <div className="rounded-[2rem] border border-border bg-gradient-to-br from-card via-card to-secondary p-8 shadow-2xl shadow-black/20">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold">About Nutrition Cart</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
          Built for athletes who want a cleaner way to buy supplements.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
          Nutrition Cart combines premium branding, evidence-aware product selection, and straightforward shopping journeys so customers can make decisions faster and with more confidence.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {highlights.map((item) => (
          <div key={item.title} className="rounded-[1.75rem] border border-border bg-card p-6">
            <item.icon className="h-7 w-7 text-gold" />
            <h2 className="mt-5 text-2xl font-bold">{item.title}</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutPage;
