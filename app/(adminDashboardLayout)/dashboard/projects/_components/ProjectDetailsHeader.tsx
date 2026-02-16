import { ArrowLeft, Building2, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';

export const ProjectDetailsHeader = () => {
    return (
        <div className="flex flex-col gap-4 mb-6 md:mb-8">
            {/* Top Row: Back, Title, Status and Action Button */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 md:gap-4">
                    <Link href="/dashboard/projects" className="p-1.5 md:p-2 hover:bg-blue-50 rounded-full transition-colors shrink-0">
                        <ArrowLeft className="text-[#0073BE] w-5 h-5 md:w-6 md:h-6" />
                    </Link>
                    <div className="flex flex-wrap items-center gap-2 md:gap-3">
                        <h1 className="text-lg md:text-2xl font-bold text-gray-800 leading-tight">Marina Bay Hotel</h1>
                        <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200 uppercase px-2 py-0 md:px-3 md:py-0.5 text-[8px] md:text-[10px] font-black shrink-0">
                            active
                        </Badge>
                    </div>
                </div>

                <Button className="bg-[#0073BE] hover:bg-[#005fa0] font-bold rounded-xl px-4 md:px-6 py-2 md:py-3 text-white h-10 md:h-auto text-xs md:text-sm w-full sm:w-auto shadow-md">
                    Mark as Complete
                </Button>
            </div>

            {/* Bottom Row: Metadata Info */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 ml-0 md:ml-12 text-11 md:text-sm text-gray-500 font-medium bg-blue-50/30 md:bg-transparent p-3 md:p-0 rounded-lg md:rounded-none">
                <span className="bg-white md:bg-transparent px-2 md:px-0 py-0.5 md:py-0 rounded border md:border-none w-fit">PRJ-2026-0001</span>

                <div className="flex items-center gap-2">
                    <Building2 className="text-[#0073BE] w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span className="truncate">Marina Bay Hotel & Restaurant</span>
                </div>

                <div className="flex items-center gap-2">
                    <MapPin className="text-[#0073BE] w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span>Dubai, Marina</span>
                </div>
            </div>
        </div>
    );
};