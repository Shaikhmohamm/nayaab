// app/access-denied/page.js

"use client";

import { useRouter } from "next/navigation";
import { FiLock } from "react-icons/fi";

export default function AccessDenied() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-800">
      <FiLock className="text-6xl mb-4" />
      <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
      <p className="text-lg mb-6">You don't have permission to view this page.</p>
      <button
        onClick={() => router.push("/")}
        className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-700 transition duration-300"
      >
        Go to Home
      </button>
    </div>
  );
}
