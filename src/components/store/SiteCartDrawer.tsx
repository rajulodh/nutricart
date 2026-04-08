import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import type { CartItem } from "@/context/StoreContext";
import { formatPrice } from "@/lib/format";

interface SiteCartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

const SiteCartDrawer = ({ open, onClose, items, onUpdateQuantity, onRemove }: SiteCartDrawerProps) => {
  const { isAuthenticated } = useAuth();
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      {open && <div className="fixed inset-0 z-50 bg-black/60" onClick={onClose} />}

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-card shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="text-lg font-bold">Your cart</h2>
            <p className="text-sm text-muted-foreground">{items.length} item(s)</p>
          </div>
          <button className="text-muted-foreground transition-colors hover:text-foreground" onClick={onClose} type="button">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              <p className="font-medium">Your cart is empty.</p>
              <p className="max-w-xs text-sm text-muted-foreground">
                Add a few products to start building a stack that supports your training goals.
              </p>
              <Link
                className="mt-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
                onClick={onClose}
                to="/shop"
              >
                Browse products
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="rounded-[1.5rem] border border-border bg-secondary/60 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link className="font-semibold transition-colors hover:text-gold" onClick={onClose} to={`/products/${item.slug}`}>
                        {item.name}
                      </Link>
                      <p className="mt-1 text-sm font-medium text-gold">{formatPrice(item.price)}</p>
                    </div>
                    <button className="text-xs text-destructive transition-colors hover:underline" onClick={() => onRemove(item.id)} type="button">
                      Remove
                    </button>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <button
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      type="button"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      type="button"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border px-5 py-5">
            <div className="flex items-center justify-between text-base font-semibold">
              <span>Subtotal</span>
              <span className="text-gold">{formatPrice(subtotal)}</span>
            </div>
            <Link
              className="mt-4 block rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-primary-foreground transition hover:brightness-110"
              onClick={onClose}
              to={isAuthenticated ? "/account" : "/auth"}
            >
              {isAuthenticated ? "Continue to account" : "Sign in to continue"}
            </Link>
          </div>
        )}
      </aside>
    </>
  );
};

export default SiteCartDrawer;
