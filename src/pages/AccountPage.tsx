import { CalendarClock, LogOut, Mail, PackageCheck } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";

const AccountPage = () => {
  const { isAuthenticated, isLoading, logout, user } = useAuth();

  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (!user) {
    return (
      <section className="container mx-auto px-4 py-16">
        <div className="rounded-[2rem] border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">Loading your account...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12 sm:py-16">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Card className="rounded-[2rem] border-border bg-gradient-to-br from-card via-card to-secondary shadow-2xl shadow-black/20">
          <CardContent className="p-8 lg:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold">Your account</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight">Welcome, {user.name}.</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              Your account is connected and ready. Use it to move through checkout faster, manage future orders, and keep your storefront experience personalized.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-border bg-background/60 p-5">
                <Mail className="h-5 w-5 text-gold" />
                <p className="mt-4 text-sm text-muted-foreground">Signed in as</p>
                <p className="mt-2 text-lg font-semibold">{user.email}</p>
              </div>
              <div className="rounded-[1.5rem] border border-border bg-background/60 p-5">
                <CalendarClock className="h-5 w-5 text-gold" />
                <p className="mt-4 text-sm text-muted-foreground">Member since</p>
                <p className="mt-2 text-lg font-semibold">
                  {new Date(user.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild className="rounded-full px-6">
                <Link to="/shop">Continue shopping</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-6">
                <Link to="/blog">Read fitness guides</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border-border bg-card">
          <CardContent className="p-8 lg:p-10">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
                <PackageCheck className="h-5 w-5 text-gold" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">What you can do next</h2>
                <p className="text-sm text-muted-foreground">The storefront is ready for the next step in your customer journey.</p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {[
                "Browse the full catalog through clickable product and category routes.",
                "Save items in your cart while you explore product details and blog articles.",
                "Use account access as the base for checkout or future protected flows.",
              ].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-border bg-secondary/40 p-5 text-sm text-muted-foreground">
                  {item}
                </div>
              ))}
            </div>

            <Button className="mt-8 h-12 w-full rounded-full" onClick={logout} variant="outline">
              <LogOut />
              Log out
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AccountPage;
