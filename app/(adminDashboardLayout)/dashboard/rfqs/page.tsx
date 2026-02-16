'use client';

import { useState } from 'react';
import {
  Search,
  Plus,
  CheckCircle2,
  UserCircle,
  Send,
  ChevronDown
} from 'lucide-react';
import CreateRFQModal from './_components/CreateRFQModal';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const RFQList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const router = useRouter();

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

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Responded':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Responded
          </div>
        );
      case 'Follow-Up':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
            <UserCircle className="w-3.5 h-3.5" />
            Follow-Up
          </div>
        );
      case 'Sent':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-100">
            <Send className="w-3.5 h-3.5" />
            Sent
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">RFQs</h1>
            <p className="text-gray-500 text-sm mt-1 font-medium">{rfqs.length} total requests in database</p>
          </div>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 px-6 rounded-xl transition-all shadow-md active:scale-95"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New RFQ
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by ID, hotel or supplier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-900"
            />
          </div>
          <div className="relative min-w-[200px]">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full h-12 appearance-none px-6 pr-12 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer font-bold text-gray-700"
            >
              <option>All Status</option>
              <option>Responded</option>
              <option>Follow-Up</option>
              <option>Sent</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>
        </div>

        {/* RFQ Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow className="hover:bg-transparent border-gray-100">
                <TableHead className="w-[180px] font-bold text-gray-600 h-14 px-6 uppercase text-[11px] tracking-wider">RFQ ID</TableHead>
                <TableHead className="font-bold text-gray-600 px-6 uppercase text-[11px] tracking-wider">Hotel / Project</TableHead>
                <TableHead className="font-bold text-gray-600 px-6 uppercase text-[11px] tracking-wider">Supplier</TableHead>
                <TableHead className="font-bold text-gray-600 px-6 uppercase text-[11px] tracking-wider text-center">Items</TableHead>
                <TableHead className="font-bold text-gray-600 px-6 uppercase text-[11px] tracking-wider text-center">Due Date</TableHead>
                <TableHead className="font-bold text-gray-600 px-6 uppercase text-[11px] tracking-wider text-center">Sent Date</TableHead>
                <TableHead className="font-bold text-gray-600 px-6 uppercase text-[11px] tracking-wider text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rfqs.map((rfq) => (
                <TableRow
                  key={rfq.id}
                  className="cursor-pointer border-gray-50 hover:bg-gray-50/50 transition-colors group"
                  onClick={() => router.push(`/dashboard/rfqs/${rfq.id}`)}
                >
                  <TableCell className="px-6 py-4 font-bold text-blue-600">
                    <div className="flex items-center gap-2">
                      {rfq.id}
                      {rfq.overdue && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-red-100 text-[10px] font-bold text-red-600 uppercase">
                          {rfq.overdueDays}d overdue
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 font-medium text-gray-900">{rfq.hotel}</TableCell>
                  <TableCell className="px-6 py-4 font-medium text-gray-700">{rfq.supplier}</TableCell>
                  <TableCell className="px-6 py-4 text-center font-bold text-gray-600">{rfq.items}</TableCell>
                  <TableCell className="px-6 py-4 text-center font-medium text-gray-600">{rfq.dueDate}</TableCell>
                  <TableCell className="px-6 py-4 text-center text-sm text-gray-500">{rfq.sentDate}</TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex justify-end">
                      {getStatusBadge(rfq.status)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
