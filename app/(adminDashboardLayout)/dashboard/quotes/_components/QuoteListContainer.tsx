"use client";
import { Quote } from '@/lib/types';
import { useState, useMemo } from 'react';
import QuoteFilterTabs from './QuoteFilterTabs';
import QuoteSearchActions from './QuoteSearchActions';
import QuoteCard from './QuoteCard';

export default function QuoteListContainer({ initialQuotes }: { initialQuotes: Quote[] }) {
    const [activeTab, setActiveTab] = useState("All Quotes");
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All Status");

    const filteredQuotes = useMemo(() => {
        return initialQuotes.filter((quote) => {
            const matchesSearch = quote.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                quote.project.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesTab = activeTab === "All Quotes" || (activeTab === "Needs Review" && quote.status === "Needs Review");
            const matchesStatus = statusFilter === "All Status" || quote.status === statusFilter;
            return matchesSearch && matchesTab && matchesStatus;
        });
    }, [searchQuery, activeTab, statusFilter, initialQuotes]);

    return (
        <>
            <QuoteFilterTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                totalCount={initialQuotes.length}
                needsReviewCount={initialQuotes.filter(q => q.status === 'Needs Review').length}
            />

            <QuoteSearchActions
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            />

            <div className="flex flex-col gap-5">
                {filteredQuotes.length > 0 ? (
                    filteredQuotes.map((quote) => <QuoteCard key={quote.id} quote={quote} />)
                ) : (
                    <div className="text-center py-20 text-text-weak border-2 border-dashed border-border rounded-2xl">
                        No quotes found.
                    </div>
                )}
            </div>
        </>
    );
}