import { Outlet } from "react-router-dom";
import { useStore } from "@/context/StoreContext";
import SiteAnnouncementBar from "@/components/store/SiteAnnouncementBar";
import SiteCartDrawer from "@/components/store/SiteCartDrawer";
import SiteFooter from "@/components/store/SiteFooter";
import SiteNavbar from "@/components/store/SiteNavbar";

const SiteLayout = () => {
  const { cartCount, cartItems, cartOpen, closeCart, openCart, removeFromCart, updateQuantity } = useStore();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteAnnouncementBar />
      <SiteNavbar cartCount={cartCount} onCartClick={openCart} />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
      <SiteCartDrawer
        open={cartOpen}
        onClose={closeCart}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
    </div>
  );
};

export default SiteLayout;
