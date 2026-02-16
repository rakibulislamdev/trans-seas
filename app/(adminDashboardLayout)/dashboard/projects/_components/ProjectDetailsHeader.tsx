import { ArrowLeft, Building2, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';

export const ProjectDetailsHeader = () => {
    return (
        <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/projects" className="p-2 hover:bg-blue-50 rounded-full transition-colors">
                        <ArrowLeft className="text-[#0073BE]" size={24} />
                    </Link>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-gray-800">Marina Bay Hotel</h1>
                        <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200 uppercase px-3 py-0.5 text-[10px] font-bold">
                            active
                        </Badge>
                    </div>
                </div>
                <Button className="bg-[#0073BE] hover:bg-[#005fa0] font-bold rounded-xl px-6 py-3 text-white h-auto">
                    Mark as Complete
                </Button>
            </div>

            <div className="flex items-center gap-6 ml-12 text-sm text-gray-500 font-medium">
                <span>PRJ-2026-0001</span>
                <div className="flex items-center gap-2">
                    <Building2 size={16} className="text-[#0073BE]" />
                    <span>Marina Bay Hotel & Restaurant</span>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-[#0073BE]" />
                    <span>Dubai, Marina</span>
                </div>
            </div>
        </div>
    );
};