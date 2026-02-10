"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  LayoutGrid,
  Folder,
  Building2,
  FileCheck2,
  FileText,
  FileSpreadsheet,
  Mail,
  ShoppingCart,
  ReceiptText,
  CreditCard,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import Image from "next/image";
import { cn } from "@/lib/utils";



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

  const menuItems = [
    { title: "Dashboard", icon: LayoutGrid, href: "/dashboard" },
    { title: "Project's", icon: Folder, href: "/dashboard/projects" },
    { title: "Vendors", icon: Building2, href: "/dashboard/vendors" },
    { title: "RFQs", icon: FileCheck2, href: "/dashboard/rfqs" },
    { title: "Quotes", icon: FileText, href: "/dashboard/quotes" },
    { title: "Cost Sheets", icon: FileSpreadsheet, href: "/dashboard/cost-sheets" },
    { title: "Proposals", icon: Mail, href: "/dashboard/proposals" },
    { title: "Purchase Orders", icon: ShoppingCart, href: "/dashboard/orders" },
    { title: "Invoices", icon: ReceiptText, href: "/dashboard/invoices" },
    { title: "Payments", icon: CreditCard, href: "/dashboard/payments" },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#f0f9ff]/50">
      {/* Logo & Toggle */}
      <div className="flex items-center justify-between p-6">
        {!collapsed && (
          <Link href="/" className="flex flex-col items-center">
            <Image
              src="/images/dashboard-images/logo/Transseas_Logo_dashboard.png"
              alt="Trans Seas Logo"
              width={100}
              height={100}
              className="w-32.75 h-h-26"
            />
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            window.innerWidth >= 1024
              ? setCollapsed(!collapsed)
              : setMobileMenuOpen(false)
          }
          className="h-9 w-9 ml-auto"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 overflow-y-auto custom-scrollbar">
        <ul className="space-y-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border",
                    isActive
                      ? "bg-[#0070C0] text-white border-[#0070C0] shadow-md"
                      : "bg-white text-slate-600 border-[#0070C0]/20 hover:border-[#0070C0] hover:text-[#0070C0]",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 shrink-0",
                      isActive ? "text-white" : "text-[#0070C0]"
                    )}
                  />
                  {!collapsed && (
                    <span className="text-base truncate">{item.title}</span>
                  )}
                  {collapsed && !mobileMenuOpen && (
                    <span className="absolute left-full ml-3 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                      {item.title}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 mt-auto">
        <div className={cn("flex items-center gap-3", collapsed ? "justify-center" : "justify-between")}>
          {!collapsed && (
            <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
              <Image
                src="/images/dashboard-images/user/avatar.jpg"
                alt="User"
                width={40}
                height={40}
                className="object-cover w-full h-full"
                // Fallback if image missing
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = '<div class="w-full h-full bg-slate-200 flex items-center justify-center"><svg class="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></div>';
                }}
              />
            </div>
          )}

          <button
            onClick={handleLogout}
            className={cn(
              "flex items-center justify-center gap-2 rounded-full border border-red-500 text-red-500 hover:bg-red-50 transition-all duration-200",
              collapsed ? "w-10 h-10 p-0" : "px-6 py-2 bg-white"
            )}
            title="Overview Logout"
          >
            {!collapsed && <span className="font-semibold">Logout</span>}
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
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
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0",
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
      <div
        className="hidden lg:block"
        style={{ paddingLeft: collapsed ? "0px" : "0px" }}
      />
    </>
  );
}
