"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import AdminNav from "@/components/AdminNav";
import MobileNav from "@/components/MobileNav";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component is mounted before rendering to prevent hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent rendering until mounted
  if (!isMounted) return null;

  // Define routes where NavBar should be hidden
  const hideNavBarRoutes = ["/register", "/login", "/access-denied"];

  // Check if the current route is an admin page
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <div>
      {!hideNavBarRoutes.includes(pathname) && !isAdminPage && <NavBar />}
      {!hideNavBarRoutes.includes(pathname) && !isAdminPage && <MobileNav />}
      {/* {isAdminPage && <AdminNav />} */}
      {children}
    </div>
  );
}
