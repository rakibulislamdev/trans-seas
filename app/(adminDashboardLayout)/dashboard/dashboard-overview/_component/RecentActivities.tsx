"use client";

import { useGetRecentActivitiesQuery } from "@/redux/api/dashboardApi";
import { ShoppingCart, AlertTriangle, User, Package, Clock } from "lucide-react";

const ActivitySkeleton = () => (
  <div className="space-y-5 animate-pulse">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="flex items-start gap-4">
        <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    ))}
  </div>
);

export default function RecentActivities() {
  const { data, isLoading, isError } = useGetRecentActivitiesQuery();

  const activitiesData = data?.data || [];

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "order":
        return { icon: ShoppingCart, bg: "bg-blue-100", color: "text-blue-600" };
      case "alert":
      case "low_stock":
        return { icon: AlertTriangle, bg: "bg-red-100", color: "text-red-600" };
      case "user":
      case "registration":
        return { icon: User, bg: "bg-green-100", color: "text-green-600" };
      case "delivered":
      case "shipping":
        return { icon: Package, bg: "bg-purple-100", color: "text-purple-600" };
      default:
        return { icon: Clock, bg: "bg-gray-100", color: "text-gray-600" };
    }
  };

  const formatTime = (time: string) => {
    const date = new Date(time);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="w-full max-w-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#202020] mb-2">
            Recent Activities
          </h2>
          <p className="text-sm text-gray-500">Latest updates from your store</p>
        </div>
      
      </div>

      {/* List */}
      {isLoading ? (
        <ActivitySkeleton />
      ) : isError ? (
        <div className="p-4 text-center text-red-500 bg-red-50 rounded-lg border border-red-100">
          Failed to load recent activities.
        </div>
      ) : activitiesData.length === 0 ? (
        <div className="p-8 text-center text-gray-500 italic">
          No recent activities found.
        </div>
      ) : (
        <div className="space-y-5">
          {activitiesData.map((item, index) => {
            const { icon: Icon, bg, color } = getIcon(item.type);
            return (
              <div key={index} className="flex items-start gap-4 group transition-all">
                {/* Icon */}
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${bg} transition-colors group-hover:opacity-80`}
                >
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 border-b border-gray-50 pb-4 group-last:border-0 group-last:pb-0">
                  <p className="text-sm font-medium text-gray-900 leading-tight">
                    {item.message || item.description}
                  </p>
                  <span className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    {formatTime(item.time || item.timestamp || "")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
