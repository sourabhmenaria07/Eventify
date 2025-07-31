import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";

export default function DropdownDrawer({ isOpen, onClose, navItems }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-white/10 backdrop-blur-sm lg:hidden"
      onClick={onClose}
    >
      <div
        className="fixed top-0 right-0 w-3/4 h-full bg-surface p-6 flex flex-col shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-700 dark:text-white" />
          </button>
        </div>

        <nav className="flex flex-col gap-4">
          {navItems.map((item) =>
            item.active ? (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.slug);
                  onClose();
                }}
                className="text-left text-body hover:text-primary transition-colors"
              >
                {item.name}
              </button>
            ) : null
          )}
        </nav>

        <div className="mt-auto pt-6">
          <LogoutBtn />
        </div>
      </div>
    </div>
  );
}
