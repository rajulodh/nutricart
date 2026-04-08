const articles = [
  { title: "Sleep & Magnesium: Is There Really a Link?", tag: "Wellness", emoji: "😴" },
  { title: "5 Signs You Need More Protein in Your Diet", tag: "Nutrition", emoji: "🍗" },
  { title: "Creatine Loading: Myth or Science?", tag: "Supplements", emoji: "🧬" },
];

const BlogSection = () => (
  <section className="py-12 sm:py-16">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl sm:text-3xl font-black text-center mb-8">
        FROM THE <span className="text-gold">BLOG</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {articles.map((article) => (
          <a key={article.title} href="#" className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all">
            <div className="h-40 bg-charcoal-light flex items-center justify-center text-5xl group-hover:scale-105 transition-transform">
              {article.emoji}
            </div>
            <div className="p-4">
              <span className="text-xs font-bold text-gold uppercase">{article.tag}</span>
              <h3 className="text-sm font-bold text-foreground mt-2 group-hover:text-gold transition-colors">{article.title}</h3>
              <span className="text-xs text-muted-foreground mt-2 inline-block">Read More →</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default BlogSection;
