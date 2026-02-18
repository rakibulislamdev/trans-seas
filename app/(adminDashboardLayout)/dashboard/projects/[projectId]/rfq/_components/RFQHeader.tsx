"use client";

import { Building2, Send, Clock, X } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface RFQHeaderProps {
    projectId: string;
    rfq: {
        id: string;
        status: string;
        project: string;
        projectCode: string;
        sentDate: string;
        dueDate: string;
    };
    onDelete: (id: string) => void;
}

export const RFQHeader = ({ rfq, projectId, onDelete }: RFQHeaderProps) => {
    const router = useRouter();

    const handleDeleteClick = () => {
        if (confirm("Are you sure you want to delete this RFQ?")) {
            onDelete(rfq.id);
            router.push(`/dashboard/projects/${projectId}`);
        }
    };

    return (
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="space-y-2">
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold tracking-tight">{rfq.id}</h1>
                    <Badge className={`${rfq.status === 'Sent' ? 'bg-[#0073BE]' : 'bg-amber-500'} text-white text-[10px] font-bold px-2 py-0 rounded-md uppercase`}>
                        {rfq.status}
                    </Badge>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-11 font-medium text-gray-400">
                    <div className="flex items-center gap-1.5"><Building2 size={14} className="text-[#0073BE]" /><span>{rfq.project} ({rfq.projectCode})</span></div>
                    <div className="flex items-center gap-1.5"><Send size={14} className="text-[#0073BE]" /><span>Sent Date: {rfq.sentDate}</span></div>
                    <div className="flex items-center gap-1.5"><Clock size={14} className="text-[#0073BE]" /><span>Due Date: {rfq.dueDate}</span></div>
                </div>
            </div>

            <Button
                variant="ghost"
                onClick={handleDeleteClick}
                className="h-14 px-4 py-4 flex items-center justify-center gap-2 rounded-2xl border border-[#878787] text-[#4B5563] font-semibold text-sm transition-all hover:bg-gray-50">
                <div className="border border-[#4B5563] rounded-full p-0.5 flex items-center justify-center">
                    <X size={10} />
                </div>
                <span className="text-[#4B5563] text-lg">Close RFQs</span>
            </Button>
        </header>
    );
};