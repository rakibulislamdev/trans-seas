// app/dashboard/invoices/page.tsx

'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Calendar, DollarSign, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from "next/link";

type Invoice = {
  id: string;
  type: string;
  total: string;
  paid: string;
  outstanding: string;
  dueDate: string;
  status: 'paid' | 'partial' | 'outstanding' | 'overdue';
};

export default function ClientInvoicesPage() {
  // Sample data – in real app this would come from API / database
  const invoices: Invoice[] = [
    {
      id: "INV-2024-001",
      type: "Advance Payment",
      total: "237,684.38",
      paid: "0.00",
      outstanding: "237,684.38",
      dueDate: "2026-02-15",
      status: "outstanding",
    },
    // You can add more items here
    // {
    //   id: "INV-2024-002",
    //   type: "Progress Billing",
    //   total: "148,920.00",
    //   paid: "75,000.00",
    //   outstanding: "73,920.00",
    //   dueDate: "2025-11-30",
    //   status: "partial",
    // },
  ];

  const getStatusBadge = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
        return <Badge variant="default" className="bg-green-600 hover:bg-green-700">Paid</Badge>;
      case 'partial':
        return <Badge variant="secondary" className="bg-blue-600 hover:bg-blue-700">Partial</Badge>;
      case 'outstanding':
        return <Badge variant="outline" className="border-orange-500 text-orange-700 bg-orange-50 hover:bg-orange-100">Outstanding</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/40 p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Info banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-5 py-3.5 text-sm text-blue-800">
          <p>
            <strong>Purchase Orders:</strong> Created from approved proposals. Track order status, delivery dates, and vendor commitments.
          </p>
        </div>

        {/* Main content */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Client Invoices
              </h1>
              <p className="text-gray-600 mt-1">
                Track client billing and payments
              </p>
            </div>

            {/* Optional action buttons */}
            <Button variant="outline">
              Export
            </Button>
          </div>

          <div className="rounded-xl border bg-white shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[140px]">Invoice</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Invoice Amount</TableHead>
                  <TableHead className="text-right">Paid</TableHead>
                  <TableHead className="text-right">Outstanding</TableHead>
                  <TableHead className="text-center">Due Date</TableHead>
                  <TableHead className="w-[100px] text-center">Status</TableHead>
                  <TableHead className="w-[60px]"></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {invoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-48 text-center text-muted-foreground">
                      No invoices found
                    </TableCell>
                  </TableRow>
                ) : (
                  invoices.map((invoice) => (
                    <TableRow key={invoice.id} className="hover:bg-gray-50/80">
                      <TableCell className="font-medium">
                        {invoice.id}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {invoice.type}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        <div className="flex items-center justify-end gap-1.5">
                          <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                          USD {invoice.total}
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-green-700 font-medium">
                        USD {invoice.paid}
                      </TableCell>
                      <TableCell className="text-right font-medium text-orange-600">
                        USD {invoice.outstanding}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1.5 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {invoice.dueDate}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {getStatusBadge(invoice.status)}
                      </TableCell>
                      <TableCell className="text-center">
                   <Link href={`/dashboard/invoices/${invoice.id}`}>
                   <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View invoice</span>
                        </Button>
                   </Link>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

      </div>
    </div>
  );
}