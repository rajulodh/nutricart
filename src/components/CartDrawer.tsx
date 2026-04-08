import { X, Minus, Plus, ShoppingBag } from "lucide-react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
}

const CartDrawer = ({ open, onClose, items, onUpdateQuantity, onRemove }: CartDrawerProps) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      {open && <div className="fixed inset-0 bg-black/60 z-50" onClick={onClose} />}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-card z-50 shadow-2xl transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-bold text-foreground">Your Cart</h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-3">
                <ShoppingBag size={48} />
                <p className="font-medium">Your cart is empty</p>
              </div>
            ) : items.map((item) => (
              <div key={item.id} className="flex gap-3 bg-secondary rounded-lg p-3">
                <div className="w-16 h-16 bg-charcoal-light rounded-md flex items-center justify-center text-2xl flex-shrink-0">🏋️</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{item.name}</p>
                  <p className="text-gold font-bold text-sm mt-1">₹{item.price.toLocaleString()}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 rounded bg-charcoal flex items-center justify-center text-foreground hover:bg-charcoal-light"><Minus size={12} /></button>
                    <span className="text-sm font-medium text-foreground w-6 text-center">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 rounded bg-charcoal flex items-center justify-center text-foreground hover:bg-charcoal-light"><Plus size={12} /></button>
                    <button onClick={() => onRemove(item.id)} className="ml-auto text-xs text-destructive hover:underline">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-4 border-t border-border space-y-3">
              <div className="flex justify-between text-foreground font-bold">
                <span>Subtotal</span>
                <span className="text-gold">₹{subtotal.toLocaleString()}</span>
              </div>
              <button className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:brightness-110 transition">
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
