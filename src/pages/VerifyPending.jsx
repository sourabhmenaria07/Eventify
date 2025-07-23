import { useEffect, useState } from "react";
import authService from "../appwrite/auth";

export default function VerifyPending() {
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);

  const resendVerification = async () => {
    if (cooldown > 0) return;

    const email = window.localStorage.getItem("resendEmail");
    const password = window.localStorage.getItem("resendPassword");

    if (!email || !password) {
      setMessage("Missing email/password for resending verification.");
      return;
    }

    setResending(true);
    try {
      await authService.sendVerificationEmail({ email, password });
      setMessage("Verification email sent again. Check your inbox.");
      localStorage.removeItem("resendEmail");
      localStorage.removeItem("resendPassword");
      setCooldown(30); // 30 second cooldown
    } catch (err) {
      //   setMessage("Failed to resend verification email.");
      setMessage(
        err?.message?.includes("Rate limit")
          ? "You're requesting too fast. Try again in a moment."
          : "Failed to resend verification email."
      );
    } finally {
      setResending(false);
    }
  };

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  return (
    <div className="max-w-md mx-auto text-center mt-20 p-6 bg-surface rounded shadow">
      <h2 className="text-xl font-semibold text-red-500">Email Not Verified</h2>
      <p className="text-body mt-2">
        Please verify your email to access Eventify.
      </p>
      <button
        onClick={resendVerification}
        disabled={resending || cooldown > 0}
        className="mt-4 px-6 py-2 rounded bg-primary text-white"
      >
        {/* {resending ? "Sending..." : "Resend Email"} */}
        {resending
          ? "Sending..."
          : `Resend${cooldown > 0 ? ` (${cooldown}s)` : ""}`}
      </button>
      {message && <p className="mt-4 text-sm text-body">{message}</p>}
    </div>
  );
}
