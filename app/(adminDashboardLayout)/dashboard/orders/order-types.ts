// export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered";
// export type PaymentStatus = "Paid" | "Pending" | "Low Stock";

// export interface OrderItem {
//   id: string;
//   name: string;
//   quantity: number;
//   price: number;
//   image: string;
// }

// export interface Order {
//   id: string;
//   customerName: string;
//   customerEmail: string;
//   customerPhone: string;
//   date: string;
//   paymentStatus: PaymentStatus;
//   orderStatus: OrderStatus;
//   total: number;
//   shippingAddress: string;
//   paymentMethod: string;
//   items: OrderItem[];
//   subtotal: number;
//   shipping: number;
//   tax: number;
// }

// export const MOCK_ORDERS: Order[] = [
//   {
//     id: "ORD-2847",
//     customerName: "Sarah Johnson",
//     customerEmail: "sarah.johnson@email.com",
//     customerPhone: "+1 (555) 123-4567",
//     date: "2026-01-20",
//     paymentStatus: "Low Stock",
//     orderStatus: "Processing",
//     total: 102.3,
//     shippingAddress: "Banasree, Dhaka",
//     paymentMethod: "Visa ending in 4242",
//     subtotal: 132.94,
//     shipping: 9.99,
//     tax: 14.29,
//     items: [
//       {
//         id: "p1",
//         name: "N95 Respirator Face Mask",
//         quantity: 2,
//         price: 24.99,
//         image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=200&auto=format&fit=crop",
//       },
//       {
//         id: "p2",
//         name: "N95 Respirator Face Mask",
//         quantity: 2,
//         price: 24.99,
//         image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=200&auto=format&fit=crop",
//       },
//     ],
//   },
//   {
//     id: "ORD-2846",
//     customerName: "Michael Chen",
//     customerEmail: "michael.chen@email.com",
//     customerPhone: "+1 (555) 234-5678",
//     date: "2026-01-20",
//     paymentStatus: "Pending",
//     orderStatus: "Delivered",
//     total: 102.3,
//     shippingAddress: "Gulshan, Dhaka",
//     paymentMethod: "MasterCard ending in 5555",
//     subtotal: 80.0,
//     shipping: 10.0,
//     tax: 12.3,
//     items: [],
//   },
//   {
//     id: "ORD-2845",
//     customerName: "Emma Wilson",
//     customerEmail: "emma.wilson@email.com",
//     customerPhone: "+1 (555) 345-6789",
//     date: "2026-01-19",
//     paymentStatus: "Pending",
//     orderStatus: "Pending",
//     total: 102.3,
//     shippingAddress: "Dhanmondi, Dhaka",
//     paymentMethod: "Visa ending in 1111",
//     subtotal: 80.0,
//     shipping: 10.0,
//     tax: 12.3,
//     items: [],
//   },
//   {
//     id: "ORD-2844",
//     customerName: "James Brown",
//     customerEmail: "james.brown@email.com",
//     customerPhone: "+1 (555) 456-7890",
//     date: "2026-01-18",
//     paymentStatus: "Paid",
//     orderStatus: "Shipped",
//     total: 102.3,
//     shippingAddress: "Uttara, Dhaka",
//     paymentMethod: "Amex ending in 9999",
//     subtotal: 80.0,
//     shipping: 10.0,
//     tax: 12.3,
//     items: [],
//   },
//   {
//     id: "ORD-2843",
//     customerName: "Lisa Anderson",
//     customerEmail: "lisa.anderson@email.com",
//     customerPhone: "+1 (555) 567-8901",
//     date: "2026-01-17",
//     paymentStatus: "Paid",
//     orderStatus: "Delivered",
//     total: 102.3,
//     shippingAddress: "Mirpur, Dhaka",
//     paymentMethod: "Visa ending in 8888",
//     subtotal: 80.0,
//     shipping: 10.0,
//     tax: 12.3,
//     items: [],
//   },
//   {
//     id: "ORD-2842",
//     customerName: "David Martinez",
//     customerEmail: "david.martinez@email.com",
//     customerPhone: "+1 (555) 678-9012",
//     date: "2026-01-16",
//     paymentStatus: "Paid",
//     orderStatus: "Processing",
//     total: 102.3,
//     shippingAddress: "Banasree, Dhaka",
//     paymentMethod: "Visa ending in 4242",
//     subtotal: 132.94,
//     shipping: 9.99,
//     tax: 14.29,
//     items: [],
//   },
// ];
