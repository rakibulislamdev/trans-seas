"use client"
import { useState } from 'react';
import { FileText, Edit, Eye, EyeOff, Trash2, Plus, X, TrendingUp, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from 'next/link';

const CostSheetDetails = () => {

    const [isCostSheetEditOpen, setIsCostSheetEditOpen] = useState(false);
    const [isMarkupEditOpen, setIsMarkupEditOpen] = useState(false);
    const [isAddMarkupOpen, setIsAddMarkupOpen] = useState(false);

    // New Markup Form State
    const [newMarkupName, setNewMarkupName] = useState("");
    const [newMarkupAmount, setNewMarkupAmount] = useState("");
    const [isInternal, setIsInternal] = useState(false);

    // Editing State
    const [editingMarkup, setEditingMarkup] = useState<any>(null);
    const [editingLineItem, setEditingLineItem] = useState<any>(null);

    // Mock data based on the image
    const [lineItems, setLineItems] = useState([
        {
            id: 1,
            description: "Wall-Mounted Bathroom Sink",
            specs: "Ceramic, 600×450mm, white finish, single tap hole",
            vendor: "Premier Materials Ltd",
            unitCost: 1250,
            qty: 50,
            totalCost: 62500
        },
        {
            id: 2,
            description: "Wall-Mounted Bathroom Sink",
            specs: "Ceramic, 600×450mm, white finish, single tap hole",
            vendor: "Premier Materials Ltd",
            unitCost: 1250,
            qty: 50,
            totalCost: 62500
        },
        {
            id: 3,
            description: "Wall-Mounted Bathroom Sink",
            specs: "Ceramic, 600×450mm, white finish, single tap hole",
            vendor: "Premier Materials Ltd",
            unitCost: 1250,
            qty: 50,
            totalCost: 62500
        }
    ]);

    const [markups, setMarkups] = useState([
        { id: 1, name: "Packing", amount: 9375.00, calculated: 9375.00, status: 'visible' },
        { id: 2, name: "Delivery", amount: 9375.00, calculated: 9375.00, status: 'visible' },
        { id: 3, name: "Upholstery Estimate", amount: 9375.00, calculated: 9375.00, status: 'visible' },
        { id: 4, name: "Shipping", amount: 9375.00, calculated: 9375.00, status: 'visible' },
        { id: 5, name: "Insurance", amount: 9375.00, calculated: 9375.00, status: 'visible' },
        { id: 6, name: "Banking", amount: 9375.00, calculated: 9375.00, status: 'visible' },
        { id: 7, name: "Profit", amount: 9375.00, calculated: 9375.00, status: 'internal' },
    ]);

    const handleDeleteLineItem = (id: number) => {
        setLineItems(lineItems.filter(item => item.id !== id));
    };

    const handleDeleteMarkup = (id: number) => {
        setMarkups(markups.filter(markup => markup.id !== id));
    };

    const handleSaveNewMarkup = () => {
        if (!newMarkupName || !newMarkupAmount) return;

        const newMarkup = {
            id: Date.now(),
            name: newMarkupName,
            amount: parseFloat(newMarkupAmount) || 0,
            calculated: parseFloat(newMarkupAmount) || 0, // Simplified for mock
            status: isInternal ? 'internal' : 'visible'
        };

        setMarkups([...markups, newMarkup]);

        // Reset and close
        setNewMarkupName("");
        setNewMarkupAmount("");
        setIsInternal(false);
        setIsAddMarkupOpen(false);
    };

    const handleUpdateMarkup = () => {
        if (!editingMarkup) return;
        setMarkups(markups.map(m => m.id === editingMarkup.id ? {
            ...editingMarkup,
            calculated: editingMarkup.amount // Simplified calculation logic
        } : m));
        setIsMarkupEditOpen(false);
        setEditingMarkup(null);
    };

    const handleUpdateLineItem = () => {
        if (!editingLineItem) return;
        setLineItems(lineItems.map(item => item.id === editingLineItem.id ? {
            ...editingLineItem,
            totalCost: editingLineItem.unitCost * editingLineItem.qty
        } : item));
        setIsCostSheetEditOpen(false);
        setEditingLineItem(null);
    };

    return (
        <div className="min-h-screen bg-white p-6 md:p-10 font-inter">
            <div className="mx-auto max-w-[1400px] space-y-10 pb-20">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-[32px] font-bold text-text-strong-black leading-tight tracking-tight">Cost Sheets</h1>
                        <p className="text-text-weak font-medium text-lg mt-1 opacity-90">Grand Hyatt Tower Hotel</p>
                    </div>
                    <Link href="/dashboard/cost-sheets/proposals">
                        <Button
                            className="bg-brand-primary hover:opacity-90 text-white rounded-xl font-bold py-6 px-8 flex items-center gap-2 text-16 shadow-md transition-all active:scale-95"
                        >
                            Generate New Proposal
                            <FileText size={20} />
                        </Button>
                    </Link>
                </div>

                {/* Main Cost Sheets Table Container */}
                <div className="border border-blue-200 rounded-[28px] overflow-hidden bg-white shadow-sm">
                    <Table>
                        <TableHeader className="bg-[#F8FAFC]">
                            <TableRow className="border-b border-blue-100/50 hover:bg-transparent">
                                <TableHead className="px-6 py-5 text-sm font-bold text-text-strong-black w-14 text-center">#</TableHead>
                                <TableHead className="px-6 py-5 text-sm font-bold text-text-strong-black">Item Description</TableHead>
                                <TableHead className="px-6 py-5 text-sm font-bold text-text-strong-black">Selected Vendor</TableHead>
                                <TableHead className="px-6 py-5 text-sm font-bold text-text-strong-black">Unit Cost</TableHead>
                                <TableHead className="px-6 py-5 text-sm font-bold text-text-strong-black">Qty</TableHead>
                                <TableHead className="px-6 py-5 text-sm font-bold text-text-strong-black">Total Cost</TableHead>
                                <TableHead className="px-6 py-5 text-sm font-bold text-text-strong-black text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-blue-50/50">
                            {lineItems.map((item, index) => (
                                <TableRow key={item.id} className="hover:bg-blue-50/20 transition-colors border-none group">
                                    <TableCell className="px-6 py-7 text-sm text-text-weak font-medium text-center">{index + 1}</TableCell>
                                    <TableCell className="px-6 py-7">
                                        <div className="font-bold text-brand-primary text-[15px] cursor-pointer hover:underline decoration-2">
                                            {item.description}
                                        </div>
                                        <div className="text-[12px] text-text-weak mt-1.5 leading-relaxed font-medium">
                                            {item.specs}
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-6 py-7 text-sm font-bold text-text-strong-black">{item.vendor}</TableCell>
                                    <TableCell className="px-6 py-7 text-sm text-text-strong-black font-semibold">{item.unitCost.toLocaleString()}</TableCell>
                                    <TableCell className="px-6 py-7 text-sm text-text-strong-black font-semibold">{item.qty} pcs</TableCell>
                                    <TableCell className="px-6 py-7 text-sm font-bold text-text-strong-black">{item.totalCost.toLocaleString()}</TableCell>
                                    <TableCell className="px-6 py-7 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => {
                                                    setEditingLineItem(item);
                                                    setIsCostSheetEditOpen(true);
                                                }}
                                                className="text-brand-primary hover:bg-blue-50 hover:text-brand-primary border border-blue-100 rounded-lg h-9 w-9"
                                            >
                                                <Edit size={18} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDeleteLineItem(item.id)}
                                                className="text-red-500 hover:bg-red-50 hover:text-red-600 border border-red-100 rounded-lg h-9 w-9"
                                            >
                                                <Trash2 size={18} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter className="bg-[#F8FAFC] border-t border-blue-100/50">
                            <TableRow className="hover:bg-transparent">
                                <TableCell colSpan={5} className="px-10 py-10 text-right font-black text-brand-primary text-lg tracking-tight uppercase">TOTAL NET COST</TableCell>
                                <TableCell colSpan={2} className="px-6 py-10 text-brand-primary font-black text-lg">USD 133,066.5</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>

                {/* Markup & Expense Configuration Section */}
                <div className="pt-8 space-y-8">
                    {/* Heading and Legend */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-1">
                            <h2 className="text-[28px] font-bold text-gray-900 tracking-tight">Markup & Expense Configuration</h2>
                            <p className="text-gray-500 font-medium text-lg leading-relaxed">Configure percentage-based markups applied to Total NET Cost</p>
                        </div>
                        <div className="flex items-center gap-6 bg-gray-50/50 p-3 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-3">
                                <span className="w-5 h-5 rounded-[5px] bg-[#BFDBFE] border border-blue-200 shadow-sm"></span>
                                <span className="text-sm text-gray-600 font-semibold whitespace-nowrap">Visible in Client Proposal</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-5 h-5 rounded-[5px] bg-[#FFEDD5] border border-orange-200 shadow-sm"></span>
                                <span className="text-sm text-gray-600 font-semibold whitespace-nowrap">Internal Only (Hidden from Proposal)</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {/* Table Headers */}
                        <div className="grid grid-cols-12 px-12 mb-2">
                            <div className="col-span-5 text-sm font-bold text-gray-500 uppercase tracking-widest">Markup Name</div>
                            <div className="col-span-2 text-sm font-bold text-gray-500 uppercase tracking-widest text-center">Amount</div>
                            <div className="col-span-3 text-sm font-bold text-gray-500 uppercase tracking-widest text-center">Calculated Amount</div>
                            <div className="col-span-2 text-sm font-bold text-gray-500 uppercase tracking-widest text-center">Action</div>
                        </div>

                        {/* Markup Cards */}
                        {markups.map((markup, idx) => (
                            <div
                                key={idx}
                                className={`grid grid-cols-12 items-center rounded-md py-2  group ${markup.status === 'internal'
                                    ? 'bg-[#FFF7ED]'
                                    : 'bg-[#F0F9FF]'
                                    }`}
                            >
                                <div className="col-span-5 px-6">
                                    <span className="font-bold text-gray-800 text-lg opacity-95">{markup.name}</span>
                                </div>
                                <div className="col-span-2 text-center font-semibold text-gray-600 text-[16px]">
                                    {markup.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </div>
                                <div className="col-span-3 text-center">
                                    <span className="font-black text-gray-900 text-xl tracking-tight">
                                        <span className="text-sm font-bold mr-1.5 opacity-80 uppercase">USD</span>
                                        {markup.calculated.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                </div>
                                <div className="col-span-2 flex justify-center items-center gap-3">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className={`rounded-xl h-10 w-10 border transition-colors ${markup.status === 'internal'
                                            ? 'text-orange-500 bg-orange-100/50 hover:bg-orange-100 border-orange-200'
                                            : 'text-blue-500 bg-blue-100/50 hover:bg-blue-100 border-blue-200'
                                            }`}
                                    >
                                        {markup.status === 'internal' ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => {
                                            setEditingMarkup(markup);
                                            setIsMarkupEditOpen(true);
                                        }}
                                        className="text-blue-500 bg-blue-100/50 hover:bg-blue-100 border border-blue-200 rounded-xl h-10 w-10 transition-colors"
                                    >
                                        <Edit size={18} />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDeleteMarkup(markup.id)}
                                        className="text-red-500 bg-red-100/50 hover:bg-red-100 border border-red-200 rounded-xl h-10 w-10 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end mt-4">
                        <Button
                            variant="outline"
                            onClick={() => setIsAddMarkupOpen(true)}
                            className="border border-[#BFDBFE] text-[#0071BD] hover:bg-blue-50 rounded-xl font-bold px-10 h-14 gap-3 text-lg shadow-sm active:scale-95 transition-all"
                        >
                            Add Markup <Plus size={22} className="stroke-[2.5px]" />
                        </Button>
                    </div>
                </div>

                {/* Final Blue Card Summary Section */}
                <div className="rounded-2xl bg-gradient-to-b from-[#1673B1] to-[#0F5F95] text-white shadow-xl p-8">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                        <TrendingUp className="w-6 h-6 opacity-90" />
                        <h2 className="text-2xl font-semibold">Financial Summary</h2>
                    </div>

                    <div className="space-y-4 text-[15px]">
                        {/* Total NET Cost */}
                        <div className="flex items-center justify-between">
                            <span className="font-semibold text-lg">Total NET Cost</span>
                            <span className="font-semibold text-lg">USD 187,500.00</span>
                        </div>

                        <div className="border-t border-white/30" />

                        {/* Markups */}
                        <div className="flex items-center justify-between">
                            <span className="opacity-90">Total Markups (9 items)</span>
                            <span className="font-medium">USD 87,187.50</span>
                        </div>

                        <div className="border-t border-white/30" />

                        {/* Subtotal */}
                        <div className="flex items-center justify-between">
                            <span className="opacity-90">Subtotal (before tax)</span>
                            <span className="font-medium">USD 274,687.50</span>
                        </div>

                        <div className="border-t border-white/30" />

                        {/* Tax */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="opacity-90">Tax</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-16 rounded-md border border-white/60 px-2 py-1">
                                        5
                                    </div>
                                    <span className="opacity-80">%</span>
                                </div>
                            </div>
                            <span className="font-medium">USD 13,734.38</span>
                        </div>

                        <div className="border-t border-white/30" />

                        {/* Final Selling Price */}
                        <div className="flex items-center justify-between pt-2">
                            <span className="text-xl font-semibold">Final Selling Price</span>
                            <span className="text-2xl font-bold flex items-center gap-2">
                                <DollarSign className="w-5 h-5" />
                                USD 288,421.88
                            </span>
                        </div>

                        <div className="border-t border-white/30" />

                        {/* Bottom Section */}
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pt-3">
                            <div>
                                <p className="text-sm opacity-80">
                                    Client Proposal Price (excluding internal markups)
                                </p>
                                <p className="text-2xl font-semibold mt-1">
                                    USD 243,140.63
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="text-sm opacity-80">Hidden Profit Margin</p>
                                <p className="text-2xl font-bold text-yellow-400 mt-1">
                                    USD 43,125.00
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cost Sheet Edit Popup */}
            {isCostSheetEditOpen && editingLineItem && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-[4px] z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-[40px] w-full max-w-lg shadow-2xl p-12 relative animate-in zoom-in-95 duration-300">
                        <button
                            onClick={() => {
                                setIsCostSheetEditOpen(false);
                                setEditingLineItem(null);
                            }}
                            className="absolute top-10 right-10 text-gray-400 hover:text-text-strong-black transition-colors p-2 hover:bg-gray-100 rounded-full"
                        >
                            <X size={28} />
                        </button>

                        <h2 className="text-[32px] font-black text-text-strong-black mb-10 tracking-tight">Edit Item</h2>

                        <div className="space-y-8">
                               <div className="space-y-3">
                                <label className="text-base font-bold text-text-weak ml-1 uppercase tracking-wider">Item Description</label>
                                <input
                                    type="text"
                                    value={editingLineItem.description}
                                    onChange={(e) => setEditingLineItem({ ...editingLineItem, description: e.target.value })}
                                    className="w-full bg-white border-2 border-blue-100 rounded-[20px] px-6 py-5 text-text-strong-black font-bold text-lg focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all shadow-sm"
                                />
                            </div>
                               <div className="space-y-3">
                                <label className="text-base font-bold text-text-weak ml-1 uppercase tracking-wider">Selected Vendor</label>
                                <input
                                    type="text"
                                    value={editingLineItem.vendor}
                                    onChange={(e) => setEditingLineItem({ ...editingLineItem, vendor: e.target.value })}
                                    className="w-full bg-white border-2 border-blue-100 rounded-[20px] px-6 py-5 text-text-strong-black font-bold text-lg focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all shadow-sm"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-base font-bold text-text-weak ml-1 uppercase tracking-wider">Unit Cost</label>
                                <input
                                    type="number"
                                    value={editingLineItem.unitCost}
                                    onChange={(e) => setEditingLineItem({ ...editingLineItem, unitCost: parseFloat(e.target.value) || 0 })}
                                    className="w-full bg-white border-2 border-blue-100 rounded-[20px] px-6 py-5 text-text-strong-black font-bold text-lg focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all shadow-sm"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-base font-bold text-text-weak ml-1 uppercase tracking-wider">Qty</label>
                                <input
                                    type="number"
                                    value={editingLineItem.qty}
                                    onChange={(e) => setEditingLineItem({ ...editingLineItem, qty: parseInt(e.target.value) || 0 })}
                                    className="w-full bg-white border-2 border-blue-100 rounded-[20px] px-6 py-5 text-text-strong-black font-bold text-lg focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all shadow-sm"
                                />
                            </div>

                            <div className="flex justify-end gap-5 pt-10">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setIsCostSheetEditOpen(false);
                                        setEditingLineItem(null);
                                    }}
                                    className="rounded-2xl px-12 h-16 font-bold border-2 border-gray-200 text-gray-500 hover:bg-gray-50 text-lg transition-all active:scale-95"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleUpdateLineItem}
                                    className="bg-brand-primary hover:opacity-95 text-white rounded-2xl px-12 h-16 font-bold shadow-[0_10px_20px_rgba(0,113,189,0.2)] text-lg transition-all active:scale-95"
                                >
                                    Update Item
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Markup Edit Popup */}
            {isMarkupEditOpen && editingMarkup && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-[4px] z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-[40px] w-full max-w-lg shadow-2xl p-12 relative animate-in zoom-in-95 duration-300">
                        <button
                            onClick={() => {
                                setIsMarkupEditOpen(false);
                                setEditingMarkup(null);
                            }}
                            className="absolute top-10 right-10 text-gray-400 hover:text-text-strong-black transition-colors p-2 hover:bg-gray-100 rounded-full"
                        >
                            <X size={28} />
                        </button>

                        <h2 className="text-[32px] font-black text-text-strong-black mb-10 tracking-tight leading-tight">Edit Markup</h2>

                        <div className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-base font-bold text-text-weak ml-1 uppercase tracking-wider">Markup Name</label>
                                <input
                                    type="text"
                                    value={editingMarkup.name}
                                    onChange={(e) => setEditingMarkup({ ...editingMarkup, name: e.target.value })}
                                    className="w-full bg-white border-2 border-blue-100 rounded-[20px] px-6 py-5 text-text-strong-black font-bold text-lg focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all shadow-sm"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-base font-bold text-text-weak ml-1 uppercase tracking-wider">Amount</label>
                                <input
                                    type="number"
                                    value={editingMarkup.amount}
                                    onChange={(e) => setEditingMarkup({ ...editingMarkup, amount: parseFloat(e.target.value) || 0 })}
                                    className="w-full bg-white border-2 border-blue-100 rounded-[20px] px-6 py-5 text-text-strong-black font-bold text-lg focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all shadow-sm"
                                />
                            </div>

                            <div className="flex items-center gap-4 p-4 bg-orange-50/50 border border-orange-100 rounded-[20px]">
                                <input
                                    type="checkbox"
                                    id="edit-internal-only"
                                    checked={editingMarkup.status === 'internal'}
                                    onChange={(e) => setEditingMarkup({ ...editingMarkup, status: e.target.checked ? 'internal' : 'visible' })}
                                    className="w-6 h-6 rounded-lg accent-orange-500 cursor-pointer"
                                />
                                <label htmlFor="edit-internal-only" className="text-base font-bold text-orange-800 cursor-pointer select-none">
                                    Internal Only (Hidden from Proposal)
                                </label>
                            </div>

                            <div className="flex justify-end gap-5 pt-10">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setIsMarkupEditOpen(false);
                                        setEditingMarkup(null);
                                    }}
                                    className="rounded-2xl px-12 h-16 font-bold border-2 border-gray-200 text-gray-500 hover:bg-gray-50 text-lg transition-all active:scale-95"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleUpdateMarkup}
                                    className="bg-brand-primary hover:opacity-95 text-white rounded-2xl px-12 h-16 font-bold shadow-[0_10px_20px_rgba(0,113,189,0.2)] text-lg transition-all active:scale-95"
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Markup Popup */}
            {isAddMarkupOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-[4px] z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-[40px] w-full max-w-lg shadow-2xl p-12 relative animate-in zoom-in-95 duration-300">
                        <button
                            onClick={() => setIsAddMarkupOpen(false)}
                            className="absolute top-10 right-10 text-gray-400 hover:text-text-strong-black transition-colors p-2 hover:bg-gray-100 rounded-full"
                        >
                            <X size={28} />
                        </button>

                        <h2 className="text-[32px] font-black text-text-strong-black mb-10 tracking-tight leading-tight">Add New Markup</h2>

                        <div className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-base font-bold text-text-weak ml-1 uppercase tracking-wider">Markup Name</label>
                                <input
                                    type="text"
                                    value={newMarkupName}
                                    onChange={(e) => setNewMarkupName(e.target.value)}
                                    placeholder="Enter markup name (e.g. Shipping)"
                                    className="w-full bg-white border-2 border-blue-100 rounded-[20px] px-6 py-5 text-text-strong-black font-bold text-lg focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all shadow-sm placeholder:text-gray-300 placeholder:font-medium"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-base font-bold text-text-weak ml-1 uppercase tracking-wider">Amount</label>
                                <input
                                    type="text"
                                    value={newMarkupAmount}
                                    onChange={(e) => setNewMarkupAmount(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full bg-white border-2 border-blue-100 rounded-[20px] px-6 py-5 text-text-strong-black font-bold text-lg focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all shadow-sm placeholder:text-gray-300 placeholder:font-medium"
                                />
                            </div>

                            <div className="flex items-center gap-4 p-4 bg-orange-50/50 border border-orange-100 rounded-[20px]">
                                <input
                                    type="checkbox"
                                    id="internal-only"
                                    checked={isInternal}
                                    onChange={(e) => setIsInternal(e.target.checked)}
                                    className="w-6 h-6 rounded-lg accent-orange-500 cursor-pointer"
                                />
                                <label htmlFor="internal-only" className="text-base font-bold text-orange-800 cursor-pointer select-none">
                                    Internal Only (Hidden from Proposal)
                                </label>
                            </div>

                            <div className="flex justify-end gap-5 pt-10">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setIsAddMarkupOpen(false);
                                        setNewMarkupName("");
                                        setNewMarkupAmount("");
                                        setIsInternal(false);
                                    }}
                                    className="rounded-2xl px-12 h-16 font-bold border-2 border-gray-200 text-gray-500 hover:bg-gray-50 text-lg transition-all active:scale-95"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSaveNewMarkup}
                                    className="bg-brand-primary hover:opacity-95 text-white rounded-2xl px-12 h-16 font-bold shadow-[0_10px_20px_rgba(0,113,189,0.2)] text-lg transition-all active:scale-95"
                                >
                                    Save Markup
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CostSheetDetails;

