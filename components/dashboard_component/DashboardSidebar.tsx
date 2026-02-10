


"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  Settings2,
  Table,
  ShoppingCart,
  User,
  Layers2,
  UserPen,
  TagIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import Image from "next/image";
import { cn } from "@/lib/utils";

const menuItems = [
  { title: "Dashboard", icon: Table, href: "/dashboard" },
  { title: "Orders", icon: ShoppingCart, href: "/dashboard/orders" },
  { title: "User Management", icon: User, href: "/dashboard/user-management" },
  { title: "Products", icon: Table, href: "/dashboard/products" },
  { title: "categories & Brands", icon: Layers2, href: "/dashboard/categories-brands" },
  { title: "Discount", icon: TagIcon, href: "/dashboard/discount" },
  { title: "Content", icon: Settings2, href: "/dashboard/content" },
  { title: "Profile", icon: UserPen, href: "/dashboard/profile" },
 
];

export function DashboardSidebar() {

  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto-collapse on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
        setMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    setMobileMenuOpen(false);
    window.location.href = "/login";
  };



  const sidebarContent = (
    <>
      {/* Logo & Toggle */}
      <div className="flex items-center justify-between p-4 border-b  ">
        {!collapsed && (
          <Link href="/" className="flex items-center">
            <Image src="/icon/dashboard-logo.png" alt="Logo" width={139} height={50} className="h-16 w-auto ml-20 " />
            
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => (window.innerWidth >= 1024 ? setCollapsed(!collapsed) : setMobileMenuOpen(false))}
          className="h-9 w-9"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-4  ">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all  duration-200",
                    isActive
                      ? "bg-[#006CF9]/20 text-[#006CF9] shadow-md"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                    collapsed && "justify-center"
                  )}
                >
                  <Icon className={cn("h-5 w-5 flex-shrink-0", isActive && "text-[#006CF9]")} />
                  {!collapsed && <span className="text-base">{item.title}</span>}
                  {collapsed && !mobileMenuOpen && (
                    <span className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                      {item.title}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4  border-t">
        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center cursor-pointer gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-red-600 hover:bg-red-50",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="text-base">Log out</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Hamburger Button (Visible only on <lg) */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-gray-100 rounded-lg  p-3 hover:bg-gray-50 transition"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Desktop Sidebar: Fixed Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col bg-white  shadow-lg transition-all duration-300 lg:relative lg:translate-x-0",
          collapsed ? "w-20" : "w-72",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30  bg-opacity-50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Optional: Add padding to main content on desktop */}
      <div className="hidden lg:block" style={{ paddingLeft: collapsed ? "0px" : "0px" }} />
    </>
  );
}