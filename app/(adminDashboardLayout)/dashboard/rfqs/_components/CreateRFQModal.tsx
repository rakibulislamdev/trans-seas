"use client";

import React, { useState } from "react";
import { X, ChevronDown, Calendar, Send, Check } from "lucide-react";

interface CreateRFQModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreateRFQModal = ({ isOpen, onClose }: CreateRFQModalProps) => {
    const [step, setStep] = useState(1);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectedVendors, setSelectedVendors] = useState<number[]>([]);

    if (!isOpen) return null;

    const steps = [
        { id: 1, label: "Select Items" },
        { id: 2, label: "Select Vendors" },
        { id: 3, label: "Review & Send" },
        { id: 4, label: "T&C Link" },
    ];

    const handleNext = () => setStep((prev) => Math.min(prev + 1, 4));
    const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

    const toggleItem = (id: number) => {
        setSelectedItems((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const toggleVendor = (id: number) => {
        setSelectedVendors((prev) =>
            prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">

                {/* Header */}
                <div className="flex items-center justify-between p-8 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900">Create New RFQ</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Steps Progress */}
                <div className="px-8 pt-8 flex items-center gap-4 flex-wrap">
                    {steps.map((s, idx) => (
                        <React.Fragment key={s.id}>
                            <div className="flex items-center gap-2">
                                <div
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-300 ${step >= s.id
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 text-gray-400"
                                        }`}
                                >
                                    {s.id}
                                </div>
                                <span className={`text-sm font-semibold transition-colors duration-300 ${step >= s.id ? "text-blue-600" : "text-gray-400"
                                    }`}>
                                    {s.label}
                                </span>
                            </div>
                            {idx < steps.length - 1 && (
                                <div className="h-[2px] w-4 bg-gray-100" />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Modal Content */}
                <div className="p-8 max-h-[60vh] overflow-y-auto">
                    {step === 1 && (
                        <div className="space-y-6">
                            <div>
                                <label className="text-sm font-bold text-gray-700 block mb-2 uppercase tracking-wide">Select Project</label>
                                <div className="relative">
                                    <select className="w-full h-14 bg-gray-50 border border-gray-200 rounded-2xl px-6 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 font-medium">
                                        <option>Grand Hyatt Tower Hotel (HYT-2026-0D1)</option>
                                    </select>
                                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-bold text-gray-700 block mb-4 uppercase tracking-wide">Select Items</label>
                                <div className="space-y-3">
                                    {[
                                        { id: 1, name: "Wall-Mounted Bathroom Sink", desc: "Ceramic, 600x450mm, white finish, single tap hole", qty: "50 pcs" },
                                        { id: 2, name: "LED Ceiling Light", desc: "40w, 4000k, dimmable, surface mount, IP44", qty: "35 pcs" },
                                        { id: 3, name: "LED Tube Ceiling Light", desc: "40w, 4000k, dimmable, surface mount, IP44", qty: "35 pcs" }
                                    ].map((item) => (
                                        <div
                                            key={item.id}
                                            onClick={() => toggleItem(item.id)}
                                            className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex gap-4 ${selectedItems.includes(item.id)
                                                    ? "border-blue-600 bg-blue-50/30"
                                                    : "border-gray-100 hover:border-gray-200"
                                                }`}
                                        >
                                            <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${selectedItems.includes(item.id)
                                                    ? "bg-emerald-600 border-emerald-600"
                                                    : "border-gray-300"
                                                }`}>
                                                {selectedItems.includes(item.id) && <Check size={14} className="text-white" />}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">{item.name}</h4>
                                                <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                                                <p className="text-sm font-medium text-gray-600 mt-2">Qty: {item.qty}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-400 mt-4 font-medium">{selectedItems.length} of 30 items selected</p>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <label className="text-sm font-bold text-gray-700 block mb-4 uppercase tracking-wide">Select Vendors</label>
                            <div className="space-y-3">
                                {[
                                    { id: 1, name: "Global Furniture Solution", desc: "Ceramic, 600x450mm, white finish, single tap hole", qty: "50 pcs" },
                                    { id: 2, name: "LED Solution", desc: "40w, 4000k, dimmable, surface mount, IP44", qty: "35 pcs" },
                                    { id: 3, name: "Global Furniture Solution", desc: "40w, 4000k, dimmable, surface mount, IP44", qty: "35 pcs" }
                                ].map((vendor) => (
                                    <div
                                        key={vendor.id}
                                        onClick={() => toggleVendor(vendor.id)}
                                        className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex gap-4 ${selectedVendors.includes(vendor.id)
                                                ? "border-blue-600 bg-blue-50/30"
                                                : "border-gray-100 hover:border-gray-200"
                                            }`}
                                    >
                                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${selectedVendors.includes(vendor.id)
                                                ? "bg-emerald-600 border-emerald-600"
                                                : "border-gray-300"
                                            }`}>
                                            {selectedVendors.includes(vendor.id) && <Check size={14} className="text-white" />}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{vendor.name}</h4>
                                            <p className="text-sm text-gray-500 mt-1">{vendor.desc}</p>
                                            <p className="text-sm font-medium text-gray-600 mt-2">Qty: {vendor.qty}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-gray-400 mt-4 font-medium">{selectedVendors.length} vendors selected</p>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6">
                            <div>
                                <label className="text-sm font-bold text-gray-700 block mb-2 uppercase tracking-wide">Due Date</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        defaultValue="30-01-2026"
                                        className="w-full h-14 bg-white border border-gray-200 rounded-2xl px-6 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium"
                                    />
                                    <Calendar className="absolute right-6 top-1/2 -translate-y-1/2 text-blue-500" size={20} />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-bold text-gray-700 block mb-2 uppercase tracking-wide">CC Email</label>
                                <input
                                    type="email"
                                    placeholder="example@gmail.com"
                                    className="w-full h-14 bg-white border border-gray-200 rounded-2xl px-6 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-bold text-gray-700 block mb-2 uppercase tracking-wide">Email Subject</label>
                                <input
                                    type="text"
                                    placeholder="Auto-generated if left blank"
                                    className="w-full h-14 bg-white border border-gray-200 rounded-2xl px-6 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-bold text-gray-700 block mb-2 uppercase tracking-wide">Email Message</label>
                                <textarea
                                    rows={5}
                                    defaultValue={`Dear Vendor,\nWe request a quote for the following items\nBest regards,`}
                                    className="w-full bg-white border border-gray-200 rounded-2xl p-6 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium text-gray-600"
                                />
                                <p className="text-xs text-gray-400 mt-2 font-medium italic">This message will be sent to all selected vendors</p>
                            </div>

                            <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-6 space-y-3">
                                <h5 className="font-bold text-amber-900 mb-2">Summary</h5>
                                <p className="text-sm text-amber-800 font-medium tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">{selectedItems.length} items selected</p>
                                <p className="text-sm text-amber-800 font-medium tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">{selectedVendors.length} vendors will receive this RFQ</p>
                                <p className="text-sm text-amber-800/60 font-medium tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">Due date: Not set</p>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-6">
                            <label className="text-sm font-bold text-gray-700 block mb-2 uppercase tracking-wide">Terms Reference</label>
                            <div className="bg-white border-2 border-blue-100 rounded-[28px] p-8 space-y-4">
                                <p className="text-gray-600 leading-relaxed font-medium">
                                    This proposal is issued as an official quote with company logo and details.
                                    Key Terms & Conditions are mentioned above.
                                </p>
                                <p className="text-gray-600 leading-relaxed font-medium">
                                    Full Terms & Conditions are available at: <a href="https://www.transseas.com" className="text-blue-600 hover:underline font-bold">www.transseas.com</a>
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-8 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-4">
                    {step > 1 ? (
                        <button
                            onClick={handleBack}
                            className="px-10 py-4 rounded-2xl border-2 border-gray-200 font-bold text-gray-600 hover:bg-white transition-all active:scale-95"
                        >
                            Back
                        </button>
                    ) : (
                        <button
                            onClick={onClose}
                            className="px-10 py-4 rounded-2xl border-2 border-gray-200 font-bold text-gray-600 hover:bg-white transition-all active:scale-95"
                        >
                            Cancel
                        </button>
                    )}

                    {step < 4 ? (
                        <button
                            onClick={handleNext}
                            className="px-10 py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg active:scale-95 flex items-center justify-center min-w-[140px]"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            onClick={onClose}
                            className="px-10 py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg active:scale-95 flex items-center gap-2"
                        >
                            Send RFQ
                            <Send size={18} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateRFQModal;
