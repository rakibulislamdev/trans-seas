"use client";

import { Bell, Search } from "lucide-react";
import { Button } from "../ui/button";

export function DashboardHeader() {
  return (
    <div className="w-full bg-brand-primary/5 py-4 px-6">
      <div className="w-full mx-auto flex justify-between items-center gap-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-sm">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0071BD] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Notification Button */}
        <Button className="flex items-center justify-center cursor-pointer h-12 w-12 rounded-full bg-brand-primary hover:bg-[#0061a3] transition-colors">
          <Bell size={24} className="text-text-strong-white" />
        </Button>
      </div>
    </div>
  );
}
