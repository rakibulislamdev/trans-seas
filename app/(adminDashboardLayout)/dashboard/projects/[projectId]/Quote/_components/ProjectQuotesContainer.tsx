import { QuoteHeader } from './QuoteHeader';
import { QuoteCard, QuoteData } from './QuoteCard';

const MOCK_DATA: QuoteData[] = [
    {
        id: "PTC-Q-2024-154",
        hotelName: "Marina Bay Hotel",
        projectCode: "PRJ-2026-0001",
        category: "Premium Textiles",
        currency: "$",
        amount: "68,750",
        itemCount: 1,
        date: "Jan 23, 2026",
        validUntil: "Mar 23, 2026",
        status: "Needs Review",
        attentionRequired: true,
    },
    {
        id: "PTC-Q-2024-155",
        hotelName: "Grand Hyatt",
        projectCode: "PRJ-2026-0042",
        category: "Luxury Linens",
        currency: "$",
        amount: "42,300",
        itemCount: 3,
        date: "Feb 10, 2026",
        validUntil: "Apr 10, 2026",
        status: "Parsed",
    },
    {
        id: "PTC-Q-2024-156",
        hotelName: "The Ritz-Carlton",
        projectCode: "PRJ-2026-0088",
        category: "Tableware",
        currency: "$",
        amount: "15,200",
        itemCount: 1,
        date: "Feb 15, 2026",
        validUntil: "Apr 15, 2026",
        status: "Approved",
    }
];

export default function ProjectQuotesContainer() {
    const reviewCount = MOCK_DATA.filter(q => q.status === 'Needs Review').length;

    return (
        <div className="min-h-screen">
            <QuoteHeader totalQuotes={MOCK_DATA.length} reviewCount={reviewCount} />

            <div className="space-y-4">
                {MOCK_DATA.map((quote) => (
                    <QuoteCard key={quote.id} quote={quote} />
                ))}
            </div>
        </div>
    );
}