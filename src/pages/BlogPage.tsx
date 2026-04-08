import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { articles } from "@/data/storefront";

const BlogPage = () => {
  return (
    <section className="container mx-auto px-4 py-12 sm:py-16">
      <div className="rounded-[2rem] border border-border bg-gradient-to-br from-card via-card to-secondary p-8 shadow-2xl shadow-black/20">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold">Editorial</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
          Clear nutrition guidance without the noise.
        </h1>
        <p className="mt-4 max-w-3xl text-base text-muted-foreground sm:text-lg">
          Our blog focuses on habits, ingredients, and practical choices that make training feel more sustainable week after week.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {articles.map((article) => {
          const Icon = article.icon;

          return (
            <article key={article.slug} className="group rounded-[1.75rem] border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <Icon className="h-7 w-7 text-gold" />
              </div>
              <div className="mt-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <span className="text-gold">{article.tag}</span>
                <span>{article.readTime}</span>
              </div>
              <h2 className="mt-4 text-2xl font-bold leading-tight transition-colors group-hover:text-gold">
                {article.title}
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{article.summary}</p>
              <Button asChild variant="ghost" className="mt-6 px-0 text-gold hover:text-gold">
                <Link to={`/blog/${article.slug}`}>
                  Read article
                  <ArrowRight />
                </Link>
              </Button>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default BlogPage;
