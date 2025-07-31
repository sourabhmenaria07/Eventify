import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import store from "./store/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App";
import AuthLayout from "./layouts/AuthLayout";
import EventForm from "./components/ui/forms/EventForm";

import {Login, Signup, Dashboard, EventPage, MyBookmarks, Profile, ForgotPassword, ResetPassword, VerifyEmail, 
  AllEvents, EditEvent, VerifyPending} from "./pages/index";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <AllEvents /> },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/verify",
        element: <VerifyEmail />,
      },
      {
        path: "/verify-pending",
        element: <VerifyPending />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/dashboard",
        element: (
          <AuthLayout authentication>
            <Dashboard />
          </AuthLayout>
        ),
      },
      {
        path: "/create-event",
        element: (
          <AuthLayout authentication>
            <EventForm />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-event/:slug",
        element: (
          <AuthLayout authentication>
            <EditEvent />
          </AuthLayout>
        ),
      },
      {
        path: "/event/:slug",
        element: <EventPage />,
      },
      {
        path: "/bookmarks",
        element: (
          <AuthLayout authentication>
            <MyBookmarks />
          </AuthLayout>
        ),
      },
      {
        path: "/profile",
        element: (
          <AuthLayout authentication>
            <Profile />
          </AuthLayout>
        ),
      },
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
