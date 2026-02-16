"use client";
import { Search, Plus, ChevronDown } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReusableModal } from '@/components/common/ReusableModal';
import { useState } from 'react';
import { ProjectForm } from './ProjectForm';

export const ProjectHeader = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const currentStatus = searchParams.get('status') || 'all';

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 300);

    // 2. Functional Dropdown Sorting/Filtering
    const handleStatusChange = (newStatus: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (newStatus === 'all') {
            params.delete('status');
        } else {
            params.set('status', newStatus);
        }
        replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <>
            <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-3 w-full items-center">

                    {/* Search Input Box */}
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={18} />
                        <Input
                            placeholder="Search by name or code..."
                            defaultValue={searchParams.get('query')?.toString()}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="pl-10 h-11 bg-white rounded-xl border-gray-200 focus-visible:ring-[#0073BE]/20 focus-visible:border-[#0073BE] shadow-sm"
                        />
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        {/* Status Sorting Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="h-11 px-6 rounded-xl border-gray-200 bg-white font-semibold text-gray-600 capitalize shadow-sm min-w-32.5 cursor-pointer">
                                    {currentStatus === 'all' ? 'All Status' : currentStatus}
                                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-44 rounded-xl shadow-lg border-blue-50 p-1">
                                <DropdownMenuItem
                                    className="cursor-pointer font-medium py-2 px-3 focus:bg-blue-50 focus:text-[#0073BE]"
                                    onClick={() => handleStatusChange('all')}
                                >
                                    All Status
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer font-medium py-2 px-3 focus:bg-blue-50 focus:text-[#0073BE]"
                                    onClick={() => handleStatusChange('active')}
                                >
                                    Active
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer font-medium py-2 px-3 focus:bg-blue-50 focus:text-[#0073BE]"
                                    onClick={() => handleStatusChange('draft')}
                                >
                                    Draft
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* New Project Action Button */}
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            className="h-11 px-6 rounded-xl bg-[#0073BE] hover:bg-[#005fa0] font-bold shadow-[0_4px_14px_0_rgb(0,115,190,0.3)] transition-all flex-1 sm:flex-none text-white cursor-pointer"
                        >
                            <span>New Project</span>
                            <Plus className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </header>

            {/* Reusable Modal for Project Creation */}
            <ReusableModal
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
                title="Create New Project"
            >
                <ProjectForm onSuccess={() => setIsModalOpen(false)} />
            </ReusableModal>
        </>
    );
};