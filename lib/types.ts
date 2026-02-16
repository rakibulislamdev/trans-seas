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

// --- project types ---
export type ProjectStatus = "active" | "completed" | "all";

export interface IProject {
  id: string;
  title: string;
  projectCode: string;
  clientName: string;
  clientEmail?: string;
  location: string;
  currency?: string;
  itemCount: number;
  rfqCount: number;
  totalAmount: number;
  status: ProjectStatus;
}

// --- project types ---
