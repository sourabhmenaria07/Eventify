import { useForm } from "react-hook-form";
import { useState } from "react";
import authService from "../appwrite/auth";
import {Input, Button} from "../components/ui/ui";

function ForgotPassword() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async ({ email }) => {
    setLoading(true);
    setMessage("");
    try {
      await authService.sendPasswordReset(email);
      setMessage("Check your email for a password reset link.");
    } catch (error) {
      setMessage("Failed to send reset link. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 bg-blue-200 dark:bg-[#19264c] py-6 px-4 rounded-xl shadow-xl">
      <h2 className="text-body font-bold text-2xl text-center leading-tight">
        Forgot Password
      </h2>
      <p className="text-body border-1 border-orange-500 bg-[#fff1e9] dark:bg-[#586793] p-4 my-6 rounded-lg">
        Forgotten your password? Enter your e-mail address below, and we'll send
        you an e-mail allowing you to reset it.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-8">
        <div>
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />
        </div>
        <Button type="submit" className="w-full mt-4" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
        {message && <p className="text-sm text-center mt-3">{message}</p>}
      </form>
    </div>
  );
}

export default ForgotPassword;
