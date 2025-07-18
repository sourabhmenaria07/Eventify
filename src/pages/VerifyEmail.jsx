import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { setGlobalLoading } from "../store/appSlice";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying"); // verifying | success | error
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");

    if (userId && secret) {
      verifyEmail(userId, secret);
    } else {
      setStatus("error");
    }
  }, []);

  const verifyEmail = async (userId, secret) => {
    dispatch(setGlobalLoading(true));
    try {
      await authService.verifyEmail(userId, secret);

      // Get current user and auto-login
      const user = await authService.getCurrentUser();
      if (user) {
        dispatch(login({ userData: user }));
        setStatus("success");

        // Redirect after short delay
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Email verification failed:", error);
      setStatus("error");
    } finally {
      dispatch(setGlobalLoading(false));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 text-center p-6 bg-surface rounded shadow">
      {status === "verifying" && <p>Verifying your email...</p>}
      {status === "success" && (
        <p className="text-green-600 font-semibold">Email verified successfully! Redirecting...</p>
      )}
      {status === "error" && (
        <p className="text-red-500 font-semibold">Verification failed or invalid link.</p>
      )}
    </div>
  );
}
