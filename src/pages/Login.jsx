import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Logo from "../components/ui/Logo";
import { Link } from "react-router-dom";

function Login() {
  const [error, setError] = useState();
  const { register, handleSubmit } = useForm();

  const onSubmit = () => {};
  return (
    <div className="flex items-center bg-surface justify-center px-4 py-4">
      <div className="w-full mx-auto max-w-lg bg-blue-200 dark:bg-[#2B3A67] py-6 px-4 rounded-xl my-3 ">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[150px]">
            <Logo width="120px" />
          </span>
        </div>
        <h2 className="text-body font-bold text-2xl text-center leading-tight">
          Sign in to Your Account
        </h2>
        <p className="mt-2 text-body text-base text-center">
          Don't have an account&nbsp;
          {/* <Link 
                to='/signup'
                className=""
                >
                Sign up
                </Link> */}
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="email"
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
            <Input
              label="password"
              placeholder="Enter your password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            <div className="flex justify-center mt-8">
              <Button type="Submit" className="w-full max-w-sm">
                Sign in
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
