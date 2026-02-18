"use client";

import React from 'react';
import {
    FileText,
    Package,
    Calendar,
    AlertTriangle,
    Eye,
    CheckCircle,
    MoreHorizontal
} from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from 'next/link';

export type QuoteStatus = 'Needs Review' | 'Parsed' | 'Approved';

export interface QuoteData {
    id: string;
    hotelName: string;
    projectCode: string;
    category: string;
    amount: string;
    currency: string;
    itemCount: number;
    date: string;
    validUntil: string;
    status: QuoteStatus;
    attentionRequired?: boolean;
}

interface QuoteCardProps {
    quote: QuoteData;
    onStatusChange: (status: QuoteStatus) => void;
    projectId: string;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ quote, onStatusChange, projectId }) => {

    const handleActionClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
    };

    return (
        <Link href={`/dashboard/projects/${projectId}/quote/${quote.id}`}>
            <div className="bg-white border border-blue-100 rounded-xl p-5 shadow-[0_10px_20px_rgba(0,113,189,0.05)] transition-all hover:shadow-[0_10px_25px_rgba(0,113,189,0.1)]">
                <div className="flex justify-between items-start">

                    {/* Left Side: Information */}
                    <div className="space-y-3">
                        <h2 className="text-xl font-bold text-gray-800">{quote.id}</h2>

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-500 text-sm">
                            <div className="flex items-center gap-2">
                                <FileText size={18} className="text-gray-400" />
                                <div>
                                    <p className="font-semibold text-gray-700 leading-tight">{quote.hotelName}</p>
                                    <p className="text-11 font-medium text-gray-400">{quote.projectCode}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Package size={18} className="text-gray-400" />
                                <span className="text-gray-700 font-medium">{quote.category}</span>
                            </div>

                            <div className="flex items-center gap-1 font-bold">
                                <span className="text-lg text-gray-900">{quote.currency}</span>
                                <span className="text-gray-700">{quote.amount}</span>
                            </div>

                            <div className="text-gray-700 font-medium">{quote.itemCount} Item</div>

                            <div className="flex items-center gap-2 font-medium">
                                <Calendar size={18} className="text-gray-400" />
                                <span>{quote.date} <span className="text-gray-300 mx-1">|</span> valid until {quote.validUntil}</span>
                            </div>
                        </div>

                        {quote.attentionRequired && quote.status === 'Needs Review' && (
                            <div className="flex items-center gap-2 text-amber-600 text-xs font-bold mt-1">
                                <AlertTriangle size={14} />
                                <span>1 items need attention</span>
                            </div>
                        )}
                    </div>

                    {/* Right Side: Status Badge & Dynamic Dropdown */}
                    <div className="flex items-center gap-2" onClick={handleActionClick}>

                        <div className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg transition-all duration-300 font-semibold text-sm
                            ${quote.status === 'Needs Review' ? 'border-amber-200 bg-amber-50 text-amber-700' : ''}
                            ${quote.status === 'Approved' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : ''}
                            ${quote.status === 'Parsed' ? 'bg-gray-100 text-gray-600 border-transparent' : ''}
                        `}>
                            {quote.status === 'Needs Review' && <Eye size={16} />}
                            {quote.status === 'Approved' && <CheckCircle size={16} />}
                            {quote.status === 'Parsed' && <Package size={16} />}
                            <span>{quote.status}</span>
                        </div>

                        {/* Dropdown: Only for Parsed Status */}
                        {quote.status === 'Parsed' && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="p-1.5 hover:bg-gray-100 rounded-full outline-none group transition-colors">
                                        <MoreHorizontal size={20} className="text-gray-400 group-hover:text-gray-600" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-32 bg-white shadow-xl rounded-lg border border-gray-100 p-1">
                                    <DropdownMenuItem
                                        onClick={() => onStatusChange('Approved')}
                                        className="flex items-center gap-2 px-3 py-2 cursor-pointer focus:bg-emerald-50 focus:text-emerald-700 rounded-md transition-colors"
                                    >
                                        <CheckCircle size={16} className="text-emerald-500" />
                                        <span className="text-sm font-medium">Approve</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};