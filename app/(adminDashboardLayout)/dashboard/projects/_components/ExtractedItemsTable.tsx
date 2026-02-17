"use client";

import { useState } from 'react';
import {
    CheckCircle2,
    FileJson,
    Lock,
    Eye,
    MoreHorizontal,
    Pencil,
    Check
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReusableModal } from '@/components/common/ReusableModal';
import { EditItemForm } from './EditItemForm';
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
    const baseClasses = "flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 rounded-xl border font-bold text-[9px] md:text-[11px] whitespace-nowrap shadow-sm";
    switch (status) {
        case "Approved": return <div className={`${baseClasses} border-green-200 bg-white text-green-600`}><CheckCircle2 size={12} className="md:w-3.5 md:h-3.5 stroke-[2.5px]" /> Approved</div>;
        case "Locked": return <div className={`${baseClasses} border-red-200 bg-white text-red-400`}><Lock size={12} className="md:text-11 md:h-3.5 stroke-[2.5px]" /> Locked</div>;
        case "Needs Review": return <div className={`${baseClasses} border-amber-200 bg-amber-50 text-amber-600`}><Eye size={12} className="md:text-11 md:h-3.5 stroke-[2.5px]" /> Needs Review</div>;
        default: return <div className={`${baseClasses} border-gray-200 bg-gray-100 text-gray-400`}><FileJson size={12} /> Parsed</div>;
    }
};

export const ExtractedItemsTable = () => {
    // --- Modal State ---
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<unknown>(null);

    const handleEditClick = (item: unknown) => {
        setSelectedItem(item);
        setIsEditModalOpen(true);
    };

    return (
        <div className="bg-white rounded-xl md:rounded-2xl border border-gray-100 shadow-sm overflow-hidden w-full">
            {/* Table Header */}
            <div className="p-4 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-50">
                <div>
                    <h2 className="text-lg md:text-xl font-bold text-gray-800 tracking-tight">Extracted Items</h2>
                    <p className="text-xs md:text-sm text-gray-400 mt-0.5">4 items extracted</p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-175 md:min-w-full">
                    <thead>
                        <tr className="text-[9px] md:text-11 uppercase tracking-wider text-gray-400 font-bold border-b border-gray-50 bg-gray-50/30">
                            <th className="px-4 md:px-6 py-4">Item Name</th>
                            <th className="px-3 md:px-4 py-4">Qty</th>
                            <th className="px-4 md:px-6 py-4 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {items.map((item, idx) => (
                            <tr key={idx} className={`group transition-colors ${item.status === "Needs Review" ? 'bg-amber-50/50' : 'hover:bg-gray-50/20'}`}>
                                <td className="px-4 md:px-6 py-4">
                                    <h4 className="font-bold text-gray-800 text-xs md:text-sm">{item.name}</h4>
                                    <p className="text-[10px] text-gray-400">{item.code}</p>
                                </td>
                                <td className="px-3 md:px-4 py-4 text-xs font-semibold">{item.qty}</td>
                                <td className="px-4 md:px-6 py-4">
                                    <div className="flex items-center justify-end gap-3">
                                        <StatusBadge status={item.status} />

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="text-gray-300 hover:text-gray-600 p-1 outline-none">
                                                    <MoreHorizontal size={18} />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48 p-1 rounded-xl shadow-xl border-gray-100 bg-[#E0ECF8]">
                                                <DropdownMenuItem className="flex items-center gap-3 px-4 py-3 focus:bg-white/50 cursor-pointer rounded-lg">
                                                    <div className="border border-black rounded-full p-0.5"><Check size={12} /></div>
                                                    <span className="font-medium">Approve</span>
                                                </DropdownMenuItem>

                                                <div className="h-px bg-blue-200/50 mx-1" />

                                                {/* Edit Trigger */}
                                                <DropdownMenuItem
                                                    onSelect={() => handleEditClick(item)}
                                                    className="flex items-center gap-3 px-4 py-3 focus:bg-white/50 cursor-pointer rounded-lg"
                                                >
                                                    <Pencil size={18} />
                                                    <span className="font-medium">Edit</span>
                                                </DropdownMenuItem>

                                                <div className="h-px bg-blue-200/50 mx-1" />

                                                <DropdownMenuItem className="flex items-center gap-3 px-4 py-3 focus:bg-white/50 cursor-pointer rounded-lg">
                                                    <Lock size={18} />
                                                    <span className="font-medium">Lock</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Reusable Modal Implementation */}
            <ReusableModal
                isOpen={isEditModalOpen}
                onOpenChange={setIsEditModalOpen}
                title="Edit Item"
            >
                <EditItemForm
                    item={selectedItem}
                    onCancel={() => setIsEditModalOpen(false)}
                />
            </ReusableModal>
        </div>
    );
};