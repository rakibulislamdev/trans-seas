"use client";

import React, { use } from "react";
import { ArrowLeft, Clock, MapPin, Package, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ShippingTrackingButton from "@/components/dashboard/order/ShippingTrackingButton";
import Link from "next/link";
import BackButton from "@/components/dashboard/order/BackButton";
import { useGetOrderByIdQuery } from "@/redux/api/orders/ordersApi";
import Image from "next/image";

type Props = {
  params: Promise<{ orderId: string }>;
};

const OrderDetailsSkeleton = () => (
  <div className="space-y-6 animate-pulse p-6">
    <div className="flex items-center gap-4">
      <div className="h-10 w-10 bg-zinc-200 rounded-lg"></div>
      <div className="space-y-2">
        <div className="h-8 w-64 bg-zinc-200 rounded"></div>
        <div className="h-4 w-32 bg-zinc-200 rounded"></div>
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card className="h-64 bg-zinc-50 border-zinc-200"></Card>
        <div className="h-12 bg-zinc-200 rounded-lg"></div>
      </div>
      <div className="space-y-6">
        <Card className="h-40 bg-zinc-50 border-zinc-200"></Card>
        <Card className="h-24 bg-zinc-50 border-zinc-200"></Card>
        <Card className="h-40 bg-zinc-50 border-zinc-200"></Card>
      </div>
    </div>
  </div>
);

const OrderDetailsPage = ({ params }: Props) => {
  const { orderId } = use(params);
  const { data, isLoading, isError } = useGetOrderByIdQuery(orderId);

  if (isLoading) return <OrderDetailsSkeleton />;

  if (isError || !data?.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 p-6">
        <div className="bg-zinc-50 p-8 rounded-2xl border border-dashed border-zinc-200 text-center max-w-md">
            <h2 className="text-xl font-semibold text-zinc-900 mb-2">Order not found</h2>
            <p className="text-muted-foreground mb-6">We couldn&rsquo;t retrieve the details for order #{orderId}. It might have been deleted or the ID is incorrect.</p>
            <Link 
              href="/dashboard/orders"
              className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Orders
            </Link>
        </div>
      </div>
    );
  }

  const order = data.data;

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "DELIVERED": return "success";
      case "SHIPPED": return "default";
      case "PROCESSING": return "secondary";
      case "PENDING": return "outline";
      default: return "secondary";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <BackButton />
        <div>
          <div className="flex items-center gap-3">
             <h1 className="text-2xl font-bold text-zinc-900">Order: {order.ordersNumber}</h1>
             <Badge variant={getStatusVariant(order.status) as unknown as "default"} className="rounded-full">
               {order.status}
             </Badge>
          </div>
          <p className="text-muted-foreground text-sm flex items-center gap-1 mt-1">
            <Clock className="h-3 w-3" /> Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Items and Summary */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-zinc-200 shadow-sm overflow-hidden">
            <CardHeader className="border-b bg-zinc-50/50">
              <CardTitle className="text-lg flex items-center gap-2">
                <Package className="h-5 w-5 text-zinc-500" /> Order Items
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {order.items.map((item, index) => (
                <div 
                  key={item.id} 
                  className={`flex items-center justify-between p-6 ${index !== order.items.length - 1 ? 'border-b border-zinc-100' : ''} hover:bg-zinc-50/50 transition-colors`}
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.product?.images || "/placeholder.png"} 
                      alt={item.product?.name} 
                      className="w-16 h-16 rounded-lg object-cover bg-zinc-100 border border-zinc-200" 
                      width={64}
                      height={64}
                    />
                    <div>
                      <h3 className="font-semibold text-zinc-900">{item.product?.name}</h3>
                      <p className="text-sm text-muted-foreground">SKU: {item.product?.sku}</p>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-zinc-900">${(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">${item.price.toFixed(2)} each</p>
                  </div>
                </div>
              ))}

              <div className="p-6 bg-zinc-50/50 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-zinc-900">${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-zinc-900">${order.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-medium text-zinc-900">${order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-4 border-zinc-200">
                  <span className="text-zinc-900">Total</span>
                  <span className="text-zinc-900">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <ShippingTrackingButton orderId={order.id} currentStatus={order.status} />
        </div>

        {/* Right Column - Sidebars */}
        <div className="space-y-6">
          {/* Customer Information */}
          <Card className="border-zinc-200 shadow-sm">
            <CardHeader className="border-b bg-zinc-50/50 py-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-zinc-500" /> Customer Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Name</p>
                <p className="font-medium text-zinc-900">{order.address?.fullName}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Email</p>
                <p className="font-medium text-zinc-900 underline underline-offset-4 decoration-zinc-200">{order.address?.email}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Phone</p>
                <p className="font-medium text-zinc-900">{order.address?.phone}</p>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card className="border-zinc-200 shadow-sm">
            <CardHeader className="border-b bg-zinc-50/50 py-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5 text-zinc-500" /> Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="font-medium text-zinc-900 leading-relaxed">
                {order.address?.fullName}<br />
                {order.address?.street}<br />
                {order.address?.city}, {order.address?.state} {order.address?.zipCode}<br />
                {order.address?.country}
              </p>
            </CardContent>
          </Card>

          {/* Payment Status */}
          <Card className="border-zinc-200 shadow-sm">
            <CardHeader className="border-b bg-zinc-50/50 py-4">
              <CardTitle className="text-lg flex items-center gap-2 font-semibold">
                Payment Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant="success" className="font-medium rounded-full px-4 py-1">
                  Paid
                </Badge>
              </div>
               <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Method</span>
                <span className="text-sm font-medium text-zinc-900">Online Payment</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
