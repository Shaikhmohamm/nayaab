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
      console.log(user)

      setTimeout(() => {
        // Redirect based on role
        if (user.role === "admin" && user.auth === true) {
          router.push("/admin");
        } 
        else if (user.role === "admin" && user.auth === false) {
          router.push("/access-denied")
        }
        else if (user.role === "user") {
          router.push("/");
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <Toaster position="top-center" reverseOrder={false} />

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                    errors.email && touched.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                    errors.password && touched.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
                <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200">
                Login
              </button>

              <p className="text-center text-sm text-gray-600 mt-2">
                Don't have an account?{" "}
                <a href="/register" className="text-blue-600 hover:underline">
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
