"use client";

import React from 'react';
import {
    CheckCircle2,
    Clock,
    Send,
    Building2,
    Hotel,
    Calendar,
    FileText,
    MoreHorizontal,
    Check
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const rfqData = [
    { id: "RFQ-2024-0101", project: "Marina Bay Hotel", vendor: "Global Furniture Solution", items: "1 item", dueDate: "Due Jan 30", sentDate: "Sent Jan 15", status: "Responded" },
    { id: "RFQ-2024-0102", project: "Marina Bay Hotel", vendor: "LuxeLight Interiors", items: "1 item", dueDate: "Due Jan 30", sentDate: "Sent Jan 15", status: "Follow-Up", overdue: "3d overdue" },
    { id: "RFQ-2024-0103", project: "Marina Bay Hotel", vendor: "Premium Textiles Co", items: "1 item", dueDate: "Due Jan 30", sentDate: "Sent Jan 15", status: "Sent" },
    { id: "RFQ-2024-0104", project: "Marina Bay Hotel", vendor: "Flooring Masters LLC", items: "1 item", dueDate: "Due Jan 30", sentDate: "Sent Jan 15", status: "Responded" }
];

export const RFQItemSection = () => {
    return (
        <div className="bg-white rounded-xl md:rounded-2xl border border-gray-100 shadow-sm overflow-hidden w-full mx-auto">
            {/* Header */}
            <div className="p-4 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-50">
                <div>
                    <h2 className="text-lg md:text-xl font-bold text-gray-800 tracking-tight">RFQ's</h2>
                    <p className="text-xs md:text-sm text-gray-400 mt-0.5">4 RFQ's sent</p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-100 px-2 md:px-3 py-1 font-bold text-[9px] md:text-[10px] uppercase rounded-lg">
                        3 responded
                    </Badge>
                    <Badge variant="outline" className="bg-gray-100 text-gray-500 border-gray-200 px-2 md:px-3 py-1 font-bold text-[9px] md:text-[10px] uppercase rounded-lg">
                        1 overdue
                    </Badge>
                </div>
            </div>

            {/* List Body */}
            <div className="flex flex-col">
                {rfqData.map((rfq, idx) => {
                    // Border color logic based on status
                    const isFollowUp = rfq.status === "Follow-Up";

                    return (
                        <div
                            key={idx}
                            className={`flex flex-col md:flex-row md:items-center justify-between p-4 md:px-6 md:py-4 border last:border-b-0 transition-colors gap-4 ${isFollowUp
                                ? 'bg-red-50/20 border-red-200'
                                : 'bg-white border-gray-100 hover:bg-gray-50/30'
                                }`}
                        >
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 md:gap-3">
                                    <h4 className="font-bold text-gray-800 text-xs md:text-sm leading-none">{rfq.id}</h4>
                                    {rfq.overdue && (
                                        <span className="bg-[#C94C4C] text-white text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tight">
                                            {rfq.overdue}
                                        </span>
                                    )}
                                </div>

                                {/* Info Icons Row */}
                                <div className="flex flex-wrap items-center gap-x-4 md:gap-x-7 gap-y-2 text-[10px] md:text-[11px] font-medium text-gray-400">
                                    <div className="flex items-center gap-1.5">
                                        <Hotel size={14} className="shrink-0" /> <span>{rfq.project}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Building2 size={14} className="shrink-0" /> <span>{rfq.vendor}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <FileText size={14} className="shrink-0" /> <span>{rfq.items}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Calendar size={14} className="shrink-0" /> <span>{rfq.dueDate}</span>
                                    </div>
                                    <span className="text-gray-300 font-normal">{rfq.sentDate}</span>
                                </div>
                            </div>

                            {/* Actions: Badge & Dropdown */}
                            <div className="flex items-center justify-end gap-3">
                                <div className={`flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 rounded-xl border font-bold text-[9px] md:text-[11px] whitespace-nowrap shadow-sm
                                    ${rfq.status === 'Responded' ? 'border-emerald-200 bg-white text-emerald-600' :
                                        rfq.status === 'Sent' ? 'border-amber-200 bg-white text-amber-600' :
                                            'border-gray-200 bg-white text-gray-400'}`}
                                >
                                    {rfq.status === 'Responded' && <CheckCircle2 size={12} className="md:w-3.5 md:h-3.5 stroke-[2.5px]" />}
                                    {rfq.status === 'Sent' && <Send size={12} className="md:w-3.5 md:h-3.5" />}
                                    {rfq.status === 'Follow-Up' && <Clock size={12} className="md:w-3.5 md:h-3.5" />}
                                    {rfq.status}
                                </div>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="text-gray-300 hover:text-gray-600 p-1 outline-none transition-colors">
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-44 p-1 rounded-xl shadow-xl border-gray-100 bg-[#E0ECF8]"
                                    >
                                        <DropdownMenuItem className="flex items-center gap-3 px-4 py-3 focus:bg-white/50 cursor-pointer rounded-lg">
                                            <div className="border border-black rounded-full p-0.5 flex items-center justify-center shrink-0">
                                                <Check size={10} strokeWidth={3} />
                                            </div>
                                            <span className="font-bold text-gray-800 text-[11px] md:text-xs">Approve</span>
                                        </DropdownMenuItem>

                                        <div className="h-[1px] bg-blue-200/50 mx-1" />

                                        <DropdownMenuItem className="flex items-center gap-3 px-4 py-3 focus:bg-white/50 cursor-pointer rounded-lg">
                                            <Clock size={16} className="text-gray-800 shrink-0" />
                                            <span className="font-bold text-gray-800 text-[11px] md:text-xs">Follow-Up</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};