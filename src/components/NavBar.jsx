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
    <nav className="hidden md:block sw-full bg-black text-white shadow-lg">
      <div className="flex items-center justify-between px-6 py-1 md:px-10">
        {/* Logo */}
        <div className="flex items-center">
          <Image src={logo} alt="Nayaab Enterprises Logo" width={30} height={50} className="mr-4" />
        </div>

        {/* Mobile Menu Button */}
        {/* <button 
          className="md:hidden text-2xl p-1" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FiMenu />
        </button> */}

        {/* Navigation Links */}
        <ul className={`absolute md:static left-0 top-16 w-full md:w-auto bg-gray-900 md:bg-transparent md:flex space-x-6 md:space-x-6 ${menuOpen ? "block" : "hidden"}`}>
          {["Home", "About", "Product"].map((item, index) => (
            <li key={index} className="border-b md:border-none">
              <Link 
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="block px-6 py-1 text-md font-medium text-white transition-all duration-300 ease-in-out rounded-lg hover:bg-gray-800 md:hover:bg-transparent md:hover:text-yellow-400"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>

        {/* Search & User Authentication */}
        <div className="hidden md:flex space-x-6 items-center">
          <button className="text-2xl p-2 rounded-lg hover:bg-gray-800 transition">
            <FiSearch />
          </button>

          {!loading && user && (
            <div className="flex items-center space-x-4">
              <span className="text-lg font-medium">Welcome, {user.fullName}!</span>
              <button 
                onClick={handleLogout} 
                className="text-2xl p-2 rounded-lg hover:bg-gray-800 transition"
              >
                <FiLogOut />
              </button>
            </div>
          )}

          {!loading && !user && (
            <Link href="/register">
              <button className="text-2xl p-2 rounded-lg hover:bg-gray-800 transition">
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
