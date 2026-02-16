'use client';

import { useState } from 'react';
import { Search, ChevronDown, Mail, Phone, MapPin, Trash2, Edit, Plus } from 'lucide-react';
import Link from 'next/link';

interface Vendor {
  id: number;
  name: string;
  category: string;
  contact: string;
  position: string;
  email: string;
  phone: string;
  location: string;
  rfqsSent: number;
  responded: number;
}

const VendorsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const vendors: Vendor[] = [
    {
      id: 1,
      name: 'Global Furniture Solution',
      category: 'Furniture',
      contact: 'John Sally',
      position: 'Seals Incharge',
      email: 'sales@gobalfurniture.com',
      phone: '+971 4 555 1253',
      location: 'Dubai, UAE',
      rfqsSent: 3,
      responded: 2,
    },
    {
      id: 2,
      name: 'Global Furniture Solution',
      category: 'Furniture',
      contact: 'John Sally',
      position: 'Seals Incharge',
      email: 'sales@gobalfurniture.com',
      phone: '+971 4 555 1253',
      location: 'Dubai, UAE',
      rfqsSent: 3,
      responded: 2,
    },
    {
      id: 3,
      name: 'Global Furniture Solution',
      category: 'Furniture',
      contact: 'John Sally',
      position: 'Seals Incharge',
      email: 'sales@gobalfurniture.com',
      phone: '+971 4 555 1253',
      location: 'Dubai, UAE',
      rfqsSent: 3,
      responded: 2,
    },
    {
      id: 4,
      name: 'Global Furniture Solution',
      category: 'Furniture',
      contact: 'John Sally',
      position: 'Seals Incharge',
      email: 'sales@gobalfurniture.com',
      phone: '+971 4 555 1253',
      location: 'Dubai, UAE',
      rfqsSent: 3,
      responded: 2,
    },
    {
      id: 5,
      name: 'Global Furniture Solution',
      category: 'Furniture',
      contact: 'John Sally',
      position: 'Seals Incharge',
      email: 'sales@gobalfurniture.com',
      phone: '+971 4 555 1253',
      location: 'Dubai, UAE',
      rfqsSent: 3,
      responded: 2,
    },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Vendors</h1>
            <p className="text-sm text-gray-500 mt-1">5 vendor in database</p>
          </div>
          <Link href="/dashboard/vendors/add-vendor" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors">
            <Plus size={20} />
            New Vendor
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors">
            <span className="text-gray-700">{selectedCategory}</span>
            <ChevronDown size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Vendor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow"
            >
              {/* Vendor Name and Category */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {vendor.name}
                </h3>
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full border border-gray-200">
                  {vendor.category}
                </span>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">{vendor.contact}</p>
                  <p className="text-sm text-gray-600">{vendor.position}</p>
                </div>

                <div className="flex items-start gap-2">
                  <Mail size={16} className="text-gray-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{vendor.email}</span>
                </div>

                <div className="flex items-start gap-2">
                  <Phone size={16} className="text-gray-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{vendor.phone}</span>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin size={16} className="text-gray-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{vendor.location}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{vendor.rfqsSent} RFQs sent</span>
                  <span>{vendor.responded} responded</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors">
                    <Trash2 size={18} />
                  </button>
                  <Link href={`/dashboard/vendors/${vendor.id}`} className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                    <Edit size={18} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorsPage;