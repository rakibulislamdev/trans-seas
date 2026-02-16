"use client";

import {
    Download,
    Send,
    CalendarDays,
} from "lucide-react";

const ProposalPreview = () => {
    return (
        <div className="min-h-screen p-6 flex justify-center">
            <div className="w-full max-w-5xl space-y-6">

                {/* Header */}
                <div className="bg-white rounded-xl border p-5 shadow-sm">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                        <div>
                            <h1 className="font-semibold text-lg">
                                Hotel Aurora FF&E Procurement - Proposal
                            </h1>
                            <span className="text-xs bg-gray-200 px-2 py-0.5 rounded ml-2">
                                Draft
                            </span>
                        </div>

                        <div className="flex gap-2">
                            <button className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border hover:bg-gray-50">
                                <Download size={16} />
                                Download Excel
                            </button>
                            <button className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border hover:bg-gray-50">
                                <Download size={16} />
                                Download PDF
                            </button>
                            <button className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                                <Send size={16} />
                                Send to Client
                            </button>
                        </div>
                    </div>
                </div>

                {/* Cover Section */}
                <Section title="Cover Section">
                    <div className="grid md:grid-cols-2 gap-4">
                        <Input label="Project Name" value="Hotel Aurora FF&E Procurement" />
                        <Input label="Client Name" value="Aurora Hospitality Group" />
                        <DateInput label="Date" value="30/01/2026" />
                        <DateInput label="Valid Until" value="" />
                    </div>

                    <div className="mt-4">
                        <label className="text-sm font-medium">Scope of Supply</label>
                        <textarea
                            className="w-full mt-1 rounded-lg border p-3 text-sm bg-gray-50"
                            rows={3}
                            defaultValue="This proposal includes the supply of furniture, fixtures, and equipment (FF&E) as specified below for the Hotel Aurora project."
                        />
                    </div>
                </Section>

                {/* Pricing Table */}
                <Section title="Pricing Table">
                    <div className="text-xs bg-blue-50 text-blue-700 p-2 rounded mb-3">
                        Note: Pricing is automatically pulled from the approved cost sheet.
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-gray-600">
                                <tr>
                                    <th className="p-3 text-left">#</th>
                                    <th className="p-3 text-left">Item Description</th>
                                    <th className="p-3 text-left">Selected Vendor</th>
                                    <th className="p-3 text-left">Unit Cost</th>
                                    <th className="p-3 text-left">Qty</th>
                                    <th className="p-3 text-right">Total Cost</th>
                                </tr>
                            </thead>

                            <tbody>
                                {[1, 2, 3].map((i) => (
                                    <tr key={i} className="border-t">
                                        <td className="p-3">{i}</td>
                                        <td className="p-3 text-blue-600">
                                            Wall-Mounted Bathroom Sink
                                        </td>
                                        <td className="p-3">Premier Materials Ltd</td>
                                        <td className="p-3">1,250</td>
                                        <td className="p-3">50 pcs</td>
                                        <td className="p-3 text-right">$62,500</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="text-right font-medium mt-3">
                        TOTAL NET COST <span className="text-blue-600">USD 133,066.5</span>
                    </div>
                </Section>

                {/* Markup */}
                <Section title="Markup & Expense Configuration">
                    <div className="space-y-3">
                        {["Packing", "Delivery", "Upholstery Estimate", "Shipping", "Insurance", "Banking"].map(
                            (item) => (
                                <div key={item} className="flex justify-between bg-gray-50 rounded-lg p-3 text-sm">
                                    <span>{item}</span>
                                    <span className="font-medium">USD 8,375.00</span>
                                </div>
                            )
                        )}
                    </div>
                </Section>

                {/* Financial Summary */}
                <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white rounded-xl p-6 shadow">
                    <h3 className="font-semibold mb-4">Financial Summary</h3>

                    <SummaryRow label="Total NET Cost" value="USD 187,500.00" />
                    <SummaryRow label="Total Markups (6 items)" value="USD 67,875.00" />
                    <SummaryRow label="Subtotal (Before tax)" value="USD 274,875.00" />
                    <SummaryRow label="Tax 5%" value="USD 13,743.88" />

                    <div className="border-t border-white/30 my-3" />

                    <SummaryRow
                        label="Final Selling Price"
                        value="USD 288,421.88"
                        big
                    />

                    <div className="flex justify-between text-sm mt-3">
                        <span>Client Proposal Price (excluding internal markups)</span>
                        <span className="text-yellow-300 font-semibold">
                            Hidden Profit Margin USD 43,125.00
                        </span>
                    </div>
                </div>

                {/* Commercial Terms */}
                <Section title="Commercial Terms">
                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                        <Input label="Delivery Timeline" value="8-10 weeks from order confirmation" />
                        <Input label="Payment Terms" value="40% advance payment, 60% before delivery" />
                        <Input label="Warranty" value="12 month manufacturer warranty on all items" />
                        <Input label="Terms & Conditions" value="Prices valid for 30 days, Subject to material availability." />
                    </div>
                </Section>

                {/* Proposal Summary */}
                <Section title="Proposal Summary">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Info label="Valid Until" value="05-02-2026" />
                        <Info label="Total Items" value="3" />
                        <Info label="Total Value" value="$73,605.25" green large />
                    </div>
                </Section>
            </div>
        </div>
    );
};

export default ProposalPreview;

/* ---------- Small Components ---------- */

const Section = ({ title, children }: any) => (
    <div className="bg-white rounded-[24px] border border-[#BFDBFE] p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-[#1E293B] mb-6">{title}</h2>
        {children}
    </div>
);

const Input = ({ label, value }: any) => (
    <div className="space-y-2">
        <label className="text-sm font-bold text-[#1E293B]">{label}</label>
        <input
            className="w-full rounded-[12px] border border-[#BFDBFE] px-4 py-3 bg-white text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/10 transition-all font-medium"
            defaultValue={value}
        />
    </div>
);

const DateInput = ({ label, value }: any) => (
    <div>
        <label className="text-sm font-medium">{label}</label>
        <div className="relative mt-1">
            <input
                className="w-full rounded-lg border p-2 pr-9 bg-gray-50 text-sm"
                defaultValue={value}
            />
            <CalendarDays
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
        </div>
    </div>
);

const SummaryRow = ({ label, value, big }: any) => (
    <div className="flex justify-between text-sm py-1">
        <span className={big ? "font-semibold text-lg" : ""}>{label}</span>
        <span className={big ? "font-semibold text-lg" : ""}>{value}</span>
    </div>
);

const Info = ({ label, value, green, large }: any) => (
    <div className="flex flex-col gap-1.5">
        <div className="text-[#1E293B] text-sm font-bold">{label}</div>
        <div
            className={`font-bold transition-all ${green ? "text-[#059669]" : "text-[#1E293B]"
                } ${large ? "text-[32px] leading-tight" : "text-base"}`}
        >
            {value}
        </div>
    </div>
);
