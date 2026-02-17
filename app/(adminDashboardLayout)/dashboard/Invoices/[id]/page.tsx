'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Download, 
  Send, 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  FileText 
} from 'lucide-react';

export default function InvoiceDetailPage() {
  // In real app → fetch from API using params.id
  const invoice = {
    id: "INV-2024-001",
    number: "INV-2024-001",
    type: "Advance Payment",
    client: "Grand Hyatt Tower Hotel",
    contactName: "Sarah Mitchell",
    email: "sarah.mitchell@grandhyatt.com",
    phone: "+971 4 123 4567",
    address: "Sheikh Zayed Road, Dubai, UAE",
    vatRate: 5,
    items: [
      {
        description: "Project Advance Payment (50%)",
        unitCost: 1250,
        quantity: 1,
        total: 62500,
      },
    ],
    subtotal: 125000,
    vat: 6250,
    total: 131250,
  };

  const formatCurrency = (amount: number) =>
    `USD ${amount.toLocaleString("en-US", { minimumFractionDigits: 0 })}`;

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-8">
      <div className="mx-auto max-w-5xl space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Invoice {invoice.number}
            </h1>
            <div className="flex items-center gap-3 mt-2 text-gray-600">
              <span className="font-medium">{invoice.type}</span>
              <span>•</span>
              <span className="font-medium">Client: {invoice.client}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Send className="h-4 w-4" />
              Send to Client
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Card className="border shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">
              {invoice.type} • Client: {invoice.client}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-8 pb-8">

            {/* Bill To */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-gray-600" />
                Bill To
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Company */}
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-500">Company</div>
                    <div className="font-medium">{invoice.client}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Address</div>
                    <div className="text-gray-700">{invoice.address}</div>
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-500">Contact</div>
                    <div className="font-medium">{invoice.contactName}</div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div>
                      <div className="flex items-center gap-1.5 text-sm text-gray-500">
                        <Mail className="h-4 w-4" />
                        Email
                      </div>
                      <a
                        href={`mailto:${invoice.email}`}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        {invoice.email}
                      </a>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-sm text-gray-500">
                        <Phone className="h-4 w-4" />
                        Phone
                      </div>
                      <div className="text-gray-700 text-sm">{invoice.phone}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Order Items */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-gray-600" />
                Order Items
              </h3>

              <div className="rounded-lg border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left font-medium text-gray-600">
                        Item Description
                      </th>
                      <th className="px-6 py-3 text-right font-medium text-gray-600">
                        Unit Cost
                      </th>
                      <th className="px-6 py-3 text-right font-medium text-gray-600">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-right font-medium text-gray-600">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item, idx) => (
                      <tr key={idx} className="border-t hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-900">
                          {item.description}
                        </td>
                        <td className="px-6 py-4 text-right text-gray-700">
                          {formatCurrency(item.unitCost)}
                        </td>
                        <td className="px-6 py-4 text-right text-gray-700">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 text-right font-medium text-gray-900">
                          {formatCurrency(item.total)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Totals */}
                <div className="bg-gray-50 px-6 py-5 border-t">
                  <div className="ml-auto max-w-xs space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">{formatCurrency(invoice.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">VAT ({invoice.vatRate}%)</span>
                      <span className="font-medium">{formatCurrency(invoice.vat)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between text-base font-semibold">
                      <span>Total Payable</span>
                      <span className="text-blue-700">{formatCurrency(invoice.total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}