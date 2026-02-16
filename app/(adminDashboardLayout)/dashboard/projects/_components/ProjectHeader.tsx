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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export const ProjectHeader = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const currentStatus = searchParams.get('status') || 'all';

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    const handleStatusChange = (newStatus: string) => {
        const params = new URLSearchParams(searchParams);
        if (newStatus === 'all') {
            params.delete('status');
        } else {
            params.set('status', newStatus);
        }
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-3 w-full items-center">

                {/* Search Input */}
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
                    {/* Status Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="h-11 px-6 rounded-xl border-gray-200 bg-white font-semibold text-gray-600 capitalize shadow-sm min-w-30">
                                {currentStatus === 'all' ? 'All Status' : currentStatus}
                                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40 rounded-xl shadow-lg border-blue-50">
                            <DropdownMenuItem className="cursor-pointer font-medium" onClick={() => handleStatusChange('all')}>
                                All Status
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer font-medium" onClick={() => handleStatusChange('active')}>
                                Active
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer font-medium" onClick={() => handleStatusChange('draft')}>
                                Draft
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* New Project Modal */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="h-11 px-6 rounded-xl bg-[#0073BE] hover:bg-[#005fa0] font-bold shadow-[0_4px_14px_0_rgb(0,115,190,0.3)] transition-all flex-1 sm:flex-none">
                                <Plus className="mr-2 h-5 w-5" />
                                <span>New Project</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px] rounded-2xl border-none shadow-2xl">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold text-gray-800">Create New Project</DialogTitle>
                                <DialogDescription>
                                    Enter the details below to start a new hotel project.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-5 py-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Project Name</label>
                                    <Input placeholder="e.g. Marina Bay Hotel" className="rounded-lg h-11" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Client Name</label>
                                    <Input placeholder="Enter client info" className="rounded-lg h-11" />
                                </div>
                                <Button className="w-full bg-[#0073BE] rounded-xl h-12 font-bold text-lg mt-2 shadow-lg shadow-blue-200">
                                    Create Project
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </header>
    );
};