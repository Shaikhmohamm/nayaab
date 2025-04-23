"use client";
import { Button } from "@/components/ui/button";
import { PlusCircle, List, LogOut } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AdminNav = ({ navigate }) => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/logout`, { withCredentials: true });
            router.push("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <nav className="w-full bg-gray-900 text-white py-4 px-6 flex justify-between items-center shadow-lg">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <div className="flex gap-4">
                <Button onClick={() => navigate("/admin/add-product")} className="bg-blue-500 hover:bg-blue-600 flex items-center gap-2 px-4 py-2 rounded-md">
                    <PlusCircle className="w-5 h-5" /> Add Product
                </Button>
                <Button onClick={() => navigate("/admin/update-products")} className="bg-gray-700 hover:bg-gray-800 flex items-center gap-2 px-4 py-2 rounded-md">
                    <List className="w-5 h-5" /> Update Products
                </Button>
                <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2 px-4 py-2 rounded-md">
                    <LogOut className="w-5 h-5" /> Logout
                </Button>
            </div>
        </nav>
    );
};

export default AdminNav;
