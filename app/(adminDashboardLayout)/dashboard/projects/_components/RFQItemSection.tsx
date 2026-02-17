"use client";

import React from 'react';
import {
    CheckCircle2,
    Clock,
    Send,
    Building2,
    Hotel,
    Calendar,
    FileText
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const rfqData = [
    { id: "RFQ-2024-0101", project: "Marina Bay Hotel", vendor: "Global Furniture Solution", items: "1 item", dueDate: "Due Jan 30", sentDate: "Sent Jan 15", status: "Responded" },
    { id: "RFQ-2024-0102", project: "Marina Bay Hotel", vendor: "LuxeLight Interiors", items: "1 item", dueDate: "Due Jan 30", sentDate: "Sent Jan 15", status: "Follow-Up", overdue: "3d overdue" },
    { id: "RFQ-2024-0103", project: "Marina Bay Hotel", vendor: "Premium Textiles Co", items: "1 item", dueDate: "Due Jan 30", sentDate: "Sent Jan 15", status: "Sent" },
    { id: "RFQ-2024-0104", project: "Marina Bay Hotel", vendor: "Flooring Masters LLC", items: "1 item", dueDate: "Due Jan 30", sentDate: "Sent Jan 15", status: "Responded" }
];

export const RFQItemSection = () => {
    return (
        <div className="bg-white rounded-xl md:rounded-2xl border border-gray-100 shadow-sm p-4 md:p-6 w-full mx-auto space-y-4 md:space-y-6 font-sans">
            {/* Header - Stack on mobile, Row on Desktop */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">RFQ's</h2>
                    <p className="text-xs md:text-sm text-gray-400 font-medium mt-0.5 md:mt-1">4 RFQ's sent</p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-100 px-2 md:px-3 py-0.5 md:py-1 font-bold text-[9px] md:text-[10px] uppercase rounded-lg">
                        3 responded
                    </Badge>
                    <Badge variant="outline" className="bg-gray-100 text-gray-500 border-gray-200 px-2 md:px-3 py-0.5 md:py-1 font-bold text-[9px] md:text-[10px] uppercase rounded-lg">
                        1 overdue
                    </Badge>
                </div>
            </div>

            {/* List */}
            <div className="space-y-3 md:space-y-4">
                {rfqData.map((rfq, idx) => (
                    <div
                        key={idx}
                        className={`flex flex-col md:flex-row md:items-center justify-between p-4 md:p-5 rounded-xl border transition-all gap-4 ${rfq.overdue ? 'border-red-200 bg-red-50/10' : 'border-gray-100 hover:border-gray-200'
                            }`}
                    >
                        <div className="flex flex-col gap-2 md:gap-3">
                            <div className="flex items-center gap-2 md:gap-3">
                                <h3 className="font-bold text-gray-800 text-sm md:text-base leading-none">{rfq.id}</h3>
                                {rfq.overdue && (
                                    <span className="bg-[#C94C4C] text-white text-[9px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 rounded-full uppercase">
                                        {rfq.overdue}
                                    </span>
                                )}
                            </div>

                            {/* Responsive Info Row - Grid on mobile, Flex on Desktop */}
                            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-x-4 md:gap-x-8 gap-y-2 text-[11px] md:text-sm font-medium text-gray-400">
                                <div className="flex items-center gap-1.5 md:gap-2 truncate">
                                    <Hotel size={14} className="md:w-4 md:h-4 shrink-0" />
                                    <span className="truncate">{rfq.project}</span>
                                </div>
                                <div className="flex items-center gap-1.5 md:gap-2 truncate">
                                    <Building2 size={14} className="md:w-4 md:h-4 shrink-0" />
                                    <span className="truncate">{rfq.vendor}</span>
                                </div>
                                <div className="flex items-center gap-1.5 md:gap-2">
                                    <FileText size={14} className="md:w-4 md:h-4 shrink-0" />
                                    <span>{rfq.items}</span>
                                </div>
                                <div className="flex items-center gap-1.5 md:gap-2">
                                    <Calendar size={14} className="md:w-4 md:h-4 shrink-0" />
                                    <span>{rfq.dueDate}</span>
                                </div>
                                <span className="col-span-2 sm:col-auto text-gray-300 font-normal">{rfq.sentDate}</span>
                            </div>
                        </div>

                        {/* Button - Full width on tiny screens, Auto on desktop */}
                        <div className="w-full md:w-auto">
                            <button className={`flex items-center justify-center gap-2 w-full md:w-auto px-4 md:px-5 py-2 md:py-2.5 border rounded-xl font-bold text-xs md:text-sm transition-all shadow-sm
                                ${rfq.status === 'Responded' ? 'border-emerald-500 bg-emerald-50/30 text-emerald-600' :
                                    rfq.status === 'Sent' ? 'border-amber-200 bg-amber-50/20 text-amber-700' :
                                        'border-gray-200 bg-white text-gray-700'}`}
                            >
                                {rfq.status === 'Responded' && <CheckCircle2 size={16} className="md:w-[18px] md:h-[18px] stroke-[2.5px]" />}
                                {rfq.status === 'Sent' && <Send size={16} className="md:w-[18px] md:h-[18px]" />}
                                {rfq.status === 'Follow-Up' && <Clock size={16} className="md:w-[18px] md:h-[18px]" />}
                                {rfq.status}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};