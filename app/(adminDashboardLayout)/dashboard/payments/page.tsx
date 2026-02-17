// app/dashboard/finance/page.tsx  (or wherever you want to put it)
"use client"
import { useState } from 'react';
import { 
  ArrowDownRight, 
  ArrowUpRight, 
  Clock, 
  AlertCircle 
} from 'lucide-react';

type Tab = 'AP' | 'AR';

interface SummaryCardProps {
  title: string;
  amount: string;
  pending?: string;
  overdue?: string;
  icon: React.ReactNode;
  iconColor: string;
  pendingColor?: string;
  overdueColor?: string;
}

const SummaryCard = ({ 
  title, 
  amount, 
  pending, 
  overdue, 
  icon, 
  iconColor,
  pendingColor = 'text-orange-500',
  overdueColor = 'text-red-500'
}: SummaryCardProps) => {
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className={`p-2 rounded-lg ${iconColor}`}>
          {icon}
        </div>
      </div>
      
      <div className="text-3xl font-bold text-gray-900 mb-1">
        {amount}
      </div>
      
      <div className="flex gap-6 mt-4 text-sm">
        {pending && (
          <div>
            <div className={`font-medium ${pendingColor}`}>Pending</div>
            <div className="text-gray-700">{pending}</div>
          </div>
        )}
        {overdue && (
          <div>
            <div className={`font-medium ${overdueColor}`}>Overdue</div>
            <div className="text-gray-700">{overdue}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function FinanceDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('AP');

  const isAP = activeTab === 'AP';

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Payment</h1>
          <p className="text-gray-600 mt-1">
            Track accounts payable (money owed to vendors) and accounts receivable (money owed from clients)
          </p>
        </div>

    

        {/* Summary Cards - side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Left Card - always shows AP */}
          <SummaryCard
            title="Accounts Payable (AP)"
            amount="USD 1,034,800"
            pending="USD 567,500"
            overdue="USD 324,800"
            icon={<ArrowDownRight size={24} />}
            iconColor="bg-red-100 text-red-600"
            pendingColor="text-orange-600"
            overdueColor="text-red-600"
          />

          {/* Right Card - switches content based on tab */}
          <SummaryCard
            title="Accounts Receivable (AR)"
            amount="USD 1,034,800"
            pending={isAP ? "USD 567,500" : "USD 567,500"}
            overdue={isAP ? "USD 324,800" : "USD 0"}
            icon={isAP ? <ArrowDownRight size={24} /> : <ArrowUpRight size={24} />}
            iconColor={isAP ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}
            pendingColor="text-orange-600"
            overdueColor="text-red-600"
          />
        </div>

        {/* Table Section */}
        {/* Tabs */}
        <div className="mb-6 flex justify-end">
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('AP')}
              className={`
                px-6 py-2.5 rounded-md text-sm font-medium transition-all
                ${isAP 
                  ? 'bg-white shadow-sm text-gray-900' 
                  : 'text-gray-600 hover:text-gray-900'}
              `}
            >
              Accounts Payable (AP)
            </button>
            <button
              onClick={() => setActiveTab('AR')}
              className={`
                px-6 py-2.5 rounded-md text-sm font-medium transition-all
                ${!isAP 
                  ? 'bg-white shadow-sm text-gray-900' 
                  : 'text-gray-600 hover:text-gray-900'}
              `}
            >
              Accounts Receivable (AR)
            </button>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border">
          <div className="bg-[#0071BD] px-6 py-4">
            <h2 className="text-white font-semibold text-lg">
              {isAP ? "Accounts Payable (AP)" : "Accounts Receivable (AR)"}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {isAP ? "Vendor" : "Client"}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice Number
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isAP ? (
                  <>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Global Furniture Solutions
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        PO-2024-001
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Marina Bay Hotel FF&E
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        USD 567,500
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Premium Interiors LLC
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        PO-2024-001
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Downtown Residence Tower
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        USD 567,500
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Paid
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Global Furniture Solutions
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        PO-2024-001
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Marina Bay Hotel FF&E
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        USD 567,500
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Paid
                        </span>
                      </td>
                    </tr>
                  </>
                ) : (
                  // You can add different AR rows here if needed
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      Accounts Receivable details will appear here
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Button Example */}
        <div className="mt-8 flex justify-end">
          <button 
            className="bg-[#0071BD] hover:bg-[#005a9e] text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-md"
          >
            <Clock size={18} />
            View All Transactions
          </button>
        </div>
      </div>
    </div>
  );
}