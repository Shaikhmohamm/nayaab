"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../../public/logo.jpg";
import { IoHomeSharp, IoCart } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { BsPerson } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";

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
      <div className="block md:hidden w-full bg-emerald-900 text-white flex justify-between items-center px-4 py-3 z-40 relative">
        {/* Left: Logo + Icons */}
        <div className="flex justify-between items-center gap-4 w-[71%]">
          <Image
            src={logo}
            width={30}
            height={35}
            alt="logo"
            className="rounded-full object-cover"
          />
          <div className="flex items-center gap-5 text-xl">
            <IoHomeSharp />
            <FaSearch />
            <BsPerson className="text-2xl" />
            <IoCart className="text-2xl"/>
          </div>
        </div>

        {/* Right: Hamburger or Close */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
          {menuOpen ? <IoMdClose /> : <RxHamburgerMenu />}
        </button>
      </div>

      {/* Slide-In Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col gap-4 text-gray-800 font-semibold">
          <span className="text-xl">Menu</span>
          <hr />
          <a href="/" onClick={() => setMenuOpen(false)} className="hover:text-emerald-600">
            Home
          </a>
          <a href="/product" onClick={() => setMenuOpen(false)} className="hover:text-emerald-600">
            Shop
          </a>
          <a href="/about" onClick={() => setMenuOpen(false)} className="hover:text-emerald-600">
            About
          </a>
          <a href="/contact" onClick={() => setMenuOpen(false)} className="hover:text-emerald-600">
            Contact
          </a>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default MobileNav;
