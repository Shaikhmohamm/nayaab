"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/login`,
        values,
        { withCredentials: true }
      );

      const { message, user } = response.data;

      toast.success(message || "Login successful! 🎉");

      setTimeout(() => {
        if (user.role === "admin" && user.auth === true) {
          router.push("/admin");
        } else if (user.role === "admin" && user.auth === false) {
          router.push("/access-denied");
        } else {
          router.push("/");
        }
      }, 1500);

      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-sm sm:max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-800 mb-6">Login</h2>

        <Toaster position="top-center" reverseOrder={false} />

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4 sm:space-y-5">
              {/* Email */}
              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email address"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email && touched.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <ErrorMessage name="email" component="div" className="text-sm text-red-600 mt-1" />
              </div>

              {/* Password */}
              <div className="relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.password && touched.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 text-lg"
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
                <ErrorMessage name="password" component="div" className="text-sm text-red-600 mt-1" />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-300 shadow-sm"
              >
                Login
              </button>

              {/* Register Link */}
              <p className="text-center text-sm text-gray-600 mt-2">
                Don&apos;t have an account?{" "}
                <a href="/register" className="text-blue-600 hover:underline font-medium">
                  Register here
                </a>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
