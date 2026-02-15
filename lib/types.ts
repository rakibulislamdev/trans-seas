// --- quote types ---
export interface Quote {
  id: string;
  status: "Needs Review" | "Parsed" | "Approved";
  project: string;
  vendor: string;
  amount: string;
  items: number;
  date: string;
  validUntil: string;
  hasAlert: boolean;
}
