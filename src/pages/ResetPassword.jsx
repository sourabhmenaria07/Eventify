import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import authService from "../appwrite/auth";
import { Eye, EyeOff } from "lucide-react";
import {Input, Button} from "../components/ui/ui";

function ResetPassword() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const password = watch("password");

  const onSubmit = async ({ password }) => {
    setLoading(true);
    try {
      const userId = params.get("userId");
      const secret = params.get("secret");

      if (!userId || !secret) {
        setMessage("Invalid reset link.");
        return;
      }

      await authService.confirmPasswordReset({ userId, secret, password });
      setMessage("Password reset successful. Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage("Reset failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-blue-200 dark:bg-[#19264c] py-6 px-4 rounded-xl shadow-lg">
      <h2 className="text-body font-bold text-2xl text-center leading-tight">Reset Password</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-8">
        {/* Password */}
        <div className="relative">
          <Input
            label="New Password"
            type={showPassword ? "text" : "password"}
            className="w-full px-3 py-2 border rounded pr-10"
            {...register("password", { required: true, minLength: 6 })}
          />
          <span
            className="absolute right-4 top-10 cursor-pointer text-gray-500"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
          {errors.password && (
            <p className="text-red-500 text-sm">
              Password must be at least 6 characters
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <Input
            label="Confirm New Password"
            type="password"
            className="w-full px-3 py-2 border rounded"
            {...register("confirmPassword", {
              required: true,
              validate: (value) => value === password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full mt-4"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </Button>

        {message && <p className="text-sm text-center mt-3">{message}</p>}
      </form>
    </div>
  );
}

export default ResetPassword;
