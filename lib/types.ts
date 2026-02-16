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
export type ProjectStatus = "active" | "draft" | "all";

export interface IProject {
  id: string;
  title: string;
  projectCode: string;
  clientName: string;
  location: string;
  itemCount: number;
  rfqCount: number;
  totalAmount: number;
  status: ProjectStatus;
}

// --- project types ---
