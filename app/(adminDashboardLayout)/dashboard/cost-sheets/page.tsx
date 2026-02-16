import { Search, Eye } from 'lucide-react';
import Link from 'next/link';

const CostSheets = () => {
  const costSheets = [
    {
      id: 1,
      title: 'Grand Hyatt',
      date: 'Feb 10, 2026',
      items: 4,
      amount: 52888.00
    },
    {
      id: 2,
      title: 'Sheraton Hotel',
      date: 'Jan 28, 2026',
      items: 6,
      amount: 83076.00
    },
    {
      id: 3,
      title: 'Marina Tower',
      date: 'Dec 15, 2026',
      items: 10,
      amount: 97517.00
    },
    {
      id: 3,
      title: 'Marina Tower',
      date: 'Dec 15, 2026',
      items: 10,
      amount: 97517.00
    }
  ];

  const formatCurrency = (amount: any) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-8xl mx-auto">
           {/* Header */}
     <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          All Cost Sheets
        </h1>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>
     </div>

        {/* Cost Sheet Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {costSheets.map((sheet) => (
            <div
              key={sheet.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    {sheet.title}
                  </h2>
                  <p className="text-sm text-gray-500">{sheet.date}</p>
                </div>
                <Link href="/dashboard/cost-sheets/1" className="text-blue-500 cursor-pointer hover:text-blue-600 transition-colors p-1">
                  <Eye className="w-5 h-5" />
                </Link>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 mb-4"></div>

              {/* Card Footer */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Items: {sheet.items}
                </span>
                <span className="text-xl font-semibold text-gray-900">
                  {formatCurrency(sheet.amount)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CostSheets;