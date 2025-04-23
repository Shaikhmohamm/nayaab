"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminNav from "@/components/AdminNav";
import AccessDenied from "@/components/AccessDenied";
import axios from "axios";

const AdminPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/me`, {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg font-semibold">Checking credentials...</p>
      </div>
    );
  }

  // If no user or user is not admin, show AccessDenied page
  if (!user || !user.isAdmin) {
    return <AccessDenied />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNav />
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-2xl font-bold">Welcome to Admin Dashboard</h2>
      </div>
    </div>
  );
};

export default AdminPage;
