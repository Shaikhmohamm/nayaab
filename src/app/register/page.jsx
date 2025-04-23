"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectItem } from "@/components/ui/select";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile must be 10 digits")
      .required("Mobile is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
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
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong. Try again."
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{
              fullName: "",
              email: "",
              mobile: "",
              password: "",
              repeatPassword: "",
              role: "", // Added role field
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="space-y-4">
                <div>
                  <Field as={Input} type="text" name="fullName" placeholder="Full Name" />
                  <ErrorMessage name="fullName" component="p" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <Field as={Input} type="email" name="email" placeholder="Email" />
                  <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <Field as={Input} type="text" name="mobile" placeholder="Mobile" />
                  <ErrorMessage name="mobile" component="p" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <Label htmlFor="role">Select Role</Label>
                  <Field as="select" name="role" className="w-full p-2 border rounded-md">
                    <option value="" label="Select role" />
                    <option value="user" label="User" />
                    <option value="admin" label="Admin" />
                  </Field>
                  <ErrorMessage name="role" component="p" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="relative">
                  <Field as={Input} type={showPassword ? "text" : "password"} name="password" placeholder="Password" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center text-gray-500">
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                  <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="relative">
                  <Field as={Input} type={showRepeatPassword ? "text" : "password"} name="repeatPassword" placeholder="Repeat Password" />
                  <button type="button" onClick={() => setShowRepeatPassword(!showRepeatPassword)} className="absolute inset-y-0 right-3 flex items-center text-gray-500">
                    {showRepeatPassword ? "🙈" : "👁️"}
                  </button>
                  <ErrorMessage name="repeatPassword" component="p" className="text-red-500 text-sm mt-1" />
                </div>

                <Button type="submit" className="w-full">Register</Button>
                <p className="text-center text-sm text-gray-600 mt-2">
                  Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login here</a>
                </p>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
