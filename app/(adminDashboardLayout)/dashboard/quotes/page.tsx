import { Quote } from "@/lib/types";
import QuoteListContainer from "./_components/QuoteListContainer";


const mockQuotes: Quote[] = [
  { id: 'PTC-Q-2024-154', status: 'Needs Review', project: 'Marina Bay Hotel FF&E', vendor: 'Premium Textiles', amount: 'AED 68,750', items: 1, date: 'Jan 23, 2026', validUntil: 'Mar 23, 2026', hasAlert: true },
  { id: 'PTC-Q-2024-155', status: 'Parsed', project: 'Downtown Suite', vendor: 'Global Decor', amount: 'AED 45,000', items: 3, date: 'Jan 24, 2026', validUntil: 'Mar 24, 2026', hasAlert: false },
  { id: 'PTC-Q-2024-156', status: 'Approved', project: 'Palm Jumeirah Villa', vendor: 'Elite Furnishing', amount: 'AED 120,000', items: 5, date: 'Jan 25, 2026', validUntil: 'Mar 25, 2026', hasAlert: false },
  { id: 'PTC-Q-2024-157', status: 'Needs Review', project: 'Skyline Tower', vendor: 'Modern Build', amount: 'AED 88,200', items: 2, date: 'Jan 26, 2026', validUntil: 'Mar 26, 2026', hasAlert: true },
];

const QuotesPage = () => {
  return (
    <div className="min-h-screen bg-dashboard-bg">
      <div>
        {/* Title Section - Static */}
        <div className="hidden md:block mb-8">
          <h1 className="text-strong font-semibold text-24">Quotes</h1>
          <p className="text-text-weak text-body mt-1">{mockQuotes.length} quotes received</p>
        </div>

        {/* Client Side Logic Wrapper */}
        <QuoteListContainer initialQuotes={mockQuotes} />
      </div>
    </div>
  );
};

export default QuotesPage;