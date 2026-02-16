import { Pencil, Building2, MapPin } from 'lucide-react';
import { IProject } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const ProjectCard = ({ project }: { project: IProject }) => {
    return (
        <Card className="rounded-2xl border border-[rgb(0,115,190)]/20 shadow-[0px_4px_8px_0px_rgba(0,115,190,0.2)] hover:shadow-md transition-all group cursor-pointer">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 p-4 pb-2">
                <Badge className={`${project.status === "active" ? "bg-green-50 text-green-600 border-green-100 hover:bg-green-100" : "bg-yellow-50 text-yellow-600 border-yellow-100 hover:bg-yellow-100 "} uppercase text-[10px] font-bold px-3`}>
                    {project.status}
                </Badge>
                <button className="text-blue-300 group-hover:text-[#0073BE] transition-colors">
                    <Pencil size={18} />
                </button>
            </CardHeader>

            <CardContent className="px-6">
                <h3 className="text-xl font-bold text-gray-800 leading-tight mb-1">{project.title}</h3>
                <p className="text-gray-400 text-xs font-mono mb-5">{project.projectCode}</p>

                <div className="space-y-3">
                    <div className="flex items-center text-gray-600 text-sm">
                        <Building2 size={16} className="mr-3 text-[#0073BE] shrink-0" />
                        <span className="truncate">{project.clientName}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                        <MapPin size={16} className="mr-3 text-[#0073BE] shrink-0" />
                        <span className="truncate">{project.location}</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="px-6 py-4 border-t border-blue-50 flex justify-between items-center bg-gray-50/30 rounded-b-2xl">
                <div className="text-gray-500 text-11 font-medium">
                    {project.itemCount} items • {project.rfqCount} RFQs
                </div>
                <div className="text-lg font-semibold text-gray-900">
                    USD {project.totalAmount.toLocaleString()}
                </div>
            </CardFooter>
        </Card>
    );
};