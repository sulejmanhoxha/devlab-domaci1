import { Link } from "react-router-dom";

import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <LoginForm />

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
