import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import { useGlobalContext } from "../context/GlobalContext";
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
  const { setRefreshToken, setAccessToken } = useGlobalContext();
  const navigate = useNavigate(); // Initialize useNavigate
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = async (data: LoginSchemaType) => {
    try {
      const userAuthTokens = await login(data);

      const refreshToken = userAuthTokens.refresh_token;
      const access = userAuthTokens.access_token;
      setRefreshToken(refreshToken);
      setAccessToken(access);
      navigate("/");
      toast.success("Login was successful.");
    } catch (error) {
      toast.error(`Login failed. ${error?.toString()}. Incorrect credentials.`);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
                <p className="mt-1 text-sm text-red-500">
                  {errors.email?.message}
                </p>
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
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>
          <Link
            className="block py-1.5 text-center text-sm font-semibold leading-6 text-indigo-600"
            to={"/"}
          >
            <span aria-hidden="true">&larr;</span> Go to homepage
          </Link>

          <div>
            <p className="mt-10 text-sm italic leading-6 tracking-wide text-gray-600">
              Experiment with different values in the inputs to see how the
              validation messages respond. To successfully log in, your email
              and password must match the following example.
            </p>
            <pre className="mt-2 whitespace-pre-wrap break-words rounded-md bg-[#192231] p-6 text-start text-gray-50">
              {JSON.stringify(
                {
                  email: "john@mail.com",
                  password: "changeme",
                },
                null,
                4,
              )}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
}
