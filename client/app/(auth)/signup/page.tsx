"use client";

import { useAuthContext } from "@/context/AuthProvider";
import { registerUser } from "@/features/auth";
import { getUserFromLocalStorage } from "@/utils/handleLocalStorage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const initialState = {
  name: "",
  email: "",
  pass: "",
  confirmPass: "",
};
type formDataType = typeof initialState;
const SignUpPage = () => {
  const [formData, setFormData] = useState<formDataType>(initialState);
  const { name, email, pass, confirmPass } = formData;

  const router = useRouter();
  const { user, setUser } = useAuthContext();

  if (user.isLoggedIn === true) {
    router.push("/");
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !pass || !confirmPass) {
      toast.error("All fields are required");
      return;
    }

    if (pass !== confirmPass) {
      toast.error("Passwords do not match");
      return;
    }
    if (pass.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    const data = await registerUser({ name, email, password: pass });
    if (data !== false) {
      setFormData(initialState);
      // get data from local storage and add isLoggedin filed to it then set it to the user context
      setUser({ ...getUserFromLocalStorage(), isLoggedIn: true });
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center py-10">
      <div className="bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-10 w-auto"
            src="https://www.svgrepo.com/show/301692/login.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Create a new account
          </h2>
          <p className="mt-2 text-center text-sm leading-5 text-blue-500 max-w">
            <span className="mr-1">Or</span>
            <Link
              href="/login"
              className="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              already have an account?
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Full Name
                </label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input
                    id="fullname"
                    name="fullname"
                    type="text"
                    placeholder="John Doe"
                    required
                    className="text-black appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    value={name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="mt-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-5  text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="email"
                    name="email"
                    placeholder="user@example.com"
                    type="email"
                    required
                    className="text-black appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    value={email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  {/* <div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div> */}
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="********"
                    required
                    className="text-black appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    value={pass}
                    onChange={(e) =>
                      setFormData({ ...formData, pass: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="confirm_password"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input
                    id="confirm_password"
                    name="confirmPassword"
                    type="password"
                    placeholder="********"
                    required
                    className="text-black appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    value={confirmPass}
                    onChange={(e) =>
                      setFormData({ ...formData, confirmPass: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-btnBgColor3 bg-indigo-700 focus:outline-none focus:bg-btnBgColor3 focus:shadow-outline-indigo active:bg-indigo-800 transition duration-150 ease-in-out"
                  >
                    Sign in
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
