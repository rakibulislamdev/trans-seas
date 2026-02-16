import { DashboardHeader } from "@/components/dashboard_component/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard_component/DashboardSidebar";
import type React from "react";

export default function DashboardLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="flex h-screen  overflow-hidden">
      <DashboardSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 p-8 overflow-y-auto bg-white">{children}</main>
      </div>
    </div>
  );
}
