"use client";

interface RFQItem {
    id: string;
    name: string;
    specs: string;
    qty: string;
    supplier: string;
}

export const RFQItemsTable = ({ items }: { items: RFQItem[] }) => (
    <section className="border border-blue-100 rounded-2xl overflow-hidden mb-8 shadow-sm">
        <div className="bg-white p-4 border-b border-gray-50">
            <h2 className="font-bold text-lg">RFQs items</h2>
            <p className="text-xs text-gray-400 mt-0.5">{items.length} items included in this RFQ</p>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-[#F8FBFE] border-b border-gray-100">
                    <tr className="text-11 font-bold text-gray-500 uppercase tracking-wider">
                        <th className="px-6 py-4">Item Id</th>
                        <th className="px-6 py-4">Item Name</th>
                        <th className="px-6 py-4">Quantity</th>
                        <th className="px-6 py-4">Manufacturer/Supplier</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {items.map((item) => (
                        <tr key={item.id} className="text-xs hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-5 text-gray-400 font-medium">{item.id}</td>
                            <td className="px-6 py-5">
                                <p className="text-[#0073BE] font-bold mb-1">{item.name}</p>
                                <p className="text-gray-400 leading-tight w-48 truncate">{item.specs}</p>
                            </td>
                            <td className="px-6 py-5 font-bold text-gray-700">{item.qty}</td>
                            <td className="px-6 py-5 font-bold text-gray-700">{item.supplier}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </section>
);