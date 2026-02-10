import React from 'react';
import {
  FileText,
  Send,
  FolderLock,
  MailCheck
} from 'lucide-react';
import OverviewHeading from './dashboard-overview/_component/OverviewHeading';
import Stats from './dashboard-overview/_component/Stats';
import ProjectsCard from './dashboard-overview/_component/ProjectsCard';
import RecentActivity from './dashboard-overview/_component/RecentActivity';

// --- Types ---
export interface StatCard {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}

export interface ProjectType {
  name: string;
  id: string;
  client: string;
  items: number;
  rfqs: number;
  estOrderDate: string;
  estValue: string;
}

export interface ActivityType {
  id: number;
  text: string;
  timestamp: string;
}

export const stats: StatCard[] = [
  { label: 'Active Projects', value: 6, icon: <FolderLock /> },
  { label: 'RFQs Sent', value: 2, icon: <Send /> },
  { label: 'Quotes Received', value: 8, icon: <FileText /> },
  { label: 'Proposals Sent', value: 4, icon: <MailCheck /> },
];

export const projects: ProjectType[] = Array(3).fill({
  name: 'Continental Tower',
  id: 'PRJ-226-001',
  client: 'John Development Co.',
  items: 0,
  rfqs: 0,
  estOrderDate: '03 / 15 / 2026',
  estValue: 'USD 0'
});

export const activities: ActivityType[] = [
  { id: 1, text: 'Created project: Marina Bay Hotel FF&E', timestamp: 'Jan 24, 3:44 AM' },
  { id: 2, text: 'Uploaded BOQ file: Marina Hotel BOQ v2.xlsx', timestamp: 'Jan 24, 3:44 AM' },
  { id: 3, text: 'AI extracted 156 items from uploaded documents', timestamp: 'Jan 24, 3:44 AM' },
  { id: 4, text: 'Approved 45 furniture items for RFQ', timestamp: 'Jan 24, 3:44 AM' },
  { id: 5, text: 'Approved 2024-0001 to Global Furniture Solutions', timestamp: 'Jan 24, 3:44 AM' },
];

const DashboardOverviewPage = () => {
  return (
    <div className="min-h-screen">
      <OverviewHeading />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Stats key={index} stat={stat} />
        ))}
      </div>

      {/* Projects Card */}
      <ProjectsCard projects={projects} />

      {/* Activity Section */}
      <RecentActivity activities={activities} />
    </div>
  );
};

export default DashboardOverviewPage;