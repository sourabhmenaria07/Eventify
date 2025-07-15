import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Logo from "../components/ui/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authService from "../appwrite/auth";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (authStatus === "loggedIn") {
      navigate("/");
    }
  }, [authStatus, navigate]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData?.emailVerification) {
          dispatch(login({ userData }));
          navigate("/dashboard");
        } else {
          alert("Please verify your email before logging in.");
        }
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="flex items-center bg-surface justify-center px-4 py-4"> ---#2B3A67
    <div className="w-full mx-auto max-w-md mt-10 bg-blue-200 dark:bg-[#19264c] py-6 px-4 rounded-xl shadow-xl ">
      <div className="mb-2 flex justify-center">
        <span className="inline-block w-full max-w-[150px]">
          <Logo width="120px" />
        </span>
      </div>
      <h2 className="text-body font-bold text-2xl text-center leading-tight">
        Sign in to Your Account
      </h2>

      {/* {error && <p className="text-red-600 mt-8 text-center">{error}</p>} */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <div className="space-y-5">
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
          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            {...register("password", {
              required: true,
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">Password is required</p>
          )}
          {/* <div className="flex justify-center mt-8"> */}
          <Button type="Submit" className="w-full mt-4" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </Button>
          {/* </div> */}
          <p className="text-right text-sm mt-1">
            <Link
              to="/forgot-password"
              className="text-gray-700 dark:text-gray-400 hover:underline"
            >
              Forgot password?
            </Link>
          </p>
          <p className="mt-2 text-body text-base text-center">
            Don't have an account?&nbsp;
            <Link
              to="/signup"
              className="text-fuchsia-700 dark:text-fuchsia-300 hover:text-fuchsia-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
    // </div>
  );
}

export default Login;
