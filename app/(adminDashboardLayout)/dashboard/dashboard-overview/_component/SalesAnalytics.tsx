
"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetSalesAnalyticsQuery } from "@/redux/api/dashboardApi";

const ChartSkeleton = () => (
  <div className="w-full h-96 bg-gray-50 rounded-lg animate-pulse flex items-center justify-center">
    <div className="w-full h-full p-8 flex flex-col justify-end gap-4">
      <div className="flex items-end justify-between h-64 gap-2">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className="bg-gray-200 rounded-t w-full" style={{ height: `${Math.random() * 100}%` }}></div>
        ))}
      </div>
      <div className="flex justify-between">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className="h-3 w-8 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  </div>
);

const SalesAnalytics = () => {
  const [activeTab, setActiveTab] = useState("monthly");

  const { data, isLoading, isError } = useGetSalesAnalyticsQuery(activeTab.toLowerCase());

  const chartData = React.useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const analyticsData = data?.data as any;
    if (!analyticsData) return [];

    // Check if it's already the expected array format
    if (Array.isArray(analyticsData)) {
      return analyticsData;
    }

    // Handle { labels: [], values: [] } format
    const { labels, values } = analyticsData;
    if (!labels || !Array.isArray(labels)) return [];

    return labels.map((label: string, index: number) => ({
      label,
      value: values?.[index] || 0,
    }));
  }, [data]);

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { payload: { label: string }; value: number }[] }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-800">
            {payload[0].payload.label}: ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full max-w-full mx-auto p-6 lg:p-0 my-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              Sales Analytics
            </h1>
            <p className="text-gray-500 text-sm">
              Track your sales performance over time
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            {["Daily", "Weekly", "Monthly"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab.toLowerCase() === tab.toLowerCase()
                    ? "bg-white text-green-700 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-2 mb-6">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-gray-600 font-medium">Sales Volume</span>
        </div>

        {/* Chart Area */}
        {isLoading ? (
          <ChartSkeleton />
        ) : isError ? (
          <div className="w-full h-96 flex items-center justify-center bg-red-50 rounded-lg border border-red-100 text-red-500">
            Failed to load sales analytics.
          </div>
        ) : (
          <>
            <div className="w-full h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#f0f0f0"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="label"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                    tickFormatter={(value) => `$${value}`}
                    domain={[0, "auto"]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", r: 4, strokeWidth: 2, stroke: "#fff" }}
                    activeDot={{ r: 6, fill: "#3b82f6", strokeWidth: 2, stroke: "#fff" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* X-axis Labels */}
            <div className="flex justify-between mt-4 px-8 border-t pt-4">
              {chartData.map((item: { label: string; value: number }, index: number) => (
                <div key={index} className="text-center">
                  <p className="text-xs font-bold text-gray-900">${item.value.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SalesAnalytics;
