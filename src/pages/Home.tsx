import { Link } from "react-router-dom";

import { useGlobalContext } from "../hooks/useGlobalContext";

export default function HomePage() {
  const { userQuery, tokenQuery, logout } = useGlobalContext();

  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Welcome Back
            </h1>

            {userQuery.isError ? (
              <p className="text-3xl text-red-600">Error fetching data</p>
            ) : (
              ""
            )}
            {userQuery.isPending ? (
              <p className="text-xl text-sky-500">Loading data...</p>
            ) : (
              ""
            )}

            {userQuery.isSuccess ? (
              <div className="mx-auto my-10">
                <img
                  className="mx-auto h-32 w-32 rounded-full"
                  src={userQuery.data.avatar}
                  alt="Profile picture"
                />
                <h2 className="mt-3 text-center text-2xl font-semibold">
                  {userQuery.data.name}
                </h2>
                <p className="mt-1 text-center text-gray-600">
                  {userQuery.data.role}
                </p>
              </div>
            ) : (
              ""
            )}

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                className="z-50 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                to="/login"
              >
                Try to login
              </Link>

              <button
                onClick={logout}
                className="z-50 rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Logout
              </button>
            </div>

            <div className="mt-10 space-y-4 rounded-md bg-[#192231] p-6 text-start">
              <p className="border-b border-slate-500 pb-4 font-semibold text-gray-300">
                Your credentials and id
              </p>

              {userQuery.isError ? (
                <p className="text-3xl text-red-600">Error fetching data</p>
              ) : (
                ""
              )}
              {userQuery.isPending ? (
                <p className="text-xl text-sky-500">Loading data...</p>
              ) : (
                ""
              )}

              {userQuery.isSuccess ? (
                <pre className="whitespace-pre-wrap break-words text-gray-50">
                  {JSON.stringify(
                    {
                      id: userQuery.data.id,
                      email: userQuery.data.email,
                      password: userQuery.data.password,
                    },
                    null,
                    4,
                  )}
                </pre>
              ) : (
                ""
              )}
            </div>

            <div className="mt-10 space-y-4 rounded-md bg-[#192231] p-6 text-start">
              <p className="border-b border-slate-500 pb-4 font-semibold text-gray-300">
                Auth tokens
              </p>

              {tokenQuery.isError ? (
                <p className="text-3xl text-red-600">Error fetching data</p>
              ) : (
                ""
              )}
              {tokenQuery.isPending ? (
                <p className="text-xl text-sky-500">Loading data...</p>
              ) : (
                ""
              )}

              {tokenQuery.isSuccess ? (
                <pre className="whitespace-pre-wrap break-words text-gray-50">
                  {JSON.stringify(
                    {
                      access_token: tokenQuery.data.access_token,
                      refresh_token: tokenQuery.data.refresh_token,
                    },
                    null,
                    4,
                  )}
                </pre>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
