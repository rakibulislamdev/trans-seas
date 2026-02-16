import { Upload, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const DocumentSection = () => {
    return (
        <div className="space-y-6">
            {/* Upload Zone */}
            <div className="border-2 border-dashed border-blue-100 rounded-2xl p-12 bg-white flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50/30 transition-all">
                <div className="bg-[#0073BE] p-3 rounded-xl text-white mb-4">
                    <Upload size={24} />
                </div>
                <h4 className="font-bold text-gray-700 mb-1">Drop files here or click to upload</h4>
                <p className="text-xs text-gray-400">Supports PDF spec sheets and Excel BOQ files</p>
            </div>

            {/* Extracted Files List */}
            <div className="space-y-3">
                {[
                    { name: 'QIA-SOM-ZZ-XX-SP-I-10302 FURNITURE CUT SHEET.pdf', meta: 'spec sheet • 8134.5 KB • 29 items extracted' },
                    { name: '41201 - LOOSE FURNITURE.xlsx', meta: 'BOQ • 59.5 KB' }
                ].map((file, idx) => (
                    <div key={idx} className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl flex items-center justify-between group hover:bg-blue-50 transition-all">
                        <div className="flex items-center gap-4">
                            <div className="bg-[#0073BE] p-2.5 rounded-lg text-white">
                                <FileText size={20} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h5 className="font-bold text-gray-800 text-sm">{file.name}</h5>
                                    <span className="bg-green-100 text-green-600 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-green-200">extracted</span>
                                </div>
                                <p className="text-[11px] text-gray-400 mt-0.5 font-medium">{file.meta}</p>
                            </div>
                        </div>
                        <Button variant="outline" className="bg-white border-blue-200 text-[#0073BE] font-bold rounded-xl hover:bg-[#0073BE] hover:text-white transition-all">
                            Review
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};