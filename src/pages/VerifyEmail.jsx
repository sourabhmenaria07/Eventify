import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { setGlobalLoading } from "../store/appSlice";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying"); // verifying | success | verified-only | error
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");
    console.log("🚨 userId type:", typeof userId, "value:", userId);
console.log("🚨 secret type:", typeof secret, "value:", secret);


    if (userId && secret) {
      verifyEmail({userId, secret});
    } else {
      setStatus("error");
    }
  }, []);

  const verifyEmail = async (userId, secret) => {
    dispatch(setGlobalLoading(true));
    try {
      const email = localStorage.getItem("resendEmail");
      const password = localStorage.getItem("resendPassword");

      if (email && password) {
        await authService.login({ email, password }); // ensure session
      }
      // 1. Attempt to verify
      await authService.verifyEmail(userId, secret);

      // 2. Try to get current session (only exists on same device)
      const user = await authService.getCurrentUser();
      console.log("👤 Current user:", user);
      if (user) {
        dispatch(login({ userData: user }));
        setStatus("success");

        localStorage.removeItem("resendEmail");
        localStorage.removeItem("resendPassword");

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setStatus("verified-only");
      }
    } catch (error) {
      console.error("Email verification failed:", error);
      setStatus("error");
    } finally {
      dispatch(setGlobalLoading(false));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 text-center p-6 bg-surface rounded shadow text-body">
      {status === "verifying" && <p>Verifying your email...</p>}

      {status === "success" && (
        <p className="text-green-600 font-semibold">
          Email verified successfully! Redirecting...
        </p>
      )}

      {status === "verified-only" && (
        <div>
          <p className="text-green-600 font-semibold mb-4">
            Your email has been verified!
          </p>
          <p className="mb-4 text-body">
            You can now log in to your Eventify account.
          </p>
          <Link
            to="/login"
            className="inline-block bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
          >
            Go to Login
          </Link>
        </div>
      )}

      {status === "error" && (
        <p className="text-red-500 font-semibold">
          Verification failed or invalid link.
        </p>
      )}
    </div>
  );
}
