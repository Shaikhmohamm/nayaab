"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiSearch, FiUser, FiLogOut, FiMenu } from "react-icons/fi";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import logo from "../../public/logo.jpg";

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  // Fetch user details on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/me`, {
          withCredentials: true,
        });
        console.log(response.data)
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/logout`, { withCredentials: true });
      setUser(null);
      toast.success("Logged out successfully!");
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed! Please try again.");
    }
  };

  return (
    <nav className="hidden md:block sw-full border-b border-gray-400 rounded-full mx-8 my-5 p-2 bg-gray-300">
      <div className="flex items-center justify-between px-6 py-1 md:px-10">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src={logo}
            alt="Nayaab Enterprises Logo"
            width={40}
            height={40}
            className="mr-4 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
          />
          <p className="text-lg font-extrabold font-serif text-gray-800 tracking-wide hover:text-yellow-500 transition-colors duration-300">
            Nayaab
          </p>
        </div>

        <ul className={`absolute md:static left-0 top-16 w-full md:w-auto md:flex space-x-6 md:space-x-6 ${menuOpen ? "block" : "hidden"}`}>
          {["Home", "About", "Product"].map((item, index) => (
            <li key={index} className="border-b md:border-none">
              <Link
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="font-serif block px-6 py-1 text-md font-medium transition-all duration-300 rounded-md"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>

        {/* Search & User Authentication */}
        <div className="hidden md:flex space-x-6 items-center">
          <button className="text-2xl p-2 rounded-lg hover:text-white transition">
            <FiSearch />
          </button>

          {!loading && user && (
            <div className="flex items-center space-x-4">
              <span className="text-lg font-medium">Welcome, {user.fullName}!</span>
              <button
                onClick={handleLogout}
                className="text-2xl p-2 rounded-lg hover:text-white transition"
              >
                <FiLogOut />
              </button>
            </div>
          )}

          {!loading && !user && (
            <Link href="/register">
              <button className="text-2xl p-2 rounded-lg hover:text-white transition">
                <FiUser />
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Toast Notifications */}
      <Toaster position="top-center" reverseOrder={false} />
    </nav>
  );
};

export default NavBar;
