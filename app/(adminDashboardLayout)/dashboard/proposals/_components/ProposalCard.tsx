"use client";

import { Clock, Send } from "lucide-react";

type ProposalCardProps = {
  id: string;
  status: "Approved" | "Pending" | "Draft";
  title: string;
  company: string;
  location: string;
  created: string;
  updated: string;
  currency: string;
  amount: string;
};

export default function ProposalCard({
  id,
  status,
  title,
  company,
  location,
  created,
  updated,
  currency,
  amount,
}: ProposalCardProps) {
  const statusStyles = {
    Approved: "bg-green-100 text-green-700 border-green-200",
    Pending: "bg-gray-200 text-gray-700 border-gray-300",
    Draft: "bg-gray-200 text-gray-600 border-gray-300",
  };

  return (
    <div
      className="
        w-full
        rounded-[14px]
        border border-brand-primary/40
        bg-brand-primary/5
        p-6
        flex flex-col gap-10
      "
    >
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row lg:justify-between gap-6 w-full">
        {/* Left */}
        <div className="space-y-2">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-xl font-semibold text-gray-900">{id}</h2>
            <span
              className={`px-3 py-1 text-sm rounded-md border ${statusStyles[status]}`}
            >
              {status}
            </span>
          </div>

          <p className="text-gray-700">{title}</p>
          <p className="text-sm text-gray-500">
            {company} • {location}
          </p>
        </div>

        {/* Right */}
        <div className="text-left lg:text-right">
          <p className="text-sm text-gray-500">Total Value</p>
          <p className="text-2xl font-semibold text-gray-900">
            {currency} {amount}
          </p>
        </div>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
        <div>
          <p className="text-sm text-gray-500">Created</p>
          <p className="text-sm text-gray-800 mt-1">{created}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Last Updated</p>
          <p className="text-sm text-gray-800 mt-1">{updated}</p>
        </div>
      </div>

      {/* Bottom Section */}
      {status === "Pending" && (
        <div className="w-full rounded-xl border border-brand-primary/20 bg-brand-primary/10 p-4 flex items-start gap-3">
          <Clock className="w-5 h-5 text-brand-primary mt-1" />
          <div>
            <p className="text-sm font-medium text-brand-primary">
              Awaiting Admin Approval
            </p>
            <p className="text-sm text-blue-600">
              Review required before sending to client
            </p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-end gap-4 w-full">
        {status === "Approved" && (
          <>
            <button className="px-6 py-3 rounded-xl border border-brand-primary text-brand-primary font-medium hover:bg-brand-primary/10 transition">
              Generate Invoice
            </button>

            <button className="px-6 py-3 rounded-xl bg-brand-primary text-white font-medium hover:opacity-90 transition">
              Generate Purchase Order
            </button>
          </>
        )}

        {status === "Draft" && (
          <button className="px-8 py-3 rounded-xl bg-brand-primary text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition">
            Send
            <Send className="w-4 h-4" />
          </button>
        )}

        {status === "Pending" && (
          <button className="px-8 py-3 rounded-xl bg-gray-600 text-white font-medium cursor-not-allowed opacity-90">
            Send
          </button>
        )}
      </div>
    </div>
  );
}
