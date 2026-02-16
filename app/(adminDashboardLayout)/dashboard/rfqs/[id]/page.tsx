'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  XCircle, 
  Building2 
} from 'lucide-react';

interface RFQItem {
  id: number;
  itemName: string;
  description: string;
  specifications: string;
  quantity: number;
  manufacturer: string;
}

interface Vendor {
  name: string;
  status: 'received' | 'follow-up';
  receivedDate?: string;
}

interface RFQData {
  rfqNumber: string;
  status: 'sent' | 'draft' | 'closed';
  project: string;
  dueDate: string;
  sentDate: string;
  commodity: string;
  items: RFQItem[];
  vendors: Vendor[];
}

const RFQDetail: React.FC = () => {
  const [rfqData] = useState<RFQData>({
    rfqNumber: 'RFQ-2024-001',
    status: 'sent',
    project: 'Grand Hyatt Tower Hotel',
    dueDate: '2/25/2026',
    sentDate: '1/20/2026',
    commodity: 'STONE',
    items: [
      {
        id: 1,
        itemName: 'Wall-Mounted Bathroom Sink',
        description: 'Ceramic, 600×450mm, white finish, single tap hole',
        specifications: 'Ceramic, 600×450mm, white finish, single tap hole',
        quantity: 62,
        manufacturer: 'Kohle'
      },
      {
        id: 2,
        itemName: 'Wall-Mounted Bathroom Sink',
        description: 'Ceramic, 600×450mm, white finish, single tap hole',
        specifications: 'Ceramic, 600×450mm, white finish, single tap hole',
        quantity: 50,
        manufacturer: 'Philips'
      },
      {
        id: 3,
        itemName: 'Wall-Mounted Bathroom Sink',
        description: 'Ceramic, 600×450mm, white finish, single tap hole',
        specifications: 'Ceramic, 600×450mm, white finish, single tap hole',
        quantity: 30,
        manufacturer: 'Grohe'
      }
    ],
    vendors: [
      {
        name: 'BuildTech Supply Co.',
        status: 'received',
        receivedDate: '01-28-2026'
      },
      {
        name: 'Global Fixtures Inc',
        status: 'received',
        receivedDate: '01-28-2026'
      },
      {
        name: 'Global Fixtures Inc',
        status: 'follow-up'
      }
    ]
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button className="flex items-center text-gray-700 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium">RFQs</span>
          </button>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-gray-900">
                {rfqData.rfqNumber}
              </h1>
              <span className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                Sent
              </span>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <XCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Close RFQs</span>
            </button>
          </div>

          {/* Project Info */}
          <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span>Project</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Due Date</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Sent Date</span>
            </div>
          </div>
          <div className="flex gap-6 mt-1 text-sm font-medium text-gray-900">
            <span className="w-[120px]">{rfqData.project}</span>
            <span className="w-[100px]">{rfqData.dueDate}</span>
            <span className="w-[100px]">{rfqData.sentDate}</span>
          </div>
        </div>

        {/* Email Message */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Email Message to Vendors
          </h2>
          
          <div className="space-y-3 text-sm text-gray-700">
            <div>
              <span className="font-semibold">Subject:</span> RFQ for attached items.
            </div>
            
            <div className="mt-4">
              <p>Dear Vendor,</p>
              <p>We are pleased to invite you to submit a quotation for the following project:</p>
            </div>

            <div className="mt-4 space-y-1">
              <p><span className="font-semibold">Project:</span> {rfqData.project}</p>
              <p><span className="font-semibold">RFQ Number:</span> {rfqData.rfqNumber}</p>
              <p><span className="font-semibold">Commodity:</span> {rfqData.commodity}</p>
              <p><span className="font-semibold">Due Date:</span> 1/27/2024</p>
            </div>

            <p className="mt-4">
              Please review the attached item list and provide your best pricing. All quotes must include unit prices, lead times, and any relevant certifications.
            </p>

            <p className="mt-4">
              Should you have any questions, please contact us at procurement@procureai.com
            </p>

            <div className="mt-4">
              <p>Best regards,</p>
              <p>Procurement Team</p>
            </div>
          </div>
        </div>

        {/* RFQ Items */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            RFQs items
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            {rfqData.items.length} items included in this RFQ
          </p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Item Id
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Item Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Specifications
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Quantity
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Manufacturer
                  </th>
                </tr>
              </thead>
              <tbody>
                {rfqData.items.map((item, index) => (
                  <tr key={item.id} className="border-b border-gray-100">
                    <td className="py-4 px-4 text-sm text-gray-600">
                      #{item.id}
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <div className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">
                          {item.itemName}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {item.description}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">
                      {item.specifications}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">
                      {item.quantity} pcs
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">
                      {item.manufacturer}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Vendors List */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Vendors List
          </h2>

          <div className="space-y-2">
            {rfqData.vendors.map((vendor, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-4 px-4 border-b border-gray-100 last:border-b-0"
              >
                <span className="text-sm font-medium text-gray-900">
                  {vendor.name}
                </span>
                {vendor.status === 'received' ? (
                  <div className="text-sm text-gray-600">
                    <span className="mr-2">Received</span>
                    <span>{vendor.receivedDate}</span>
                  </div>
                ) : (
                  <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">Follow-Up</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RFQDetail;