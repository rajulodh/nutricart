import { X } from "lucide-react";
import { useState } from "react";

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="bg-primary text-primary-foreground text-xs sm:text-sm font-semibold py-2 px-4 text-center relative">
      <span>🔥 Biozyme Gold 100% Whey — Extra 5% Off | Grab 250g Creatine Combos @ ₹1,099</span>
      <button onClick={() => setVisible(false)} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100">
        <X size={14} />
      </button>
    </div>
  );
};

export default AnnouncementBar;
