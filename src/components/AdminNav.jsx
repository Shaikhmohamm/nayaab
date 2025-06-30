"use client";
import { Button } from "@/components/ui/button";
import { PlusCircle, List, LogOut } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AdminNav = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/logout`, {
        withCredentials: true,
      });
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="w-full bg-gray-900 text-white py-3 px-4 shadow-md">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        {/* Admin Dashboard Title */}
        <h1 className="text-lg sm:text-xl font-semibold text-center sm:text-left">
          Admin Dashboard
        </h1>

        {/* Button Group */}
        <div className="flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-4">
          <Button
            onClick={() => router.push("/admin/add-product")}
            className="bg-blue-500 hover:bg-blue-600 text-sm px-3 py-1.5 rounded-md flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" /> Add
          </Button>

          <Button
            onClick={() => router.push("/admin/update-products")}
            className="bg-gray-700 hover:bg-gray-800 text-sm px-3 py-1.5 rounded-md flex items-center gap-2"
          >
            <List className="w-4 h-4" /> Update
          </Button>

          <Button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-sm px-3 py-1.5 rounded-md flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;
