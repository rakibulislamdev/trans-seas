"use client";

import {
    CheckCircle2,
    FileJson,
    Lock,
    Eye,
    MoreHorizontal
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const items = [
    {
        name: "Electronic Safe - 20L Capacity",
        code: "GR-SAF-009",
        desc: "Capacity: 20L, Locking: Electronic keypad + override key, Material: Steel",
        qty: "50 pcs",
        manufacturer: "Kohler",
        commodity: "Furniture",
        status: "Approved"
    },
    {
        name: "Folding Luggage Rack",
        code: "GR-RCK-010",
        desc: "Material: Chrome steel frame with fabric straps, Foldable: Yes",
        qty: "125 pcs",
        manufacturer: "Hospitality Furniture",
        commodity: "Furniture",
        status: "Parsed"
    },
    {
        name: "Bathroom Vanity with Basin",
        code: "BTH-VAN-011",
        desc: "Dimensions: 100x50x80cm, Material: Lacquered MDF, Basin: Ceramic, Tap holes: Single...",
        qty: "80 pcs",
        manufacturer: "Villeroy & Boch",
        commodity: "Stone",
        status: "Approved"
    },
    {
        name: "55\" Smart LED TV",
        code: "GR-TV-014",
        desc: "Screen: 55 inch 4K UHD, Smart: Yes, HDR: Yes, Connectivity: WIFI, HDMI x3",
        qty: "15 pcs",
        manufacturer: "Samsung",
        commodity: "Wall Covering",
        status: "Locked"
    },
    {
        name: "55\" Smart LED TV",
        code: "GR-TV-014",
        desc: "Screen: 55 inch 4K UHD, Smart: Yes, HDR: Yes, Connectivity: WIFI, HDMI x3",
        qty: "*",
        manufacturer: "Samsung",
        commodity: "Wall Covering",
        status: "Needs Review",
        highlight: true
    }
];

const StatusBadge = ({ status }: { status: string }) => {
    // Shared classes for all badges to keep it clean
    const baseClasses = "flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 rounded-xl border font-bold text-[9px] md:text-[11px] whitespace-nowrap shadow-sm";

    switch (status) {
        case "Approved":
            return (
                <div className={`${baseClasses} border-green-200 bg-white text-green-600`}>
                    <CheckCircle2 size={12} className="md:w-3.5 md:h-3.5 stroke-[2.5px]" /> Approved
                </div>
            );
        case "Parsed":
            return (
                <div className={`${baseClasses} border-gray-200 bg-gray-100 text-gray-400 shadow-none`}>
                    <FileJson size={12} className="md:w-3.5 md:h-3.5 stroke-[2.5px]" /> Parsed
                </div>
            );
        case "Locked":
            return (
                <div className={`${baseClasses} border-red-200 bg-white text-red-400`}>
                    <Lock size={12} className="md:text-11 md:h-3.5 stroke-[2.5px]" /> Locked
                </div>
            );
        case "Needs Review":
            return (
                <div className={`${baseClasses} border-amber-200 bg-amber-50 text-amber-600`}>
                    <Eye size={12} className="md:text-11 md:h-3.5 stroke-[2.5px]" /> Needs Review
                </div>
            );
        default:
            return <Badge variant="outline" className="text-[10px]">{status}</Badge>;
    }
};

export const ExtractedItemsTable = () => {
    return (
        <div className="bg-white rounded-xl md:rounded-2xl border border-gray-100 shadow-sm overflow-hidden w-full">
            {/* Header Section - Responsive Stack */}
            <div className="p-4 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-50">
                <div>
                    <h2 className="text-lg md:text-xl font-bold text-gray-800 tracking-tight">Extracted Items</h2>
                    <p className="text-xs md:text-sm text-gray-400 mt-0.5">4 items extracted</p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-600 border-green-100 px-2 md:px-3 py-0.5 md:py-1 text-[9px] max-w-25 font-bold uppercase tracking-wider">
                        3 approved
                    </Badge>
                    <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200 px-2 md:px-3 py-0.5 md:py-1 text-[9px] md:text-11 font-bold uppercase tracking-wider">
                        1 pending
                    </Badge>
                </div>
            </div>

            {/* Table Section - Mobile Scrollable */}
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200">
                <table className="w-full text-left border-collapse min-w-175 md:min-w-full">
                    <thead>
                        <tr className="text-[9px] md:text-11 uppercase tracking-wider text-gray-400 font-bold border-b border-gray-50 bg-gray-50/30">
                            <th className="px-4 md:px-6 py-3 md:py-4 font-bold">Item Name</th>
                            <th className="px-3 md:px-4 py-3 md:py-4 font-bold">Qty</th>
                            <th className="px-3 md:px-4 py-3 md:py-4 font-bold">Manufacturer</th>
                            <th className="px-3 md:px-4 py-3 md:py-4 font-bold">Commodity</th>
                            <th className="px-4 md:px-6 py-3 md:py-4 font-bold text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {items.map((item, idx) => (
                            <tr key={idx} className={`group transition-colors ${item.highlight ? 'bg-amber-50/50' : 'hover:bg-gray-50/20'}`}>
                                <td className="px-4 md:px-6 py-4 md:py-5 max-w-50 md:max-w-[320px]">
                                    <h4 className="font-bold text-gray-800 text-xs md:text-sm mb-0.5 leading-snug truncate md:whitespace-normal">{item.name}</h4>
                                    <p className="text-[9px] md:text-[10px] font-mono text-gray-400 mb-1 uppercase tracking-tighter">{item.code}</p>
                                    <p className="text-[10px] md:text-11 text-gray-400 leading-relaxed line-clamp-1 md:line-clamp-2 italic font-medium">
                                        {item.desc}
                                    </p>
                                </td>
                                <td className="px-3 md:px-4 py-4 md:py-5 text-xs md:text-sm font-semibold text-gray-600 whitespace-nowrap">{item.qty}</td>
                                <td className="px-3 md:px-4 py-4 md:py-5 text-xs md:text-sm text-gray-500 font-medium truncate max-w-25 md:max-w-none">{item.manufacturer}</td>
                                <td className="px-3 md:px-4 py-4 md:py-5 text-xs md:text-sm text-gray-500 font-medium whitespace-nowrap">{item.commodity}</td>
                                <td className="px-4 md:px-6 py-4 md:py-5">
                                    <div className="flex items-center justify-end gap-1 md:gap-3">
                                        <StatusBadge status={item.status} />
                                        <button className="text-gray-300 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-white active:scale-95">
                                            <MoreHorizontal size={18} className="md:w-5 md:h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};