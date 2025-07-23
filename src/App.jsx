import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";

import Header from "./components/Header/Header";
import LoaderOverlay from "./components/ui/LoaderOverlay";
import Footer from "./components/Footer/Footer";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-col text-body bg-background transition-colors duration-300">
      <Header />
      <main className="flex-grow bg-surface">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-background text-body">
      <LoaderOverlay /> {/* or a simpler loader */}
    </div>
  );
}

export default App;
