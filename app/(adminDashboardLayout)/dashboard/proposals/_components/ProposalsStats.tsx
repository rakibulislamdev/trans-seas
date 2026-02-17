"use client";

import { Pencil, Clock, CheckCircle, Send } from "lucide-react";

const proposals = [
  {
    title: "Draft",
    count: 1,
    icon: Pencil,
  },
  {
    title: "In Review",
    count: 1,
    icon: Clock,
  },
  {
    title: "Approved",
    count: 1,
    icon: CheckCircle,
  },
  {
    title: "Sent to Client",
    count: 0,
    icon: Send,
  },
];

export default function ProposalsStats() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-gray-900">Proposals</h1>
      <p className="text-gray-500 mt-1">2 proposals</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {proposals.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="relative rounded-2xl border border-blue-100 bg-brand-primary/5 p-6 flex flex-col justify-between min-h-[140px]"
            >
              {/* Icon */}
              <div className="absolute top-4 right-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-brand-primary">
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-gray-700 text-lg font-medium">
                {item.title}
              </h3>

              {/* Count */}
              <p className="text-3xl font-semibold text-gray-900 mt-6">
                {item.count}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
