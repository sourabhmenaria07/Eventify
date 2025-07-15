import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import store from "./store/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App";
// import { AuthLayout } from "./";

// Pages
// import Home from "./pages/Home";
import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";
import EventPage from "./pages/EventPage";
// import EventForm from "./components/ui/forms/EventForm"; // Reused for both create and edit

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // { path: "/", element: <Home /> },
      {
        path: "/login",
        element: (
          // <AuthLayout authentication={false}>
          <Login />
          // </AuthLayout>
        ),
      },
      // {
      //   path: "/signup",
      //   element: (
      //     <AuthLayout authentication={false}>
      //       <Signup />
      //     </AuthLayout>
      //   ),
      // },
      // {
      //   path: "/dashboard",
      //   element: (
      //     <AuthLayout authentication>
      //       <Dashboard />
      //     </AuthLayout>
      //   ),
      // },
      // {
      //   path: "/forgot-password",
      //   element: <ForgotPassword />,
      // },
      // {
      //   path: "/reset-password",
      //   element: <ResetPassword />,
      // },
      // {
      //   path: "/event/:slug",
      //   element: <EventPage />,
      // },
      // {
      //   path: "/create-event",
      //   element: (
      //     <AuthLayout authentication>
      //       <EventForm />
      //     </AuthLayout>
      //   ),
      // },
      // {
      //   path: "/edit-event/:slug",
      //   element: (
      //     <AuthLayout authentication>
      //       <EventForm />
      //     </AuthLayout>
      //   ),
      // },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
