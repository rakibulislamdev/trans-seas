import {
    ArrowLeft,
    Building2,
    Store,
    FileText,
    AlertCircle,
    Edit2,
    Copy
} from 'lucide-react';

const QuotesDetailsPage = () => {
    return (
        <div className="min-h-screen">
            {/* Header Section */}
            <div>
                <div className="flex items-center gap-4 mb-2">
                    <ArrowLeft className="w-6 h-6 text-blue-600 cursor-pointer" />
                    <h1 className="text-2xl font-bold">PTC-Q-2024-154</h1>
                    <span className="bg-orange-50 text-orange-400 text-xs px-3 py-1 rounded-full border border-orange-200">
                        Needs Review
                    </span>
                    <span className="bg-red-50 text-red-400 text-xs px-3 py-1 rounded-full border border-red-200">
                        Expired
                    </span>
                </div>

                <div className="flex gap-6 mb-8 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4 text-blue-500" />
                        <span>Grand Hyatt Tower Hotel (PRJ-2026-0001)</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Store className="w-4 h-4 text-blue-500" />
                        <span>Premium Textiles</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4 text-blue-500" />
                        <span>RFQ-2024-001</span>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <SummaryCard label="Total Amount" value="USD 68,750" />
                    <SummaryCard label="Quote Date" value="Jan 23, 2026" />
                    <SummaryCard label="Valid Until" value="Mar 23, 2026" valueClass="text-orange-600" />
                    <SummaryCard label="Item" value="2" />
                </div>

                {/* Terms Section */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                        <p className="text-sm text-slate-500 mb-1">Payment Terms</p>
                        <p className="font-medium text-slate-700 text-sm">40% advance, 60% on delivery</p>
                    </div>
                    <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                        <p className="text-sm text-slate-500 mb-1">Delivery Terms</p>
                        <p className="font-medium text-slate-700 text-sm">DDP Dubai, custom made 5-6 weeks</p>
                    </div>
                </div>

                {/* Items Table Section */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-blue-50/30 p-4 border-b border-slate-100">
                        <h2 className="text-xl font-semibold">Items</h2>
                    </div>

                    <div className="p-4">
                        <table className="w-full text-left border-separate border-spacing-y-3">
                            <thead>
                                <tr className="text-slate-400 text-xs uppercase">
                                    <th className="font-medium px-4">Item</th>
                                    <th className="font-medium">Quantity</th>
                                    <th className="font-medium">Unit Price</th>
                                    <th className="font-medium">Total</th>
                                    <th className="font-medium">Remarks</th>
                                    <th className="w-10"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <ItemRow
                                    title="Blackout Curtains - Full Drop"
                                    subtitle="Alternatives"
                                    qty="+"
                                    price="275"
                                    total="68,750"
                                    highlight
                                />
                                <ItemRow
                                    title="Blackout Curtains - Full Drop"
                                    subtitle="As Specified"
                                    qty="50"
                                    price="275"
                                    total="54,750"
                                />
                                <ItemRow
                                    title="Blackout Curtains - Full Drop"
                                    subtitle="As Specified"
                                    qty="65"
                                    price="275"
                                    total="48,750"
                                />
                                <ItemRow
                                    title="Blackout Curtains - Full Drop"
                                    subtitle="As Specified"
                                    qty="15"
                                    price="275"
                                    total="96,750"
                                />
                            </tbody>
                        </table>
                    </div>

                    <div className="p-6 border-t border-slate-100 flex justify-end">
                        <div className="text-right">
                            <p className="text-slate-400 text-xs mb-1">Total Amount</p>
                            <p className="text-xl font-bold">USD 68,750</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Sub-components
const SummaryCard = ({ label, value, valueClass = "" }: unknown) => (
    <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100">
        <p className="text-sm text-slate-500 mb-2">{label}</p>
        <p className={`text-xl font-bold ${valueClass}`}>{value}</p>
    </div>
);

const ItemRow = ({ title, subtitle, qty, price, total, highlight = false }: unknown) => (
    <tr className={`group rounded-xl border ${highlight ? 'bg-orange-50/30 border-orange-200' : 'bg-blue-50/20 border-blue-100'}`}>
        <td className="py-4 px-4 rounded-l-xl border-y border-l border-inherit">
            <div className="flex gap-3">
                {highlight ? <AlertCircle className="w-5 h-5 text-orange-400 mt-1" /> : <Copy className="w-5 h-5 text-slate-400 mt-1" />}
                <div>
                    <p className="font-bold text-sm text-slate-800">{title}</p>
                    <p className={`text-xs ${highlight ? 'text-orange-500' : 'text-teal-600'}`}>{subtitle}</p>
                </div>
            </div>
        </td>
        <td className="border-y border-inherit text-sm font-medium">{qty}</td>
        <td className="border-y border-inherit text-sm">USD {price}</td>
        <td className="border-y border-inherit text-sm font-medium">USD {total}</td>
        <td className="border-y border-inherit text-xs text-slate-500 max-w-[200px]">
            100% blackout lining, flame retardant certified
        </td>
        <td className="py-4 pr-4 rounded-r-xl border-y border-r border-inherit text-right">
            <Edit2 className="w-4 h-4 text-slate-400 cursor-pointer hover:text-blue-500 transition-colors" />
        </td>
    </tr>
);

export default QuotesDetailsPage;