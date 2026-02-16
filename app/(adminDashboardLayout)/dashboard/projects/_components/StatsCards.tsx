import { Package, Send, DollarSign, FileText } from 'lucide-react';

const stats = [
    { label: 'Items', value: '29', icon: Package, color: 'bg-blue-600' },
    { label: "RFQ's", value: '4', icon: Send, color: 'bg-[#0073BE]' },
    { label: 'Quotes', value: '4', icon: DollarSign, color: 'bg-[#0073BE]' },
    { label: 'Proposals', value: '2', icon: FileText, color: 'bg-[#0073BE]' },
];

export const StatsCards = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
            {stats.map((item, idx) => (
                <div key={idx} className="bg-white p-3 md:p-5 rounded-xl md:rounded-2xl border border-blue-50 shadow-sm flex items-start justify-between transition-all">
                    <div className="min-w-0">
                        <p className="text-[10px] md:text-sm text-gray-400 font-medium mb-0.5 md:mb-1 uppercase tracking-wider md:capitalize">{item.label}</p>
                        <h3 className="text-xl md:text-4xl font-bold text-gray-800">{item.value}</h3>
                    </div>
                    <div className={`${item.color} p-1.5 md:p-2.5 rounded-lg text-white shrink-0`}>
                        <item.icon className="w-4 h-4 md:w-5.5 md:h-5.5" />
                    </div>
                </div>
            ))}
        </div>
    );
};