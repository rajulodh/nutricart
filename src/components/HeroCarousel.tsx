import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "UNLEASH YOUR",
    highlight: "BEAST MODE",
    subtitle: "100% Whey Protein Isolate — Lab Tested & Certified",
    cta: "Shop Now",
    emoji: "💪",
  },
  {
    title: "FUEL YOUR",
    highlight: "GAINS",
    subtitle: "Premium Mass Gainers — 1000+ Calories Per Serving",
    cta: "Explore Gainers",
    emoji: "🔥",
  },
  {
    title: "POWER UP WITH",
    highlight: "CREATINE",
    subtitle: "Clinically Dosed Micronized Creatine Monohydrate",
    cta: "Get Yours",
    emoji: "⚡",
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-charcoal to-background">
      <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-32 flex flex-col items-center text-center relative z-10">
        {/* Decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

        <span className="text-6xl sm:text-8xl mb-6">{slide.emoji}</span>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-foreground leading-tight">
          {slide.title} <br />
          <span className="text-gold">{slide.highlight}</span>
        </h1>
        <p className="mt-4 text-muted-foreground text-lg sm:text-xl max-w-xl">{slide.subtitle}</p>
        <button className="mt-8 bg-primary text-primary-foreground font-bold px-8 py-3.5 rounded-lg text-lg hover:brightness-110 transition-all hover:scale-105 shadow-lg shadow-primary/30">
          {slide.cta}
        </button>

        {/* Dots */}
        <div className="flex gap-2 mt-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${i === current ? "w-8 bg-primary" : "w-2 bg-muted-foreground/40"}`}
            />
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button onClick={() => setCurrent((current - 1 + slides.length) % slides.length)} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground hidden sm:block">
        <ChevronLeft size={36} />
      </button>
      <button onClick={() => setCurrent((current + 1) % slides.length)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground hidden sm:block">
        <ChevronRight size={36} />
      </button>
    </section>
  );
};

export default HeroCarousel;
