import { ArrowLeft } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getArticleBySlug } from "@/data/storefront";

const ArticlePage = () => {
  const { slug } = useParams();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const Icon = article.icon;

  return (
    <article className="container mx-auto px-4 py-12 sm:py-16">
      <Button asChild variant="ghost" className="px-0 text-gold hover:text-gold">
        <Link to="/blog">
          <ArrowLeft />
          Back to blog
        </Link>
      </Button>

      <div className="mt-6 rounded-[2rem] border border-border bg-card p-8 lg:p-12">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10">
          <Icon className="h-8 w-8 text-gold" />
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          <span className="text-gold">{article.tag}</span>
          <span>{article.readTime}</span>
        </div>
        <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">{article.title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{article.summary}</p>

        <div className="mt-8 grid gap-4 rounded-[1.75rem] border border-border bg-secondary/40 p-6 lg:grid-cols-3">
          {article.highlights.map((highlight) => (
            <div key={highlight} className="rounded-2xl border border-border bg-background/60 p-4 text-sm font-medium text-foreground">
              {highlight}
            </div>
          ))}
        </div>

        <div className="mt-10">
          {article.body.map((paragraph) => (
            <p key={paragraph} className="mb-6 text-base leading-8 text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button asChild className="rounded-full px-6">
            <Link to="/shop">Shop supplements</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full px-6">
            <Link to="/auth">Create account</Link>
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ArticlePage;
