"use client";

import React, { useState } from "react";
import { ChevronDown, Calendar, Send, Check } from "lucide-react";
import { ReusableModal } from "@/components/common/ReusableModal";
import { toast } from "sonner";

interface CreateRFQModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreateRFQModal = ({ isOpen, onClose }: CreateRFQModalProps) => {
    const [step, setStep] = useState(1);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectedVendors, setSelectedVendors] = useState<number[]>([]);

    const steps = [
        { id: 1, label: "Items" },
        { id: 2, label: "Vendors" },
        { id: 3, label: "Review" },
        { id: 4, label: "T&C" },
    ];

    const resetForm = () => {
        setStep(1);
        setSelectedItems([]);
        setSelectedVendors([]);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleNext = () => setStep((prev) => Math.min(prev + 1, 4));
    const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

    const handleSendRFQ = () => {
        // Perform send logic here
        toast.success("RFQ Sent Successfully!", {
            description: "Your RFQ has been sent to the selected vendors.",
        });
        handleClose();
    };

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
        <ReusableModal
            isOpen={isOpen}
            onOpenChange={(open) => !open && handleClose()}
            title="Create New RFQ"
            className="sm:max-w-2xl lg:max-w-3xl"
        >
            <div className="flex flex-col h-full max-h-[85vh]">
                {/* Steps Progress - Scrollable on Mobile */}
                <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-4 mb-4 sm:mb-8 no-scrollbar">
                    {steps.map((s, idx) => (
                        <React.Fragment key={s.id}>
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs sm:text-sm font-bold transition-all ${step >= s.id ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-400"
                                    }`}>
                                    {s.id}
                                </div>
                                <span className={`text-xs sm:text-sm font-semibold whitespace-nowrap ${step >= s.id ? "text-blue-600" : "text-gray-400"
                                    }`}>
                                    {s.label}
                                </span>
                            </div>
                            {idx < steps.length - 1 && (
                                <div className="h-[2px] w-4 sm:w-6 bg-gray-100 flex-shrink-0" />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Modal Content - Dynamic Height */}
                <div className="flex-1 overflow-y-auto pr-1 sm:pr-2 custom-scrollbar min-h-0">
                    {step === 1 && (
                        <div className="space-y-4 sm:space-y-6">
                            <div>
                                <label className="text-[10px] sm:text-xs font-bold text-gray-700 block mb-2 uppercase tracking-wider">Select Project</label>
                                <div className="relative">
                                    <select className="w-full h-12 sm:h-14 bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl px-4 sm:px-6 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm sm:text-base font-medium">
                                        <option>Grand Hyatt Tower Hotel (HYT-2026-0D1)</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] sm:text-xs font-bold text-gray-700 block mb-3 uppercase tracking-wider">Select Items</label>
                                <div className="grid grid-cols-1 gap-3">
                                    {[
                                        { id: 1, name: "Wall-Mounted Bathroom Sink", desc: "Ceramic, 600x450mm, white finish", qty: "50 pcs" },
                                        { id: 2, name: "LED Ceiling Light", desc: "40w, 4000k, dimmable, IP44", qty: "35 pcs" },
                                        { id: 3, name: "LED Tube Ceiling Light", desc: "40w, 4000k, dimmable, IP44", qty: "35 pcs" }
                                    ].map((item) => (
                                        <div
                                            key={item.id}
                                            onClick={() => toggleItem(item.id)}
                                            className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all cursor-pointer flex gap-3 sm:gap-4 ${selectedItems.includes(item.id) ? "border-blue-600 bg-blue-50/30" : "border-gray-100 hover:border-gray-200"
                                                }`}
                                        >
                                            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${selectedItems.includes(item.id) ? "bg-emerald-600 border-emerald-600" : "border-gray-300"
                                                }`}>
                                                {selectedItems.includes(item.id) && <Check size={12} className="text-white" />}
                                            </div>
                                            <div>
                                                <h4 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">{item.name}</h4>
                                                <p className="text-[11px] sm:text-xs text-gray-500 mt-1">{item.desc}</p>
                                                <p className="text-[11px] sm:text-xs font-bold text-blue-600 mt-2">Qty: {item.qty}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-3 sm:space-y-4">
                            <label className="text-[10px] sm:text-xs font-bold text-gray-700 block uppercase tracking-wider">Select Vendors</label>
                            {[
                                { id: 1, name: "Global Furniture Solution", location: "Dubai, UAE" },
                                { id: 2, name: "LED Solution Ltd", location: "London, UK" }
                            ].map((vendor) => (
                                <div key={vendor.id} onClick={() => toggleVendor(vendor.id)} className={`p-4 rounded-xl border-2 cursor-pointer flex gap-3 transition-all ${selectedVendors.includes(vendor.id) ? "border-blue-600 bg-blue-50/30" : "border-gray-100"}`}>
                                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${selectedVendors.includes(vendor.id) ? "bg-emerald-600 border-emerald-600" : "border-gray-300"}`}>
                                        {selectedVendors.includes(vendor.id) && <Check size={12} className="text-white" />}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900">{vendor.name}</h4>
                                        <p className="text-xs text-gray-500">{vendor.location}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold text-gray-700 block mb-1 uppercase">Due Date</label>
                                    <div className="relative">
                                        <input type="text" defaultValue="30-01-2026" className="w-full h-11 bg-white border border-gray-200 rounded-xl px-4 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none" />
                                        <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500" size={16} />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-700 block mb-1 uppercase">CC Email</label>
                                    <input type="email" placeholder="example@gmail.com" className="w-full h-11 bg-white border border-gray-200 rounded-xl px-4 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-gray-700 block mb-1 uppercase">Email Message</label>
                                <textarea rows={4} className="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm font-medium text-gray-600 focus:ring-2 focus:ring-blue-500/20 outline-none" defaultValue={`Dear Vendor,\nWe request a quote for the following items.`} />
                            </div>
                            <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-4">
                                <h5 className="text-xs font-bold text-amber-900 mb-1">Summary</h5>
                                <p className="text-[11px] text-amber-800 font-medium">{selectedItems.length} items • {selectedVendors.length} vendors</p>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-4">
                            <label className="text-[10px] font-bold text-gray-700 block uppercase">Terms Reference</label>
                            <div className="bg-blue-50/30 border-2 border-blue-100 rounded-2xl p-5 sm:p-8">
                                <p className="text-sm text-gray-600 leading-relaxed font-medium mb-4">
                                    Official quote with company logo. Key terms mentioned above.
                                </p>
                                <p className="text-sm text-gray-600 font-medium">
                                    Full T&C: <a href="#" className="text-blue-600 hover:underline font-bold">www.transseas.com</a>
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Buttons - Compact and Responsive */}
                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-50">
                    <button
                        onClick={step > 1 ? handleBack : handleClose}
                        className="flex-1 sm:flex-none px-12 py-3 rounded-md border-2 border-gray-100 font-bold text-sm text-gray-500 hover:bg-gray-50 transition-all active:scale-95"
                    >
                        {step > 1 ? "Back" : "Cancel"}
                    </button>

                    <button
                        onClick={step < 4 ? handleNext : handleSendRFQ}
                        className="flex-[2] sm:flex-none px-12 py-3 rounded-md bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                    >
                        {step < 4 ? "Next" : "Send RFQ"}
                        {step === 4 && <Send size={16} />}
                    </button>
                </div>
            </div>
        </ReusableModal>
    );
};

export default CreateRFQModal;
