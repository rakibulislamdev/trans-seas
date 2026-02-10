import { ChevronRight, Edit3 } from "lucide-react";
import { ProjectType } from "../../page";


export default function ProjectsCard({ projects }: { projects: ProjectType[] }) {
    return (
        <div className="bg-card rounded-2xl border border-prj-gray/20 overflow-hidden mb-8">
            <div className="flex justify-between items-center border-b border-border/50 p-4">
                <h2 className="text-body font-base text-text-strong-black">Active Projects</h2>
                <Edit3 size={24} className="text-brand-primary cursor-pointer hover:opacity-60 transition-opacity" />
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        {/* text-tiny = 11px */}
                        <tr className="text-14 font-bold">
                            <th className="p-4">Project</th>
                            <th className="p-4">Client</th>
                            <th className="p-4 text-center">Items</th>
                            <th className="p-4 text-center">RFQs</th>
                            <th className="p-4">Est. Order Date</th>
                            <th className="p-4">Est. Value</th>
                            <th className="p-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/20">
                        {projects.map((proj, idx) => (
                            <tr key={idx} className="hover:bg-muted/30 transition-colors group">
                                <td className="p-4">
                                    <div className="font-normal text-text-strong-black text-body">{proj.name}</div>
                                    <div className="text-14 text-prj-gray font-normal leading-5">{proj.id}</div>
                                </td>
                                <td className="p-4 text-body font-normal text-text-strong-black">{proj.client}</td>
                                <td className="p-4 text-center font-normal text-body text-text-strong-black">{proj.items}</td>
                                <td className="p-4 text-center font-normal text-body text-text-strong-black">{proj.rfqs}</td>
                                <td className="p-4 text-body text-text-strong-black font-normal">{proj.estOrderDate}</td>
                                <td className="p-4 text-body font-normal text-text-strong-black">{proj.estValue}</td>
                                <td className="p-4 text-center">
                                    <ChevronRight className="w-5 h-5 text-text-strong-black group-hover:text-primary transition-colors inline cursor-pointer" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
