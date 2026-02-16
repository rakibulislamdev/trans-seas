"use client";

import { useRef } from 'react';
import { Upload, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const DocumentSection = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log("Selected file:", file.name);
        }
    };

    return (
        <div className="space-y-4 md:space-y-6 px-1 md:px-0">
            {/* Hidden File Input */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf"
                className="hidden"
            />

            {/* Upload Zone - Responsive Padding & Text */}
            <div
                onClick={handleUploadClick}
                className="border-2 border-dashed border-blue-100 rounded-2xl p-8 md:p-12 bg-white flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50/40 transition-all active:scale-[0.98]"
            >
                <div className="bg-[#0073BE] p-2.5 md:p-3 rounded-xl text-white mb-3 md:mb-4 shadow-lg shadow-blue-100">
                    <Upload size={20} className="md:w-6 md:h-6" />
                </div>
                <h4 className="font-bold text-gray-700 text-sm md:text-base mb-1">
                    Drop files here or click to upload
                </h4>
                <p className="text-[10px] md:text-xs text-gray-400 max-w-50 md:max-w-none">
                    Supports PDF spec sheets and Excel BOQ files
                </p>
            </div>

            {/* Extracted Files List - Responsive Layout */}
            <div className="space-y-3">
                {[
                    { name: 'QIA-SOM-ZZ-XX-SP-I-10302 FURNITURE CUT SHEET.pdf', meta: 'spec sheet • 8134.5 KB • 29 items extracted' },
                    { name: '41201 - LOOSE FURNITURE.xlsx', meta: 'BOQ • 59.5 KB' }
                ].map((file, idx) => (
                    <div key={idx} className="bg-blue-50/50 border border-blue-100 p-3 md:p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group hover:bg-blue-50 transition-all">
                        <div className="flex items-start gap-3 md:gap-4 w-full sm:w-auto">
                            <div className="bg-[#0073BE] p-2 md:p-2.5 rounded-lg text-white shrink-0">
                                <FileText size={18} className="md:w-5 md:h-5" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h5 className="font-bold text-gray-800 text-xs md:text-sm truncate max-w-[180px] md:max-w-[300px]">
                                        {file.name}
                                    </h5>
                                    <span className="bg-green-100 text-green-600 text-[9px] md:text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-green-200">
                                        extracted
                                    </span>
                                </div>
                                <p className="text-[10px] md:text-11 text-gray-400 mt-1 font-medium">
                                    {file.meta}
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            className="w-full sm:w-auto bg-white border-blue-200 text-[#0073BE] text-xs md:text-sm font-bold rounded-xl h-9 md:h-10 px-6 hover:bg-[#0073BE] hover:text-white transition-all"
                        >
                            Review
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};