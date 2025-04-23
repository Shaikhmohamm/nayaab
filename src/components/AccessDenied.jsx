// components/AccessDenied.js
import Link from "next/link";

const AccessDenied = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
      <p className="text-lg text-gray-700 mb-6">
        You must be logged in with proper privileges to view this page.
      </p>
      <Link href="/login">
        <button className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition">
          Go to Login
        </button>
      </Link>
    </div>
  );
};

export default AccessDenied;
