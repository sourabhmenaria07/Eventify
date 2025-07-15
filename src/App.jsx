import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import Signup from "./pages/Signup"

import Header from "./components/Header/Header";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
// import Footer from "./components/Footer/Footer";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   authService
  //     .getCurrentUser()
  //     .then((userData) => {
  //       if (userData) {
  //         dispatch(login({ userData }));
  //       } else {
  //         dispatch(logout());
  //       }
  //     })
  //     .finally(() => setLoading(false));
  // }, []);

  // return !loading ? (
  //   <div className="min-h-screen flex flex-col text-body bg-background transition-colors duration-300">
  //     <Header />
  //     <main className="flex-grow">
  //       <Outlet />
  //     </main>
  //     {/* <Footer /> */}
  //   </div>
  // ) : null;
  return (
    <>
    <ResetPassword />
    <ForgotPassword />
    <Signup />
    <Login />
    
    </>
  )
}

export default App;
