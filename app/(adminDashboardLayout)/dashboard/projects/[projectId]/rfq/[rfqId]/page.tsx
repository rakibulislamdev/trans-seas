"use client";

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { RFQHeader } from '../_components/RFQHeader';
import { RFQEmailPreview } from '../_components/RFQEmailPreview';
import { RFQItemsTable } from '../_components/RFQItemsTable';
import { RFQVendorList } from '../_components/RFQVendorList';

// INITIAL MOCK DATA
const INITIAL_RFQS = [
    {
        id: "RFQ-2024-0101",
        project: "Marina Bay Hotel",
        projectCode: "PRJ-2026-0001",
        dueDate: "1/30/2026",
        sentDate: "1/15/2026",
        status: "Sent"
    },
    {
        id: "RFQ-2024-0102",
        project: "Marina Bay Hotel",
        projectCode: "PRJ-2026-0001",
        dueDate: "1/30/2026",
        sentDate: "1/15/2026",
        status: "Follow-Up"
    },
];

export default function RFQDetailPage({ params }: { params: Promise<{ projectId: string, rfqId: string }> }) {
    const { projectId, rfqId } = use(params);
    const router = useRouter();

    const [rfqList, setRfqList] = useState(INITIAL_RFQS);

    // Find the current RFQ
    const currentRfq = rfqList.find(rfq => rfq.id === rfqId);

    // Filter Logic: Delete RFQ from mock data
    const handleDeleteRFQ = (id: string) => {
        const updatedList = rfqList.filter(rfq => rfq.id !== id);
        setRfqList(updatedList);
    };

    if (!currentRfq) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <p className="text-gray-500 mb-4">RFQ not found or has been deleted.</p>
                <button onClick={() => router.push(`/dashboard/projects/${projectId}`)} className="text-blue-500 font-bold underline">
                    Go back to Project
                </button>
            </div>
        );
    }

    return (
        <main className="mx-auto min-h-screen">
            {/* Back Button */}
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors group"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-bold text-lg">Back to List</span>
            </button>

            <div className="space-y-8">
                {/* Header with Delete functionality */}
                <RFQHeader
                    rfq={currentRfq}
                    projectId={projectId}
                    onDelete={handleDeleteRFQ}
                />

                <RFQEmailPreview rfq={currentRfq} />

                <RFQItemsTable items={[
                    { id: "#1", name: "Wall-Mounted Bathroom Sink", specs: "Ceramic, 600×450mm", qty: "62 pcs", supplier: "Kohler" },
                    { id: "#2", name: "Mixer Tap", specs: "Stainless Steel", qty: "50 pcs", supplier: "Grohe" }
                ]} />

                <RFQVendorList vendors={[
                    { name: "BuildTech Supply Co.", date: "01-28-2026", status: "Received" },
                    { name: "Global Fixtures Inc", date: null, status: "Follow-Up" }
                ]} />
            </div>
        </main>
    );
}