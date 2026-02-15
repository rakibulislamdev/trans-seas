import { Icons } from '@/components/icons/Icons';
import { Quote } from '@/lib/types';

export default function QuoteCard({ quote }: { quote: Quote }) {
    return (
        <div className="bg-card border border-brand-primary/25 rounded-2xl p-5 md:p-7 shadow-sm hover:shadow-md transition-all">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-5">
                <div className="flex-1">
                    <h3 className="text-24 font-semibold text-text-strong mb-4">{quote.id}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap items-center gap-x-6 gap-y-3 text-xs text-text-weak">
                        <div className="flex items-center gap-2"><Icons.Folder size={24} /> {quote.project}</div>
                        <div className="flex items-center gap-2"><Icons.Building size={24} /> {quote.vendor}</div>
                        <div className="flex items-center gap-2 font-bold text-text-strong-black"><Icons.Dollar size={24} /> {quote.amount}</div>
                        <div className="text-prj-gray">{quote.items} item</div>
                        <div className="flex items-center gap-2"><Icons.Calendar size={24} /> {quote.date}</div>
                        <div className="text-prj-gray italic text-tiny">valid until {quote.validUntil}</div>
                    </div>
                </div>

                {/* Status Actions - Simplified for brevity */}
                <div className="flex items-center gap-3 pt-4 lg:pt-0 border-t lg:border-none border-border/50">
                    <button className="flex items-center gap-2 px-3 py-2.5 border border-warning-text/30 bg-warning-text/5 text-warning-text rounded-lg text-14 font-normal">
                        {quote.status === 'Approved' ? <Icons.Check size={24} /> : <Icons.Eye size={24} />}
                        {quote.status}
                    </button>
                    {quote.status !== 'Needs Review' && <Icons.ChevronDown size={24} className="cursor-pointer" />}
                </div>
            </div>

            {quote.hasAlert && (
                <div className="mt-6 pt-5 border-t border-border flex items-center gap-2 text-warning-text text-14 font-normal">
                    <Icons.Warning size={24} className="fill-warning-text" />
                    1 items need attention
                </div>
            )}
        </div>
    );
}