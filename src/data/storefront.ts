import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Apple,
  Award,
  BadgeCheck,
  Dumbbell,
  Flame,
  FlaskConical,
  HeartPulse,
  NotebookPen,
  PackageCheck,
  Rocket,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
  Zap,
} from "lucide-react";

export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  categorySlug: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  discount: number;
  badge: string;
  summary: string;
  description: string;
  benefits: string[];
  icon: LucideIcon;
  featured: "bestseller" | "new";
}

export interface Article {
  slug: string;
  title: string;
  tag: string;
  readTime: string;
  summary: string;
  icon: LucideIcon;
  highlights: string[];
  body: string[];
}

export const categories: Category[] = [
  {
    slug: "proteins",
    name: "Proteins",
    description: "Clean whey, isolate, and recovery-first blends for daily performance.",
    icon: Dumbbell,
  },
  {
    slug: "gainers",
    name: "Gainers",
    description: "High-calorie formulas designed for lean mass and steady recovery.",
    icon: Rocket,
  },
  {
    slug: "pre-post-workout",
    name: "Pre/Post Workout",
    description: "Energy, pump, creatine, and recovery support for demanding sessions.",
    icon: Zap,
  },
  {
    slug: "fit-foods",
    name: "Fit Foods",
    description: "Convenient snacks and staples that keep macros on track.",
    icon: Apple,
  },
  {
    slug: "wellness",
    name: "Wellness",
    description: "Daily health support from omega-3s to magnesium and multivitamins.",
    icon: HeartPulse,
  },
  {
    slug: "accessories",
    name: "Accessories",
    description: "Shakers, straps, and training essentials that complete the setup.",
    icon: PackageCheck,
  },
];

export const products: Product[] = [
  {
    id: 1,
    slug: "biozyme-gold-whey",
    name: "Biozyme Gold 100% Whey Protein",
    categorySlug: "proteins",
    price: 3499,
    originalPrice: 4999,
    rating: 4.8,
    reviews: 12450,
    discount: 30,
    badge: "Top Seller",
    summary: "Fast-mixing whey isolate and concentrate blend for daily muscle recovery.",
    description:
      "A premium whey formula with digestive enzymes, reliable mixability, and a profile built for post-workout recovery or high-protein meals.",
    benefits: ["25g protein per serving", "Digestive enzyme support", "Low sugar and easy to mix"],
    icon: Dumbbell,
    featured: "bestseller",
  },
  {
    id: 2,
    slug: "raw-whey-concentrate",
    name: "Raw Whey Protein Concentrate 80%",
    categorySlug: "proteins",
    price: 1899,
    originalPrice: 2499,
    rating: 4.5,
    reviews: 8320,
    discount: 24,
    badge: "Everyday Value",
    summary: "A straightforward, budget-friendly whey for consistent protein intake.",
    description:
      "This concentrate keeps the formula simple and effective, making it a dependable option for athletes building daily protein habits.",
    benefits: ["High protein density", "Great for smoothies or oats", "Strong value per serving"],
    icon: BadgeCheck,
    featured: "bestseller",
  },
  {
    id: 3,
    slug: "super-gainer-xxl",
    name: "Super Gainer XXL",
    categorySlug: "gainers",
    price: 2199,
    originalPrice: 2999,
    rating: 4.4,
    reviews: 5640,
    discount: 27,
    badge: "Mass Builder",
    summary: "A calorie-dense recovery blend for hard gainers and high-volume training blocks.",
    description:
      "Designed to make calorie intake easier, this gainer combines protein and carbohydrates to support lean mass phases and recovery-heavy schedules.",
    benefits: ["Balanced carb-to-protein ratio", "Ideal for mass phases", "Easy calories after training"],
    icon: Rocket,
    featured: "bestseller",
  },
  {
    id: 4,
    slug: "micronized-creatine",
    name: "Micronized Creatine Monohydrate",
    categorySlug: "pre-post-workout",
    price: 799,
    originalPrice: 1199,
    rating: 4.9,
    reviews: 9870,
    discount: 33,
    badge: "Clinically Dosed",
    summary: "Pure creatine monohydrate to support strength, output, and repeatability.",
    description:
      "A finely milled creatine powder that dissolves easily and supports power production, training volume, and long-term performance progression.",
    benefits: ["3 to 5g daily support", "Micronized for mixability", "Trusted performance ingredient"],
    icon: Zap,
    featured: "bestseller",
  },
  {
    id: 5,
    slug: "pre-workout-ignite-xt",
    name: "Pre-Workout Ignite XT",
    categorySlug: "pre-post-workout",
    price: 1299,
    originalPrice: 1799,
    rating: 4.6,
    reviews: 3210,
    discount: 28,
    badge: "High Energy",
    summary: "A focused pre-workout for sharp sessions, pump support, and controlled intensity.",
    description:
      "Formulated for athletes who want alertness without a crash, Ignite XT supports energy, drive, and performance during demanding workouts.",
    benefits: ["Fast-acting focus support", "Built for training intensity", "Smooth flavor profile"],
    icon: Flame,
    featured: "bestseller",
  },
  {
    id: 6,
    slug: "bcaa-pro-7000",
    name: "BCAA Pro 7000",
    categorySlug: "pre-post-workout",
    price: 999,
    originalPrice: 1499,
    rating: 4.3,
    reviews: 4560,
    discount: 33,
    badge: "Hydration Ready",
    summary: "Intra-workout amino support with refreshing flavors for longer sessions.",
    description:
      "Built for athletes training in heat or high volume, this formula supports hydration habits and amino acid intake during sessions.",
    benefits: ["Supports long workout blocks", "Refreshing intra-workout option", "Easy daily sipping formula"],
    icon: Activity,
    featured: "bestseller",
  },
  {
    id: 7,
    slug: "peanut-butter-dark-chocolate",
    name: "Peanut Butter Dark Chocolate",
    categorySlug: "fit-foods",
    price: 449,
    originalPrice: 599,
    rating: 4.7,
    reviews: 15200,
    discount: 25,
    badge: "Smart Snack",
    summary: "A high-protein pantry staple that makes healthy meals feel easier.",
    description:
      "Rich, satisfying, and versatile, this dark chocolate peanut butter pairs with toast, oats, shakes, or spoon-straight convenience.",
    benefits: ["Good source of healthy fats", "Works in breakfast or snacks", "Crowd-favorite taste"],
    icon: UtensilsCrossed,
    featured: "new",
  },
  {
    id: 8,
    slug: "omega-3-triple-strength",
    name: "Omega-3 Triple Strength",
    categorySlug: "wellness",
    price: 699,
    originalPrice: 999,
    rating: 4.4,
    reviews: 2890,
    discount: 30,
    badge: "Daily Essential",
    summary: "A wellness staple for routine support, recovery, and long-term consistency.",
    description:
      "Triple-strength omega-3 softgels built for athletes who want a simple daily habit that complements training, work, and recovery demands.",
    benefits: ["Convenient daily support", "Pairs well with any routine", "Third-party quality focus"],
    icon: ShieldCheck,
    featured: "new",
  },
  {
    id: 9,
    slug: "iso-whey-zero-carb",
    name: "Iso-Whey Zero Carb Isolate",
    categorySlug: "proteins",
    price: 3999,
    originalPrice: 5499,
    rating: 4.9,
    reviews: 1230,
    discount: 27,
    badge: "Lean Formula",
    summary: "A refined whey isolate built for cutting phases and high-protein precision.",
    description:
      "Zero-carb isolate with a clean finish, designed for athletes who want premium protein with a lean nutrition profile.",
    benefits: ["Ultra-lean macro profile", "Quick post-workout absorption", "Premium isolate texture"],
    icon: Sparkles,
    featured: "new",
  },
  {
    id: 10,
    slug: "l-glutamine-recovery-plus",
    name: "L-Glutamine Recovery Plus",
    categorySlug: "pre-post-workout",
    price: 899,
    originalPrice: 1199,
    rating: 4.2,
    reviews: 780,
    discount: 25,
    badge: "Recovery Support",
    summary: "Simple glutamine support for recovery-focused routines and stacked nutrition plans.",
    description:
      "Designed to complement demanding schedules, this formula layers easily into post-workout shakes and daily recovery routines.",
    benefits: ["Supports recovery habits", "Mixes into most drinks", "Easy stack with protein or creatine"],
    icon: FlaskConical,
    featured: "new",
  },
  {
    id: 11,
    slug: "eaa-essential-amino-acids",
    name: "EAA Essential Amino Acids",
    categorySlug: "pre-post-workout",
    price: 1199,
    originalPrice: 1699,
    rating: 4.5,
    reviews: 560,
    discount: 29,
    badge: "Session Fuel",
    summary: "Full-spectrum essential amino support for training blocks and recovery windows.",
    description:
      "A balanced amino formula for athletes who want intra-workout support without heavy sweetness or complicated stacks.",
    benefits: ["Complete essential amino blend", "Great for long sessions", "Easy hydration companion"],
    icon: Activity,
    featured: "new",
  },
  {
    id: 12,
    slug: "hydro-whey-platinum",
    name: "Hydro Whey Platinum Edition",
    categorySlug: "proteins",
    price: 4299,
    originalPrice: 5999,
    rating: 4.9,
    reviews: 340,
    discount: 28,
    badge: "Elite Pick",
    summary: "Hydrolyzed whey for athletes who want premium digestion and rapid recovery support.",
    description:
      "An advanced whey profile with fast absorption and a smooth texture, aimed at top-end performance routines and clean recovery nutrition.",
    benefits: ["Hydrolyzed whey profile", "Fast-digesting premium formula", "Built for serious training schedules"],
    icon: Award,
    featured: "new",
  },
];

export const heroSlides = [
  {
    eyebrow: "Performance Nutrition, Delivered",
    title: "Supplements That Match Serious Training.",
    description:
      "From clinically dosed creatine to premium whey blends, Nutrition Cart helps you build a reliable routine with products you can trust.",
    ctaLabel: "Explore the shop",
    ctaTo: "/shop",
    secondaryLabel: "Create your account",
    secondaryTo: "/auth",
    icon: Sparkles,
  },
  {
    eyebrow: "Recovery Without Guesswork",
    title: "Build A Stack That Works Together.",
    description:
      "Whey, creatine, EAAs, and wellness support curated to make recovery simple, effective, and easy to repeat every week.",
    ctaLabel: "View bestsellers",
    ctaTo: "/shop?featured=bestseller",
    secondaryLabel: "Read buying guides",
    secondaryTo: "/blog",
    icon: FlaskConical,
  },
  {
    eyebrow: "Built For Ambitious Goals",
    title: "Professional Nutrition For Everyday Athletes.",
    description:
      "Purposeful formulations, clean branding, and straightforward guidance for lifters, runners, and anyone training with intent.",
    ctaLabel: "Browse new arrivals",
    ctaTo: "/shop?featured=new",
    secondaryLabel: "Talk to support",
    secondaryTo: "/contact",
    icon: ShieldCheck,
  },
];

export const trustBadges = [
  {
    title: "100% Authentic",
    description: "Every product is sourced through verified supply channels with batch-backed quality checks.",
    icon: ShieldCheck,
  },
  {
    title: "Lab Tested",
    description: "Third-party testing and formulation transparency keep our catalog grounded in real standards.",
    icon: FlaskConical,
  },
  {
    title: "Science-Led",
    description: "Our recommendations stay focused on ingredients, dosage, and consistency over hype.",
    icon: Award,
  },
];

export const articles: Article[] = [
  {
    slug: "magnesium-for-sleep",
    title: "Sleep and Magnesium: What Actually Matters?",
    tag: "Wellness",
    readTime: "6 min read",
    summary: "A practical look at where magnesium helps, what it does not solve, and how to build a calmer evening routine.",
    icon: NotebookPen,
    highlights: ["Start with routine before supplements", "Pair magnesium with sleep hygiene", "Keep doses simple and consistent"],
    body: [
      "Magnesium can support relaxation for some people, but it works best when it complements a strong routine rather than replacing one. Better bedtime timing, reduced screen light, and predictable sleep windows still do most of the work.",
      "If you decide to use magnesium, consistency matters more than chasing megadoses. Most athletes benefit from choosing one form they tolerate well and taking it at the same time each evening.",
      "The bigger win is usually system design: a cutoff for caffeine, a lighter final meal, and a wind-down ritual that makes sleep feel easier to enter.",
    ],
  },
  {
    slug: "protein-deficiency-signs",
    title: "5 Signs Your Diet Needs More Protein",
    tag: "Nutrition",
    readTime: "5 min read",
    summary: "Small signals like poor satiety and slow recovery often point to the same underlying gap: not enough protein across the day.",
    icon: Apple,
    highlights: ["Distribute intake across meals", "Recovery quality often improves first", "Protein planning beats reactive snacking"],
    body: [
      "If you are constantly hungry soon after meals, struggling to recover from training, or relying on snacks that never feel satisfying, protein is often part of the picture.",
      "The fix is not always a giant shake. Many athletes do better by spreading protein across breakfast, lunch, dinner, and one targeted snack or post-workout serving.",
      "Supplements help most when they remove friction. A dependable whey powder can make it easier to hit targets on busy days without overcomplicating the rest of the plan.",
    ],
  },
  {
    slug: "creatine-loading-explained",
    title: "Creatine Loading: Necessary or Optional?",
    tag: "Supplements",
    readTime: "7 min read",
    summary: "Loading saturates stores faster, but steady daily use still works well for most people and is easier to maintain.",
    icon: Zap,
    highlights: ["Loading is faster, not mandatory", "Daily use matters most", "Creatine works best with consistency"],
    body: [
      "Creatine loading can help you reach muscle saturation more quickly, but it is not the only effective approach. Many athletes prefer a simple daily protocol because it is easier to remember and gentler on the stomach.",
      "What matters most is repeatability. Three to five grams per day over time remains the core habit that drives the benefit.",
      "If you want the simplest plan, take creatine daily, stay hydrated, and give it time. Long-term consistency is usually more important than the first week.",
    ],
  },
];

export const quickStats = [
  { label: "Verified products", value: "250+" },
  { label: "Trusted athlete reviews", value: "40K+" },
  { label: "Repeat customers", value: "68%" },
];

export const bestsellers = products.filter((product) => product.featured === "bestseller");
export const newArrivals = products.filter((product) => product.featured === "new");

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}
