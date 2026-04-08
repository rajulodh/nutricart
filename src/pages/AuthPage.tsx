import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { quickStats } from "@/data/storefront";
import { useAuth } from "@/context/AuthContext";

type AuthMode = "login" | "signup";

const AuthPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, login, signup } = useAuth();
  const [mode, setMode] = useState<AuthMode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isLoading && isAuthenticated) {
    return <Navigate to="/account" replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (mode === "signup" && name.trim().length < 2) {
      toast.error("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    try {
      setSubmitting(true);

      const message =
        mode === "login"
          ? await login({ email: email.trim(), password })
          : await signup({ name: name.trim(), email: email.trim(), password });

      toast.success(message);
      navigate("/account");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Authentication failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="container mx-auto px-4 py-12 sm:py-16">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-border bg-gradient-to-br from-card via-card to-secondary p-8 shadow-2xl shadow-black/20 lg:p-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-gold">
            <Sparkles className="h-4 w-4" />
            Secure member access
          </div>
          <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
            Sign in to manage orders, save your cart, and check out faster.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Your account gives you a cleaner shopping experience with session persistence, order-ready details, and a more personalized storefront.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {quickStats.map((stat) => (
              <div key={stat.label} className="rounded-[1.5rem] border border-border bg-background/50 p-5">
                <p className="text-3xl font-black text-gold">{stat.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            {[
              "MongoDB-backed authentication with hashed passwords.",
              "Persistent login session across page refreshes.",
              "Clickable shopping, blog, and support routes across the storefront.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-secondary/40 p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-gold" />
                <p className="text-sm text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild className="rounded-full px-6">
              <Link to="/shop">
                Explore the shop
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-6">
              <Link to="/blog">Read fitness guides</Link>
            </Button>
          </div>
        </div>

        <Card className="rounded-[2rem] border-border bg-card/95 shadow-2xl shadow-black/20">
          <CardContent className="p-8 lg:p-10">
            <div className="flex rounded-full border border-border bg-secondary/60 p-1">
              <button
                className={`flex-1 rounded-full px-4 py-3 text-sm font-semibold transition-colors ${
                  mode === "login" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
                onClick={() => setMode("login")}
                type="button"
              >
                Login
              </button>
              <button
                className={`flex-1 rounded-full px-4 py-3 text-sm font-semibold transition-colors ${
                  mode === "signup" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
                onClick={() => setMode("signup")}
                type="button"
              >
                Sign up
              </button>
            </div>

            <div className="mt-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
                  <ShieldCheck className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{mode === "login" ? "Welcome back" : "Create your account"}</h2>
                  <p className="text-sm text-muted-foreground">
                    {mode === "login"
                      ? "Use your email and password to continue."
                      : "Set up your account in less than a minute."}
                  </p>
                </div>
              </div>

              <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                {mode === "signup" && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input
                      id="name"
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Alex Morgan"
                      value={name}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    type="email"
                    value={email}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="At least 8 characters"
                    type="password"
                    value={password}
                  />
                </div>

                <Button className="h-12 w-full rounded-full text-base" disabled={submitting || isLoading} type="submit">
                  {submitting ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
                </Button>
              </form>

              <p className="mt-6 text-sm text-muted-foreground">
                {mode === "login" ? "Need an account? " : "Already have an account? "}
                <button
                  className="font-semibold text-gold transition-colors hover:text-gold/80"
                  onClick={() => setMode(mode === "login" ? "signup" : "login")}
                  type="button"
                >
                  {mode === "login" ? "Sign up now" : "Log in instead"}
                </button>
              </p>

              <div className="mt-8 rounded-[1.5rem] border border-border bg-secondary/50 p-5 text-sm text-muted-foreground">
                By continuing, you agree to our <Link className="text-gold hover:underline" to="/support">support policies</Link> and{" "}
                <Link className="text-gold hover:underline" to="/contact">contact guidelines</Link>.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AuthPage;
