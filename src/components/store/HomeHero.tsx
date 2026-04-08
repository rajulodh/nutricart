import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { heroSlides, quickStats } from "@/data/storefront";

const HomeHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentSlide((previousSlide) => (previousSlide + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];
  const Icon = slide.icon;

  return (
    <section className="relative overflow-hidden border-b border-border bg-[radial-gradient(circle_at_top,rgba(255,204,0,0.16),transparent_30%),linear-gradient(135deg,#090909_0%,#111111_50%,#090909_100%)]">
      <div className="pointer-events-none absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <div className="container relative z-10 mx-auto px-4 py-14 sm:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-gold">
              <Icon className="h-4 w-4" />
              {slide.eyebrow}
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              {slide.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              {slide.description}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
                to={slide.ctaTo}
              >
                {slide.ctaLabel}
              </Link>
              <Link
                className="inline-flex h-12 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold text-foreground transition hover:border-primary hover:text-gold"
                to={slide.secondaryTo}
              >
                {slide.secondaryLabel}
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {quickStats.map((stat) => (
                <div key={stat.label} className="rounded-[1.5rem] border border-border bg-black/20 p-5 backdrop-blur">
                  <p className="text-3xl font-black text-gold">{stat.value}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-border bg-card/70 p-6 shadow-2xl shadow-black/20 backdrop-blur">
              <div className="rounded-[1.75rem] border border-primary/20 bg-gradient-to-br from-primary/10 via-secondary/70 to-card p-8">
                <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] bg-primary/10 shadow-[0_0_80px_rgba(255,204,0,0.16)]">
                  <Icon className="h-14 w-14 text-gold" />
                </div>
                <p className="mt-8 text-sm font-semibold uppercase tracking-[0.24em] text-gold">Nutrition Cart</p>
                <h2 className="mt-3 text-3xl font-bold leading-tight">Thoughtful products, cleaner journeys, stronger retention.</h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  Every route now supports a clearer customer path from discovery to authentication, product detail, and next-step support.
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <div className="flex gap-2">
                {heroSlides.map((_, index) => (
                  <button
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-2 rounded-full transition-all ${index === currentSlide ? "w-8 bg-primary" : "w-2 bg-muted-foreground/40"}`}
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    type="button"
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                  onClick={() => setCurrentSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length)}
                  type="button"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                  onClick={() => setCurrentSlide((currentSlide + 1) % heroSlides.length)}
                  type="button"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
