"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import logo from "../../public/logo.jpg";
import { IoHomeSharp, IoCart, IoHeartSharp } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";

const MobileNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/me`, {
          withCredentials: true,
        });
        console.log(response.data.user)
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    setLogoutLoading(true);
    toast.success("Logging out...");
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/logout`, {
        withCredentials: true,
      });
  
      setUser(null);
      toast.dismiss();
      toast.success("Logged out successfully!");
      setTimeout(() => router.push("/"), 1500);
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Logout failed!");
    } finally {
      setLogoutLoading(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <div className="block md:hidden">
      {/* Top Header Bar */}
      <div className="bg-blue-950 flex justify-between items-center px-4 py-1 font-serif shadow-md">
        <Link
          href="/"
          className="text-white text-md font-bold tracking-wide hover:scale-105 transition-transform duration-200"
        >
          Nayaab.in
        </Link>

        <div className="flex items-center gap-4">
          {user && (
            <span className="text-white text-sm font-medium">
              Hello, {user.role}
            </span>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              disabled={logoutLoading}
              className={`flex items-center gap-2 text-white border border-white px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 hover:bg-white hover:text-blue-950 ${logoutLoading ? "opacity-50 cursor-not-allowed" : "hover:shadow-md"
                }`}
            >
              {logoutLoading ? "Logging out..." : "Logout"}
            </button>
          ) : (
            <Link href="/login">
              <button className="text-white border border-white px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 hover:bg-white hover:text-blue-950 hover:shadow-md">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Bottom Nav Row */}
      <div className="mt-3 w-full flex justify-between items-center px-4 py-1 z-40 relative text-black">
        {/* Left: Logo and Icons */}
        <div className="flex gap-4 justify-between items-center w-[68%]">
          <Image src={logo} width={30} height={35} alt="logo" className="rounded-full object-cover" />
          <div className="flex gap-5 text-xl text-sky-950">
            <Link href="/" onClick={() => setMenuOpen(false)} className="hover:scale-110 hover:text-purple-600 transition-all duration-200">
              <IoHomeSharp />
            </Link>
            <Link href={user ? "/profile" : "/login"} onClick={() => setMenuOpen(false)} className="hover:scale-110 hover:text-purple-600 transition-all duration-200">
              <BsPerson className="text-2xl" />
            </Link>
            <Link href="/cart" onClick={() => setMenuOpen(false)} className="hover:scale-110 hover:text-purple-600 transition-all duration-200">
              <IoCart className="text-2xl" />
            </Link>
            <Link href="/wishlist" onClick={() => setMenuOpen(false)} className="hover:scale-110 hover:text-purple-600 transition-all duration-200">
              <IoHeartSharp className="text-2xl" />
            </Link>
          </div>
        </div>

        {/* Right: Menu Toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
          {menuOpen ? <IoMdClose /> : <RxHamburgerMenu />}
        </button>
      </div>

      {/* Slide Drawer Menu */}
      <div className={`fixed top-0 left-0 h-full w-3/4 bg-white text-sky-950 shadow-lg z-40 transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6 flex flex-col gap-4 text-md font-semibold">
          <span className="text-xl mb-2">Menu</span>
          <hr className="border-gray-400" />
          <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-purple-500 mt-4">
            Home
          </Link>
          <Link href="/product" onClick={() => setMenuOpen(false)} className="hover:text-purple-500">
            Shop
          </Link>
          <Link href="/about" onClick={() => setMenuOpen(false)} className="hover:text-purple-500">
            About
          </Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)} className="hover:text-purple-500">
            Contact
          </Link>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-30" onClick={() => setMenuOpen(false)}></div>
      )}

      {/* Search Bar */}
      <div className="p-2 flex justify-center items-center gap-2">
        <input
          type="text"
          placeholder="Search..."
          className="h-10 w-3/4 p-2 border-2 border-gray-300 rounded-l-xl focus:outline-none focus:border-purple-500 transition-all duration-200"
        />
        <button className="font-serif text-sm p-2 bg-blue-950 text-white rounded-r-xl transition-all duration-200">
          Search
        </button>
      </div>
    </div>
  );
};

export default MobileNav;
