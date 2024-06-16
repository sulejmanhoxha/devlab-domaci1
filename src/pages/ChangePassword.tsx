import { Link } from "react-router-dom";

import ChangePasswordForm from "../components/ChangePasswordForm";

export default function ChangePasswordPage() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Change your password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <ChangePasswordForm />

          <Link
            className="block py-1.5 text-center text-sm font-semibold leading-6 text-indigo-600"
            to={"/"}
          >
            <span aria-hidden="true">&larr;</span> Go to homepage
          </Link>
        </div>
      </div>
    </>
  );
}
