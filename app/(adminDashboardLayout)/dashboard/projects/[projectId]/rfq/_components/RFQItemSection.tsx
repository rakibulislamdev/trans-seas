"use client";

import {
    Clock, Building2, Hotel, Calendar, MoreHorizontal, Check
} from 'lucide-react';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from 'next/link';

const rfqData = [
    { id: "RFQ-2024-0101", project: "Marina Bay Hotel", vendor: "Global Furniture Solution", items: "1 item", dueDate: "Due Jan 30", sentDate: "Sent Jan 15", status: "Responded" },
    { id: "RFQ-2024-0102", project: "Marina Bay Hotel", vendor: "LuxeLight Interiors", items: "1 item", dueDate: "Due Jan 30", sentDate: "Sent Jan 15", status: "Follow-Up", overdue: "3d overdue" },
    { id: "RFQ-2024-0103", project: "Marina Bay Hotel", vendor: "Premium Textiles Co", items: "1 item", dueDate: "Due Jan 30", sentDate: "Sent Jan 15", status: "Sent" },
    { id: "RFQ-2024-0104", project: "Marina Bay Hotel", vendor: "Flooring Masters LLC", items: "1 item", dueDate: "Due Jan 30", sentDate: "Sent Jan 15", status: "Responded" }
];

export const RFQItemSection = ({ projectId }: { projectId: string }) => {
    return (
        <div className="bg-white rounded-xl md:rounded-2xl border border-gray-100 shadow-sm overflow-hidden w-full mx-auto">
            {/* Header */}
            <div className="p-4 md:p-6 border-b border-gray-50">
                <h2 className="text-lg md:text-xl font-bold text-gray-800 tracking-tight">RFQ&#39s</h2>
                <p className="text-xs md:text-sm text-gray-400 mt-0.5">{rfqData.length} RFQ&#39s sent</p>
            </div>

            {/* List Body */}
            <div className="flex flex-col">
                {rfqData.map((rfq, idx) => (
                    <Link
                        href={`/dashboard/projects/${projectId}/rfq/${rfq.id}`}
                        key={idx}
                        className={`flex flex-col md:flex-row md:items-center justify-between p-4 md:px-6 md:py-4 border last:border-b-0 transition-colors gap-4 ${rfq.status === "Follow-Up" ? 'bg-red-50/20 border-red-200' : 'bg-white border-gray-100 hover:bg-gray-50/30'
                            }`}
                    >
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <h4 className="font-bold text-gray-800 text-xs md:text-sm">{rfq.id}</h4>
                                {rfq.overdue && (
                                    <span className="bg-[#C94C4C] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                                        {rfq.overdue}
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-wrap items-center gap-x-4 text-[10px] text-gray-400 font-medium">
                                <div className="flex items-center gap-1.5"><Hotel size={14} /> <span>{rfq.project}</span></div>
                                <div className="flex items-center gap-1.5"><Building2 size={14} /> <span>{rfq.vendor}</span></div>
                                <div className="flex items-center gap-1.5"><Calendar size={14} /> <span>{rfq.dueDate}</span></div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3">
                            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-bold text-11 shadow-sm
                                ${rfq.status === 'Responded' ? 'border-emerald-200 text-emerald-600' : 'border-gray-200 text-gray-400'}`}>
                                {rfq.status}
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                    <button className="text-gray-300 hover:text-gray-600 p-1 outline-none">
                                        <MoreHorizontal size={18} />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-44 p-1 rounded-xl shadow-xl border-gray-100 bg-[#E0ECF8]">
                                    <DropdownMenuItem className="flex items-center gap-3 px-4 py-3 focus:bg-white/50 cursor-pointer rounded-lg">
                                        <div className="border border-black rounded-full p-0.5 flex items-center justify-center">
                                            <Check size={10} strokeWidth={3} />
                                        </div>
                                        <span className="font-bold text-gray-800 text-xs">Approve</span>
                                    </DropdownMenuItem>
                                    <div className="h-px bg-blue-200/50 mx-1" />
                                    <DropdownMenuItem className="flex items-center gap-3 px-4 py-3 focus:bg-white/50 cursor-pointer rounded-lg">
                                        <Clock size={16} className="text-gray-800" />
                                        <span className="font-bold text-gray-800 text-xs">Follow-Up</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};