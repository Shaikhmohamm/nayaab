"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AdminNav from "@/components/AdminNav";
import { useRef, useState } from "react";

const AddProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFileNames, setSelectedFileNames] = useState([]);
  const fileInputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      images: [],
      stock: 10,
      isFeatured: false,
      discount: 0,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Product name is required"),
      description: Yup.string().required("Description is required"),
      price: Yup.number().positive("Price must be positive").required("Price is required"),
      category: Yup.string().required("Category is required"),
      images: Yup.array().min(1, "Please upload at least one image"),
      stock: Yup.number().min(1, "Stock must be at least 1").required("Stock is required"),
      discount: Yup.number().min(0, "Discount must be 0 or more").max(100, "Discount can't exceed 100"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const formattedData = {
          ...values,
          price: Number(values.price),
          stock: Number(values.stock),
          discount: Number(values.discount),
          isFeatured: values.isFeatured === "true",
        };

        await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/add`, formattedData, {
          withCredentials: true,
        });

        alert("Product added successfully!");
        resetForm();
        setSelectedFileNames([]);
        if (fileInputRef.current) fileInputRef.current.value = null;
      } catch (error) {
        console.error("Error adding product:", error);
        alert("Failed to add product. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleFileChange = async (e) => {
    const files = e.target.files;
    const urls = [...formik.values.images];
    const names = [];

    if (!files.length) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      for (const file of files) {
        names.push(file.name);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "nayaab_img");

        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/dwz1yinjo/image/upload`,
          formData,
          {
            onUploadProgress: (event) => {
              const progress = Math.round((event.loaded * 100) / event.total);
              setUploadProgress(progress);
            },
          }
        );

        urls.push(res.data.secure_url);
      }

      formik.setFieldValue("images", urls);
      setSelectedFileNames(names);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Image upload failed");
    } finally {
      setUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = null;
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    const updatedImages = formik.values.images.filter((_, index) => index !== indexToRemove);
    formik.setFieldValue("images", updatedImages);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNav />
      <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4">Add Product</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <Input type="text" name="name" placeholder="Product Name" {...formik.getFieldProps("name")} />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            )}
          </div>

          <div>
            <Textarea name="description" placeholder="Description" {...formik.getFieldProps("description")} />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500 text-sm">{formik.errors.description}</div>
            )}
          </div>

          <div>
            <Input type="number" name="price" placeholder="Price" {...formik.getFieldProps("price")} />
            {formik.touched.price && formik.errors.price && (
              <div className="text-red-500 text-sm">{formik.errors.price}</div>
            )}
          </div>

          <div>
            <Input type="text" name="category" placeholder="Category" {...formik.getFieldProps("category")} />
            {formik.touched.category && formik.errors.category && (
              <div className="text-red-500 text-sm">{formik.errors.category}</div>
            )}
          </div>

          <div>
          <label
  htmlFor="imageFile"
  className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer"
>
  📤 Choose Images
</label>
            <input
              id="imageFile"
              type="file"
              name="imageFile"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              className="hidden"
            />
            <p className="text-xs text-gray-500 mt-1">You can upload multiple images (JPEG, PNG, etc.)</p>

            {selectedFileNames.length > 0 && (
              <ul className="mt-2 text-sm text-gray-700 space-y-1">
                {selectedFileNames.map((name, index) => (
                  <li key={index}>📄 {name}</li>
                ))}
              </ul>
            )}

            {uploading && (
              <div className="mt-3 w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-blue-500 h-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}

            {formik.touched.images && formik.errors.images && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.images}</div>
            )}

            {formik.values.images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                {formik.values.images.map((url, index) => (
                  <div key={index} className="relative group border rounded overflow-hidden">
                    <img
                      src={url}
                      alt={`Uploaded ${index}`}
                      className="w-full h-32 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded hover:bg-red-700 transition"
                    >
                      ✕
                    </button>
                    <span className="absolute bottom-1 left-1 text-xs bg-black bg-opacity-60 text-white px-1.5 py-0.5 rounded">
                      #{index + 1}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <Input type="number" name="stock" placeholder="Stock Quantity" {...formik.getFieldProps("stock")} />
            {formik.touched.stock && formik.errors.stock && (
              <div className="text-red-500 text-sm">{formik.errors.stock}</div>
            )}
          </div>

          <div>
            <Input type="number" name="discount" placeholder="Discount (%)" {...formik.getFieldProps("discount")} />
            {formik.touched.discount && formik.errors.discount && (
              <div className="text-red-500 text-sm">{formik.errors.discount}</div>
            )}
          </div>

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

          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Product"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
