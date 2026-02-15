import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function QuoteSearchActions({ searchQuery, setSearchQuery, statusFilter, setStatusFilter }: any) {
    const [isOpen, setIsOpen] = useState(false);
    const statuses = ["All Status", "Needs Review", "Parsed", "Approved"];

    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative w-full sm:w-1/2">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-weak" size={20} />
                <Input
                    placeholder="Search quotes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-14 pl-12 pr-4 bg-dashboard-bg/50 border-0 ring-1 ring-inset ring-prj-gray/50 focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg text-14"
                />
            </div>

            <div className="relative">
                <Button
                    variant="outline"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex h-14 items-center justify-between px-5 bg-dashboard-bg/50 border-prj-gray/50 rounded-xl w-full sm:min-w-44 text-prj-gray!"
                >
                    {statusFilter} <ChevronDown size={20} className={`ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </Button>

                {isOpen && (
                    <div className="absolute z-10 mt-2 w-full bg-white border border-border rounded-xl shadow-lg overflow-hidden">
                        {statuses.map(s => (
                            <div key={s} onClick={() => { setStatusFilter(s); setIsOpen(false); }} className="px-5 py-3 hover:bg-brand-primary/5 cursor-pointer text-14 text-text-weak">
                                {s}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}