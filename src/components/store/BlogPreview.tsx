import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { articles } from "@/data/storefront";

const BlogPreview = () => {
  return (
    <section className="py-14 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold">Editorial preview</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">From the blog</h2>
          </div>
          <Link className="hidden text-sm font-semibold text-gold transition-colors hover:text-gold/80 sm:inline-flex" to="/blog">
            Visit blog
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              className="group rounded-[1.75rem] border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10"
              key={article.slug}
              to={`/blog/${article.slug}`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <article.icon className="h-7 w-7 text-gold" />
              </div>
              <div className="mt-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <span className="text-gold">{article.tag}</span>
                <span>{article.readTime}</span>
              </div>
              <h3 className="mt-4 text-2xl font-bold leading-tight transition-colors group-hover:text-gold">{article.title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{article.summary}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                Read article
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
