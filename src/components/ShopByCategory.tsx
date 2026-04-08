const categories = [
  { name: "Whey Protein", emoji: "🥤" },
  { name: "Mass Gainer", emoji: "💪" },
  { name: "Creatine", emoji: "⚡" },
  { name: "Pre-Workout", emoji: "🔥" },
  { name: "Peanut Butter", emoji: "🥜" },
  { name: "BCAAs", emoji: "🧪" },
  { name: "Vitamins", emoji: "💊" },
  { name: "Accessories", emoji: "🎒" },
];

const ShopByCategory = () => (
  <section className="py-12 sm:py-16">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl sm:text-3xl font-black text-center mb-8">
        SHOP BY <span className="text-gold">CATEGORY</span>
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-4 lg:grid-cols-8 sm:overflow-visible scrollbar-hide">
        {categories.map((cat) => (
          <a
            key={cat.name}
            href="#"
            className="flex-shrink-0 flex flex-col items-center gap-3 group"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-secondary border-2 border-border group-hover:border-primary flex items-center justify-center text-3xl sm:text-4xl transition-all group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20">
              {cat.emoji}
            </div>
            <span className="text-xs sm:text-sm font-semibold text-muted-foreground group-hover:text-gold transition-colors whitespace-nowrap">
              {cat.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default ShopByCategory;
