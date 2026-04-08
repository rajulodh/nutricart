const sections = [
  {
    id: "track-order",
    title: "Track your order",
    description: "Once checkout is connected, this area can surface order lookups, shipment milestones, and support escalation paths.",
  },
  {
    id: "returns",
    title: "Returns and exchanges",
    description: "Customers should be able to see eligibility, timelines, and how opened or damaged products are handled.",
  },
  {
    id: "faq",
    title: "Frequently asked questions",
    description: "This route gives you a dedicated place for sizing, ingredients, subscription, and shipping guidance without cluttering product pages.",
  },
  {
    id: "customer-support",
    title: "Customer support",
    description: "Link this section to chat, ticketing, or CRM workflows when you are ready to extend the experience beyond the storefront.",
  },
];

const SupportPage = () => {
  return (
    <section className="container mx-auto px-4 py-12 sm:py-16">
      <div className="rounded-[2rem] border border-border bg-card p-8 shadow-2xl shadow-black/20 lg:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold">Support</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight">Customer support, returns, and order guidance.</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          The support area now has real routes behind the footer and account links, making the storefront feel complete and ready for future operational content.
        </p>

        <div className="mt-10 space-y-4">
          {sections.map((section) => (
            <section id={section.id} key={section.id} className="rounded-[1.5rem] border border-border bg-secondary/40 p-6">
              <h2 className="text-2xl font-bold">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{section.description}</p>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportPage;
