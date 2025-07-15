import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Logo from "../components/ui/Logo";

function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const newUser = await authService.createAccount(data);
      if (newUser) {
        alert("Account created! Please check your email to verify.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-6 bg-blue-200 dark:bg-[#19264c] shadow-lg rounded-xl">
      <div className="mb-2 flex justify-center">
        <span className="inline-block w-full max-w-[150px]">
          <Logo width="120px" />
        </span>
      </div>
      <h2 className="text-2xl font-bold mb-6 text-center text-body leading-tight">
        {" "}
        Create Account{" "}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Name"
          type="text"
          placeholder="Your full name"
          {...register("name", { required: true })}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">Name is required</p>
        )}
        <Input
          label="Email"
          placeholder="Enter your email"
          type="email"
          {...register("email", {
            required: true,
            validate: {
              matchPattern: (value) =>
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                  value
                ) || "Email must be valid email address",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">Email is required</p>
        )}
        <div className="relative">
          <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
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
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
        <Button type="submit" className="w-full mt-4" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
        <p className="mt-2 text-body text-base text-center">
          Already have an account?&nbsp;
          <Link
            to="/signup"
            className="text-fuchsia-700 dark:text-fuchsia-300 hover:text-fuchsia-500"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
