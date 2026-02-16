import { Package, Send, DollarSign, FileText } from 'lucide-react';

const stats = [
    { label: 'Items', value: '29', icon: Package, color: 'bg-blue-600' },
    { label: "RFQ's", value: '4', icon: Send, color: 'bg-[#0073BE]' },
    { label: 'Quotes', value: '4', icon: DollarSign, color: 'bg-[#0073BE]' },
    { label: 'Proposals', value: '2', icon: FileText, color: 'bg-[#0073BE]' },
];

export const StatsCards = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {stats.map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-blue-50 shadow-sm flex items-start justify-between">
                    <div>
                        <p className="text-sm text-gray-400 font-medium mb-1">{item.label}</p>
                        <h3 className="text-4xl font-bold text-gray-800">{item.value}</h3>
                    </div>
                    <div className={`${item.color} p-2.5 rounded-lg text-white`}>
                        <item.icon size={22} />
                    </div>
                </div>
            ))}
        </div>
    );
};