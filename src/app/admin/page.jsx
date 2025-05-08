"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminNav from "@/components/AdminNav";
import axios from "axios";

const AdminPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/me`, {
          withCredentials: true,
        });
        const userData = res.data.user;

        if (!userData || !userData.isAdmin) {
          // 👉 redirect to /access-denied if not admin
          router.push("/access-denied?reason=not-authorized");
        } else {
          setUser(userData);
        }
      } catch (error) {
        // 👉 redirect if API call fails (unauthorized or error)
        router.push("/access-denied?reason=session-expired");
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg font-semibold">Checking credentials...</p>
      </div>
    );
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
