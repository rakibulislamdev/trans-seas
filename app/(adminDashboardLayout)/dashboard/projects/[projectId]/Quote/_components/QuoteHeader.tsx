
interface QuoteHeaderProps {
    totalQuotes: number;
    reviewCount: number;
}

export const QuoteHeader: React.FC<QuoteHeaderProps> = ({ totalQuotes, reviewCount }) => {
    return (
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
                <span className="text-gray-500 text-sm">{totalQuotes} Quotes received</span>
                {reviewCount > 0 && (
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded">
                        {reviewCount} Need Review
                    </span>
                )}
            </div>
            <button className="bg-sky-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-sky-700 transition-all active:scale-95 shadow-sm">
                Compare Quotes
            </button>
        </div>
    );
};