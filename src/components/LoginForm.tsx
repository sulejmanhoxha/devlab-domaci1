import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import { useGlobalContext } from "../hooks/useGlobalContext";
import { login } from "../lib/api";

const loginSchema = z
  .object({
    email: z
      .string()
      .email("This is not an email address.")
      .min(10, "The email must be at least 10 characters long.")
      .trim(),
    password: z
      .string()
      .min(5, "The password must be at least 5 characters long.")
      .trim(),
  })
  .required();
export type LoginSchemaType = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const navigate = useNavigate();

  const { setRefreshToken } = useGlobalContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationKey: ["token"],
    mutationFn: (data: LoginSchemaType) => login(data),
    onError: (error) => {
      toast.error(`Login failed. ${error?.toString()}. Incorrect credentials.`);
    },
    onSuccess: (data) => {
      navigate("/");
      setRefreshToken(data.refresh_token);
      toast.success("Login was successful.");
    },
  });

  const onSubmit = (data: LoginSchemaType) => {
    loginMutation.mutate(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("email")}
            />
            <p className="mt-1 text-sm text-red-500">{errors.email?.message}</p>
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
          <div className="mt-2">
            <input
              type="password"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("password")}
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.password?.message}
            </p>
          </div>
        </div>

        <div>
          <button
            disabled={isSubmitting}
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isSubmitting ? "Loading..." : "Login"}
          </button>
        </div>
      </form>
    </>
  );
}
