// components/stats/StatsCards.tsx
"use client";

import { useGetDashboardStatsQuery } from "@/redux/api/dashboardApi";
import {
  ShoppingCart,
  DollarSign,
  Package,
  AlertTriangle,
} from "lucide-react";

const StatsSkeleton = () => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="rounded-xl border bg-white p-6 shadow-sm animate-pulse">
        <div className="flex items-center justify-between">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="mt-4 h-8 w-32 bg-gray-200 rounded"></div>
        <div className="mt-2 h-4 w-40 bg-gray-200 rounded"></div>
      </div>
    ))}
  </div>
);

export default function StatsCards() {
  const { data, isLoading, isError } = useGetDashboardStatsQuery();

  if (isLoading) return <StatsSkeleton />;
  if (isError) return <div className="p-4 text-red-500 text-center bg-red-50 rounded-lg border border-red-200">Failed to load dashboard statistics.</div>;

  const statsData = data?.data;

  const stats = [
    {
      title: "Total Orders",
      value: statsData?.totalOrders?.toLocaleString() || "0",
      icon: ShoppingCart,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Revenue",
      value: `$${statsData?.totalRevenue?.toLocaleString() || "0"}`,
      icon: DollarSign,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Pending Orders",
      value: statsData?.pendingOrders?.toLocaleString() || "0",
      icon: Package,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Total Users",
      value: statsData?.totalUsers?.toLocaleString() || "0",
      icon: AlertTriangle,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">{item.title}</p>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.iconBg}`}
              >
                <Icon className={`h-5 w-5 ${item.iconColor}`} />
              </div>
            </div>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              {item.value}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              <span className="text-green-600 font-medium">Synced</span> just now
            </p>
          </div>
        );
      })}
    </div>
  );
}
