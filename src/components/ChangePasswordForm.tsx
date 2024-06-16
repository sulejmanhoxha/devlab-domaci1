import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

const loginSchema = z
  .object({
    currentPassword: z
      .string()
      .min(5, "The password must be at least 5 characters long.")
      .max(10, "The password must be a maximum of 10 characters long.")
      .trim(),
    newPassword: z
      .string()
      .min(5, "The password must be at least 5 characters long.")
      .max(10, "The password must be a maximum of 10 characters long.")
      .trim(),
    confirmPassword: z
      .string()
      .min(5, "The password must be at least 5 characters long.")
      .max(10, "The password must be a maximum of 10 characters long.")
      .trim(),
  })
  .required()
  .refine((data) => data.confirmPassword === data.newPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type LoginSchemaType = z.infer<typeof loginSchema>;

export default function ChangePasswordForm() {
  const navigate = useNavigate(); // Initialize useNavigate
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      confirmPassword: "",
      newPassword: "",
      currentPassword: "",
    },
  });
  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      navigate("/");
      toast.success("Password was changed successful.");
    } catch (error) {
      toast.error(
        `Password change failed. ${error?.toString()}. Incorrect credentials.`,
      );
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Current password
          </label>
          <div className="mt-2">
            <input
              type="password"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("currentPassword")}
            />
            <p className="mt-1 text-sm text-red-500">
              {errors.currentPassword?.message}
            </p>
          </div>
        </div>

        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            New password
          </label>
          <div className="mt-2">
            <input
              type="password"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("newPassword")}
            />
            <p className="mt-1 text-sm text-red-500">
              {errors.newPassword?.message}
            </p>
          </div>
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Confirm password
          </label>
          <div className="mt-2">
            <input
              type="password"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("confirmPassword")}
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword?.message}
            </p>
          </div>
        </div>

        <div>
          <button
            disabled={isSubmitting}
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isSubmitting ? "Loading..." : "Change Password"}
          </button>
        </div>
      </form>
    </>
  );
}
