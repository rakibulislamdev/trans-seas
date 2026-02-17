import {
    FileText, Package, Calendar, AlertTriangle,
    Eye, CheckCircle, MoreHorizontal, LucideIcon
} from 'lucide-react';

export type QuoteStatus = 'Needs Review' | 'Parsed' | 'Approved';

export interface QuoteData {
    id: string;
    hotelName: string;
    projectCode: string;
    category: string;
    amount: string;
    currency: string;
    itemCount: number;
    date: string;
    validUntil: string;
    status: QuoteStatus;
    attentionRequired?: boolean;
}

const statusConfig: Record<QuoteStatus, { icon: LucideIcon; className: string }> = {
    'Needs Review': { icon: Eye, className: 'border-amber-200 bg-amber-50 text-amber-700' },
    'Approved': { icon: CheckCircle, className: 'border-emerald-200 bg-emerald-50 text-emerald-700' },
    'Parsed': { icon: Package, className: 'bg-gray-100 text-gray-600 border-transparent' },
};

export const QuoteCard: React.FC<{ quote: QuoteData }> = ({ quote }) => {
    const { icon: StatusIcon, className: statusClass } = statusConfig[quote.status];

    return (
        <div className="bg-white border border-blue-50 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div className="space-y-3">
                    <h2 className="text-xl font-bold text-gray-800">{quote.id}</h2>

                    {/* Info Grid */}
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-500 text-sm">
                        <div className="flex items-center gap-2">
                            <FileText size={18} className="text-gray-400" />
                            <div>
                                <p className="font-medium text-gray-700 leading-tight">{quote.hotelName}</p>
                                <p className="text-11">{quote.projectCode}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Package size={18} className="text-gray-400" />
                            <span className="text-gray-700">{quote.category}</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <span className="text-lg font-bold text-gray-900">{quote.currency}</span>
                            <span className="font-bold text-gray-700">{quote.amount}</span>
                        </div>

                        <div className="text-gray-700 font-medium">{quote.itemCount} Item</div>

                        <div className="flex items-center gap-2">
                            <Calendar size={18} className="text-gray-400" />
                            <span>{quote.date} <span className="mx-1 text-gray-300">|</span> valid until {quote.validUntil}</span>
                        </div>
                    </div>

                    {/* Attention Message */}
                    {quote.attentionRequired && (
                        <div className="flex items-center gap-2 text-amber-600 text-xs font-semibold mt-1">
                            <AlertTriangle size={14} />
                            <span>1 items need attention</span>
                        </div>
                    )}
                </div>

                {/* Dynamic Status Badge */}
                <div className="flex items-center gap-1">
                    <div className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg ${statusClass}`}>
                        <StatusIcon size={16} />
                        <span className="text-sm font-medium">{quote.status}</span>
                    </div>
                    {quote.status === 'Parsed' && (
                        <button className="p-1.5 hover:bg-gray-200 rounded-full transition-colors">
                            <MoreHorizontal size={18} className="text-gray-400" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};