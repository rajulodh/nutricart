const ContactPage = () => {
  return (
    <section className="container mx-auto px-4 py-12 sm:py-16">
      <div className="rounded-[2rem] border border-border bg-card p-8 shadow-2xl shadow-black/20 lg:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold">Contact</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight">We are here to help.</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          Reach out for product guidance, order help, or partnership conversations. We respond fastest on email during business hours.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-[1.5rem] border border-border bg-secondary/40 p-5">
            <p className="text-sm text-muted-foreground">Customer support</p>
            <a className="mt-2 block text-lg font-semibold text-gold hover:underline" href="mailto:support@nutritioncart.com">
              support@nutritioncart.com
            </a>
          </div>
          <div className="rounded-[1.5rem] border border-border bg-secondary/40 p-5">
            <p className="text-sm text-muted-foreground">Sales and partnerships</p>
            <a className="mt-2 block text-lg font-semibold text-gold hover:underline" href="mailto:partners@nutritioncart.com">
              partners@nutritioncart.com
            </a>
          </div>
          <div className="rounded-[1.5rem] border border-border bg-secondary/40 p-5">
            <p className="text-sm text-muted-foreground">Phone</p>
            <a className="mt-2 block text-lg font-semibold text-gold hover:underline" href="tel:+911800000000">
              +91 1800 000 000
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
