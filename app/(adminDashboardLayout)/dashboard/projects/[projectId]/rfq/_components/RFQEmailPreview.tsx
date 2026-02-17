"use client";

interface RFQEmailPreviewProps {
    rfq: {
        project: string;
        id: string;
        dueDate: string;
    };
}

export const RFQEmailPreview = ({ rfq }: RFQEmailPreviewProps) => (
    <section className="border border-blue-100 rounded-2xl overflow-hidden mb-8 shadow-sm">
        <div className="bg-white p-4 border-b border-gray-50">
            <h2 className="font-bold text-lg">Email Message to Vendors</h2>
        </div>
        <div className="bg-[#F8FBFE] p-6 text-sm leading-relaxed text-gray-700">
            <p className="font-bold mb-4 text-gray-900">Subject: <span className="font-medium">RFQ for attached items.</span></p>
            <div className="space-y-4">
                <p>Dear Vendor,<br />We are pleased to invite you to submit a quotation for the following project:</p>
                <div className="font-bold text-gray-900">
                    <p>Project: {rfq.project}</p>
                    <p>RFQ Number: {rfq.id}</p>
                    <p>Commodity: STONE</p>
                    <p>Due Date: {rfq.dueDate}</p>
                </div>
                <p>Please review the attached item list and provide your best pricing. All quotes must include unit prices, lead times, and any relevant certifications.</p>
                <div className="pt-2">
                    <p>Best regards,</p>
                    <p className="font-bold">Procurement Team</p>
                </div>
            </div>
        </div>
    </section>
);