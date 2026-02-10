import { FolderLock } from "lucide-react";

export default function OverviewHeading() {
    return (
        <div className="flex justify-between items-start mb-8">
            <div>
                <h1 className="text-h1 font-bold">Good afternoon, Nader</h1>

                <p className="text-body text-text-weak mt-1 font-medium">
                    Here's what's happening with your procurement activities
                </p>
            </div>
            <button className="flex items-center gap-2 bg-brand-primary hover:opacity-90 text-text-strong-white px-5 py-2.5 rounded-xl font-bold text-18 transition-all shadow-sm cursor-pointer">
                <FolderLock size={21} />
                New Project
            </button>
        </div>
    )
}
