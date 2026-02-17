"use client";

import { use, useState } from 'react';
import { FileText, Package, Send, DollarSign, Files } from 'lucide-react';
import { ProjectDetailsHeader } from '../_components/ProjectDetailsHeader';
import { StatsCards } from '../_components/StatsCards';
import { DocumentSection } from '../_components/DocumentSection';
import { ExtractedItemsTable } from '../_components/ExtractedItemsTable';
import { RFQItemSection } from './rfq/_components/RFQItemSection';
import ProjectQuotesContainer from './quote/_components/ProjectQuotesContainer';

export default function ProjectDetailsPage({ params }: { params: Promise<{ projectId: string }> }) {
    const resolvedParams = use(params)
    const projectId = resolvedParams.projectId
    const [activeTab, setActiveTab] = useState('docs');

    // Tab content mapping
    const renderContent = () => {
        switch (activeTab) {
            case 'docs':
                return <DocumentSection />;
            case 'items':
                return <ExtractedItemsTable />
            case 'rfq':
                return <RFQItemSection projectId={projectId} />
            case 'quotes':
                return <ProjectQuotesContainer params={{ projectId }} />
            case 'proposals':
                return <div className="p-10 text-center text-gray-400 bg-white rounded-2xl border border-dashed border-gray-200">Proposals Management Section</div>;
            default:
                return <DocumentSection />;
        }
    };

    const tabs = [
        { id: 'docs', label: 'Documents', icon: Files },
        { id: 'items', label: 'Items', icon: Package },
        { id: 'rfq', label: "RFQ's", icon: Send },
        { id: 'quotes', label: 'Quotes', icon: DollarSign },
        { id: 'proposals', label: 'Proposals', icon: FileText },
    ];

    return (
        <div className="min-h-screen">
            <div>
                <ProjectDetailsHeader />

                <StatsCards />

                {/* Custom Nav Tabs - Fixed for Mobile & Tab */}
                <div className="w-full overflow-x-auto no-scrollbar mb-8">
                    <div className="bg-gray-100/50 p-1.5 rounded-xl inline-flex gap-1 md:gap-2 border border-gray-200 min-w-max">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${isActive
                                        ? 'bg-white shadow-sm text-gray-800'
                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                                        }`}
                                >
                                    <tab.icon
                                        size={18}
                                        className={`${isActive ? 'text-[#0073BE]' : 'text-gray-400'} w-4 h-4 md:w-4.5 md:h-4.5`}
                                    />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>



                {/* Content Section - Based on Active Tab */}
                <div className="transition-all duration-300">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}