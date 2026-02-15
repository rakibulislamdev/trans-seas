export default function QuoteFilterTabs({ activeTab, setActiveTab, totalCount, needsReviewCount }: any) {
    const tabs = [
        { name: 'All Quotes', count: totalCount },
        { name: 'Today', count: 2 },
        { name: 'Needs Review', count: needsReviewCount }
    ];

    return (
        <div className="inline-flex p-1 bg-brand-primary/5 rounded-xl mb-8 border border-brand-primary/10 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
                <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={`flex items-center gap-2 px-5 py-2 rounded-lg text-14 font-medium transition-all shrink-0 cursor-pointer ${activeTab === tab.name ? 'bg-white text-text-strong shadow-sm' : 'text-text-weak hover:text-text-strong'
                        }`}
                >
                    {tab.name}
                    <span className={`px-2 py-0.5 rounded-md ${activeTab === tab.name ? 'bg-prj-gray/20 text-text-strong' : 'bg-brand-primary/10 text-brand-primary'
                        }`}>
                        {tab.count}
                    </span>
                </button>
            ))}
        </div>
    );
}