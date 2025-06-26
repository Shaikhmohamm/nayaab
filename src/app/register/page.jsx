"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const router = useRouter();

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile must be 10 digits")
      .required("Mobile is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Repeat password is required"),
    role: Yup.string().required("Role is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/register`, values);
      toast.success("Registration successful! 🎉");
      resetForm();
      setTimeout(() => router.push("/login"), 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-sm sm:max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-800 mb-6">Register</h2>

        <Toaster position="top-center" reverseOrder={false} />

        <Formik
          initialValues={{
            fullName: "",
            email: "",
            mobile: "",
            password: "",
            repeatPassword: "",
            role: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4 sm:space-y-5">
              {/* Full Name */}
              <div>
                <Field
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.fullName && touched.fullName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <ErrorMessage name="fullName" component="div" className="text-sm text-red-600 mt-1" />
              </div>

              {/* Email */}
              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email && touched.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <ErrorMessage name="email" component="div" className="text-sm text-red-600 mt-1" />
              </div>

              {/* Mobile */}
              <div>
                <Field
                  type="text"
                  name="mobile"
                  placeholder="Mobile Number"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.mobile && touched.mobile ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <ErrorMessage name="mobile" component="div" className="text-sm text-red-600 mt-1" />
              </div>

              {/* Role */}
              <div>
                <Field
                  as="select"
                  name="role"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.role && touched.role ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Role</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </Field>
                <ErrorMessage name="role" component="div" className="text-sm text-red-600 mt-1" />
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

              {/* Repeat Password */}
              <div className="relative">
                <Field
                  type={showRepeatPassword ? "text" : "password"}
                  name="repeatPassword"
                  placeholder="Repeat Password"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.repeatPassword && touched.repeatPassword ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <span
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 text-lg"
                >
                  {showRepeatPassword ? "🙈" : "👁️"}
                </span>
                <ErrorMessage name="repeatPassword" component="div" className="text-sm text-red-600 mt-1" />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-300 shadow-sm"
              >
                Register
              </button>

              {/* Login Link */}
              <p className="text-center text-sm text-gray-600 mt-2">
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 hover:underline font-medium">
                  Login here
                </a>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
