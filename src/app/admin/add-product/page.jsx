"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AdminNav from "@/components/AdminNav";
import { useState } from "react";

const AddProductPage = () => {
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            price: "",
            category: "",
            images: "",
            stock: 10,
            isFeatured: false,
            discount: 0
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Product name is required"),
            description: Yup.string().required("Description is required"),
            price: Yup.number().positive().required("Price is required"),
            category: Yup.string().required("Category is required"),
            images: Yup.string().url("Enter valid image URL(s)").required("At least one image URL is required"),
            stock: Yup.number().min(1, "Stock must be at least 1").required("Stock is required"),
            discount: Yup.number().min(0, "Discount must be 0 or more").max(100, "Discount can't exceed 100")
        }),
        onSubmit: async (values, { resetForm }) => {
            setLoading(true);
            try {
                const formattedData = {
                    ...values,
                    images: values.images.split(",").map(img => img.trim()), // Convert string to array
                    price: Number(values.price),
                    stock: Number(values.stock),
                    discount: Number(values.discount),
                    isFeatured: values.isFeatured === "true" // Convert to boolean
                };

                await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/add`, formattedData, { withCredentials: true });
                alert("Product added successfully!");
                resetForm();
            } catch (error) {
                console.error("Error adding product:", error);
                alert("Failed to add product. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    });

    return (
        <div className="min-h-screen bg-gray-100">
            <AdminNav />
            <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg">
                <h2 className="text-xl font-bold mb-4">Add Product</h2>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <Input type="text" name="name" placeholder="Product Name" {...formik.getFieldProps("name")} />
                    <Textarea name="description" placeholder="Description" {...formik.getFieldProps("description")} />
                    <Input type="number" name="price" placeholder="Price" {...formik.getFieldProps("price")} />
                    <Input type="text" name="category" placeholder="Category" {...formik.getFieldProps("category")} />
                    <Input type="text" name="images" placeholder="Image URLs (comma-separated)" {...formik.getFieldProps("images")} />
                    <Input type="number" name="stock" placeholder="Stock Quantity" {...formik.getFieldProps("stock")} />
                    <Input type="number" name="discount" placeholder="Discount (%)" {...formik.getFieldProps("discount")} />
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium">Is Featured?</label>
                        <select
                            name="isFeatured"
                            {...formik.getFieldProps("isFeatured")}
                            className="border p-2 rounded-md"
                        >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </div>
                    <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white" disabled={loading}>
                        {loading ? "Adding..." : "Add Product"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AddProductPage;
