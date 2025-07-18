import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Logo from "../ui/Logo";
import { Menu, X } from "lucide-react";
import ToggleTheme from "../ui/ToggleTheme";
import LogoutBtn from "./LogoutBtn";
import { useState } from "react";
import DropdownDrawer from "./DropdownDrawer";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Dashboard",
      slug: "/dashboard",
      active: authStatus === "loggedIn",
    },
    {
      name: "Login",
      slug: "/login",
      active: authStatus === "loggedOut",
    },
    {
      name: "Signup",
      slug: "/signup",
      active: authStatus === "loggedOut",
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: true,
    },
    {
      name: "Create Event",
      slug: "/create-event",
      active: authStatus === "loggedIn",
    },
    {
      name: "Bookmarks",
      slug: "/bookmarks",
      active: authStatus === "loggedIn",
    },
  ];
  return (
    <header className="bg-surface text-body shadow-md">
      <div className="container px-4 py-3 flex justify-between items-center md:px-6 max-w-screen-xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <Logo width="140px" />
        </Link>

        <nav className="hidden sm:flex items-center space-x-6">
          <ul className="flex ml-auto gap-2">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <Link
                    to={item.slug}
                    className={`inline-block px-6 py-2 duration-200 rounded-full ${
                      location.pathname === item.slug
                        ? "bg-primary text-white"
                        : "bg-muted hover:bg-primary/10"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ) : null
            )}
          </ul>
        </nav>
        <div className="hidden sm:flex items-center space-x-4">
          <ToggleTheme />
          {authStatus === "loggedIn" && <LogoutBtn />}
        </div>
        <button
          className="sm:hidden focus:outline-none"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>
      <DropdownDrawer
        isOpen={menuOpen}
        navItems={navItems}
        onClose={() => setMenuOpen(false)}
      />
    </header>
  );
}

export default Header;
