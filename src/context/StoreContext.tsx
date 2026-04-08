import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "@/components/ui/sonner";
import type { Product } from "@/data/storefront";

export interface CartItem {
  id: number;
  slug: string;
  name: string;
  price: number;
  quantity: number;
}

interface StoreContextValue {
  cartItems: CartItem[];
  cartCount: number;
  cartOpen: boolean;
  addToCart: (product: Product) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  openCart: () => void;
  closeCart: () => void;
}

const cartStorageKey = "nutrition-cart-items";

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

function readStoredCart() {
  const storedCart = localStorage.getItem(cartStorageKey);

  if (!storedCart) {
    return [];
  }

  try {
    return JSON.parse(storedCart) as CartItem[];
  } catch {
    localStorage.removeItem(cartStorageKey);
    return [];
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => readStoredCart());
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(cartStorageKey, JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(product: Product) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [
        ...currentItems,
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ];
    });

    setCartOpen(true);
    toast.success(`${product.name} added to cart.`);
  }

  function updateQuantity(id: number, quantity: number) {
    if (quantity < 1) {
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  }

  function removeFromCart(id: number) {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== id));
    toast.message("Item removed from cart.");
  }

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        cartItems,
        cartCount,
        cartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        openCart: () => setCartOpen(true),
        closeCart: () => setCartOpen(false),
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used inside StoreProvider.");
  }

  return context;
}
