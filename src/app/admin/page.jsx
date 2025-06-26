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
          router.push("/access-denied?reason=not-authorized");
        } else {
          setUser(userData);
        }
      } catch (error) {
        router.push("/access-denied?reason=session-expired");
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-base sm:text-lg font-semibold text-center">
          Checking credentials...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNav />
      <div className="flex flex-col items-center justify-center px-4 py-10 sm:py-20">
        <h2 className="text-xl sm:text-3xl font-bold text-center text-gray-800">
          Welcome to Admin Dashboard
        </h2>
        <p className="mt-2 text-center text-sm sm:text-base text-gray-600">
          You are logged in as: <span className="font-medium">{user?.email}</span>
        </p>
      </div>
    </div>
  );
};

export default AdminPage;
