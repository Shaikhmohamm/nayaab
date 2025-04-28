"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link"; // <-- Import Link
import logo from "../../public/logo.jpg";
import { IoHomeSharp, IoCart } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { IoHeartSharp } from "react-icons/io5";


const MobileNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  return (
    <>
      {/* Top Mobile Nav */}
      <div className="block md:hidden w-full bg-gray-300 text-black flex justify-between items-center px-4 py-3 z-40 relative">
        {/* Left: Logo + Icons */}
        <div className="flex justify-between items-center gap-4 w-[71%]">
          <Image
            src={logo}
            width={30}
            height={35}
            alt="logo"
            className="rounded-full object-cover"
          />
          <div className="flex items-center gap-5 text-xl text-sky-950">
            {/* Home */}
            <Link href="/" onClick={() => setMenuOpen(false)} className="hover:scale-110 hover:text-purple-600 transition-all duration-200">
              <IoHomeSharp />
            </Link>

            {/* Profile */}
            <Link href="/profile" onClick={() => setMenuOpen(false)} className="hover:scale-110 hover:text-purple-600 transition-all duration-200">
              <BsPerson className="text-2xl" />
            </Link>

            {/* Cart */}
            <Link href="/cart" onClick={() => setMenuOpen(false)} className="hover:scale-110 hover:text-purple-600 transition-all duration-200">
              <IoCart className="text-2xl" />
            </Link>

            {/* Wishlist (New Icon) */}
            <Link href="/wishlist" onClick={() => setMenuOpen(false)} className="hover:scale-110 hover:text-purple-600 transition-all duration-200">
              <IoHeartSharp className="text-2xl" />
            </Link>
          </div>
        </div>


        {/* Right: Hamburger or Close */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
          {menuOpen ? <IoMdClose /> : <RxHamburgerMenu />}
        </button>
      </div>

      {/* Slide-In Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-3/4 bg-white text-sky-950 shadow-lg z-40 transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
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
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
      <div className="flex justify-center items-center gap-2 mt-2">
        <input
          type="text"
          placeholder="Search..."
          className="w-3/4 p-2 border-2 border-gray-300 rounded-l-xl focus:outline-none focus:border-purple-500 transition-all duration-200"
        />
        <button className="font-serif text-sm p-2 bg-purple-950 hover:bg-purple-700 text-white rounded-r-xl transition-all duration-200">
          Search
        </button>
      </div>

    </>
  );
};

export default MobileNav;
