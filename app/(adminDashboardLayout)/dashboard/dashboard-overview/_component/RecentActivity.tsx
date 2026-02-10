import { Button } from "@/components/ui/button";
import { ActivityType } from "../../page";

export default function RecentActivity({ activities }: { activities: ActivityType[] }) {
    return (
        <div className="bg-card rounded-2xl border border-prj-gray/20 p-4">
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-body font-normal text-text-strong-black">Recent Activity</h2>
                <Button className="text-14 h-auto font-normal bg-prj-gray/10 px-3 py-1.5 rounded-lg text-text-strong-black hover:bg-border/50 transition-colors uppercase tracking-wider cursor-pointer">
                    View all
                </Button>
            </div>
            <div className="space-y-10 relative before:absolute before:left-1.75 before:top-2 before:bottom-2 before:w-[1.5px] before:bg-border/50">
                {activities.map((item) => (
                    <div key={item.id} className="relative pl-9">
                        <div className="absolute left-0 top-1 w-3.5 h-3.5 rounded-full border-[3px] border-card bg-muted-foreground/50 shadow-sm transition-colors hover:bg-primary cursor-default"></div>
                        <p className="text-body font-normal text-text-strong-black leading-none">{item.text}</p>
                        <p className="text-14 font-normal text-text-weak mt-2 uppercase tracking-wide">{item.timestamp}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
