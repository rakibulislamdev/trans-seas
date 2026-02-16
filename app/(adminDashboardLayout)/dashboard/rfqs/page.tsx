'use client';

import { useState } from 'react';
import {
  Search,
  Building2,
  BarChart3,
  Package,
  Calendar,
  Plus,
  CheckCircle2,
  UserCircle,
  Send,
  ChevronDown
} from 'lucide-react';
import CreateRFQModal from './_components/CreateRFQModal';
import Link from 'next/link';

const RFQList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const rfqs = [
    {
      id: 'RFQ-2024-0101',
      hotel: 'Marina Bay Hotel',
      supplier: 'Global Furniture Solution',
      items: 1,
      dueDate: 'Jan 30',
      sentDate: 'Jan 15',
      status: 'Responded',
      overdue: false
    },
    {
      id: 'RFQ-2024-0102',
      hotel: 'Marina Bay Hotel',
      supplier: 'LuxeLight Interiors',
      items: 1,
      dueDate: 'Jan 30',
      sentDate: 'Jan 15',
      status: 'Follow-Up',
      overdue: true,
      overdueDays: 3
    },
    {
      id: 'RFQ-2024-0103',
      hotel: 'Marina Bay Hotel',
      supplier: 'Premium Textiles Co',
      items: 1,
      dueDate: 'Jan 30',
      sentDate: 'Jan 15',
      status: 'Sent',
      overdue: false
    },
    {
      id: 'RFQ-2024-0104',
      hotel: 'Marina Bay Hotel',
      supplier: 'Flooring Masters LLC',
      items: 1,
      dueDate: 'Jan 30',
      sentDate: 'Jan 15',
      status: 'Responded',
      overdue: false
    }
  ];

  const getStatusButton = (status, overdue, overdueDays) => {
    if (status === 'Responded') {
      return (
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 text-sm font-medium hover:bg-emerald-100 transition-colors">
          <CheckCircle2 className="w-4 h-4" />
          Responded
        </button>
      );
    } else if (status === 'Follow-Up') {
      return (
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors">
          <UserCircle className="w-4 h-4" />
          Follow-Up
        </button>
      );
    } else if (status === 'Sent') {
      return (
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-amber-200 bg-amber-50 text-amber-700 text-sm font-medium hover:bg-amber-100 transition-colors">
          <Send className="w-4 h-4" />
          Sent
        </button>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">RFQs</h1>
            <p className="text-gray-600 mt-1">{rfqs.length} total requests</p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Create RFQ
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none px-6 py-3 pr-12 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
            >
              <option>All</option>
              <option>Response</option>
              <option>Awaiting Response</option>
              <option>Overdue</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>
        </div>

        {/* RFQ List */}

        <div className="space-y-4">
          {rfqs.map((rfq) => (
            <Link key={rfq.id} href={`/dashboard/rfqs/${rfq.id}`} className="block">
              <div
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-8 flex-1">
                    {/* RFQ ID and Hotel */}
                    <div className="flex items-center gap-4 min-w-[200px]">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {rfq.id}
                          </h3>
                          {rfq.overdue && (
                            <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-medium rounded">
                              {rfq.overdueDays}d overdue
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Building2 className="w-4 h-4" />
                          <span>{rfq.hotel}</span>
                        </div>
                      </div>
                    </div>

                    {/* Supplier */}
                    <div className="flex items-center gap-2 text-gray-700 min-w-[200px]">
                      <BarChart3 className="w-4 h-4" />
                      <span className="text-sm">{rfq.supplier}</span>
                    </div>

                    {/* Items */}
                    <div className="flex items-center gap-2 text-gray-700 min-w-[100px]">
                      <Package className="w-4 h-4" />
                      <span className="text-sm">{rfq.items} item</span>
                    </div>

                    {/* Due Date */}
                    <div className="flex items-center gap-2 text-gray-700 min-w-[120px]">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Due {rfq.dueDate}</span>
                    </div>

                    {/* Sent Date */}
                    <div className="text-gray-600 text-sm min-w-[100px]">
                      Sent {rfq.sentDate}
                    </div>
                  </div>

                  {/* Status Button */}
                  <div>
                    {getStatusButton(rfq.status, rfq.overdue, rfq.overdueDays)}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>

      <CreateRFQModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default RFQList;