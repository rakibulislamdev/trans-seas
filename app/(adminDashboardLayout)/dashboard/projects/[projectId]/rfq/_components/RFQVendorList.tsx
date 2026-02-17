"use client";

import { History } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface Vendor {
    name: string;
    date: string | null;
    status: string;
}

export const RFQVendorList = ({ vendors }: { vendors: Vendor[] }) => (
    <section className="border border-blue-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-white p-4 border-b border-gray-50">
            <h2 className="font-bold text-lg">Vendors List</h2>
        </div>
        <div className="divide-y divide-gray-100">
            {vendors.map((vendor, index) => (
                <div key={index} className="px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <span className="font-bold text-gray-800 text-[13px]">{vendor.name}</span>
                    <div className="flex flex-col items-end">
                        {vendor.status === "Received" ? (
                            <div className="text-right">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mb-0.5">Received</p>
                                <p className="text-xs font-bold text-gray-700">{vendor.date}</p>
                            </div>
                        ) : (
                            <Button variant="ghost" className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-1.5 text-gray-500 hover:bg-white hover:border-gray-300 transition-all shadow-sm h-auto">
                                <History size={14} strokeWidth={2.5} />
                                <span className="text-[10px] font-bold uppercase tracking-tight">Follow-Up</span>
                            </Button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    </section>
);