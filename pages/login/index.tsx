import { ElementRef, ReactNode, useCallback, useRef, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

import bcrypt from "bcryptjs";
import { login, signup } from "@/api/auth";
import { email_regex } from "@/utils/pattern";

type Variant = "LOGIN" | "REGISTER";

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const formRef = useRef<ElementRef<"form">>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>();

  const toggleVariant = useCallback(() => {
    // errors.username = undefined;
    // errors.email = undefined;
    // errors.password = undefined;
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    if (variant === "LOGIN") {
      try {
        const result = await login("/login", data);
        formRef.current?.reset();
        console.log(result);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (variant === "REGISTER") {
      try {
        const hasedPassword = await bcrypt.hash(data.password, 10);
        await signup("/users", {
          username: data.username,
          email: data.email,
          password: hasedPassword,
        });
        formRef.current?.reset();
        setVariant("LOGIN");
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-24 bg-[url('/images/background.jpg')]">
      <div className="flex flex-col justify-center items-center gap-20 rounded bg-black/70 px-16 py-12 h-[60%] max-w-xl">
        <h3 className="text-white text-[2rem] font-bold">
          {variant === "LOGIN" ? "Sign In" : "Sign Up"}
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          ref={formRef}
          className="w-full flex flex-col gap-5"
        >
          {variant === "REGISTER" && (
            <div className="form-group">
              <input
                type="username"
                id="username"
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Username must be at most 50 characters",
                  },
                })}
                className={`w-full my-2 p-6 h-16 rounded-lg ring-1 ring-inset focus:ring-2 focus:ring-inset${
                  errors.username ? "focus:ring-red-500" : " "
                }}`}
                placeholder="Enter your username"
              />
              {errors.username && (
                <span className="text-xl text-red-500">
                  {errors.username.message as ReactNode}
                </span>
              )}
            </div>
          )}

          <div className="form-group">
            <input
              type="text"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: email_regex,
                  message: "Please enter a valid email address",
                },
              })}
              className={`w-full my-2 p-6 h-16 rounded-lg ring-1 ring-inset focus:ring-2 focus:ring-inset${
                errors.email ? "focus:ring-red-500" : " "
              }}`}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <span className="text-base text-red-500">
                {errors.email.message as ReactNode}
              </span>
            )}
          </div>

          <div className="form-group">
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[0-9a-zA-Z]{8,}$/,
                  message:
                    "Password must contain at least one upper case, lower case letter, one number, and be at least 8 characters long",
                },
              })}
              className={`w-full my-2 p-6 h-16 rounded-lg ring-1 ring-inset focus:ring-2 focus:ring-inset${
                errors.password ? "focus:ring-red-500" : " "
              }}`}
              placeholder="Enter your password address"
            />
            <span className="text-base text-red-500">
              {errors.password && (errors.password.message as ReactNode)}
            </span>
          </div>

          {variant === "REGISTER" && (
            <div className="form-group">
              <input
                type="password"
                id="re-password"
                {...register("rePassword", {
                  required: "Confim password is required",
                  validate: (value) =>
                    value === watch("password") ||
                    "Confirm password do not match",
                })}
                className={`w-full my-2 p-6 h-16 rounded-lg ring-1 ring-inset focus:ring-2 focus:ring-inset${
                  errors.rePassword ? "focus:ring-red-500" : " "
                }}`}
                placeholder="Enter your rePassword address"
              />
              {errors.rePassword && (
                <span className="text-xl text-red-500">
                  {errors.rePassword.message as ReactNode}
                </span>
              )}
            </div>
          )}

          <div className="form-submit">
            <button
              disabled={isLoading}
              className="w-full flex justify-center items-center my-2 p-6 h-16 rounded-lg bg-red-600 text-white font-medium"
            >
              {variant === "LOGIN" ? "Sign In" : "Register"}
            </button>
          </div>
        </form>
        <div className="flex items-center gap-[5px] text-white">
          {" "}
          <p>
            {variant === "LOGIN"
              ? "New to Wimovie ?"
              : "Already have an account?"}
          </p>
          <div onClick={toggleVariant} className="cursor-pointer">
            <strong>
              {variant === "LOGIN" ? "Create an account" : "Login"}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
