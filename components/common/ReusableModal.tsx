import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface ReusableModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
}

export const ReusableModal = ({
    isOpen,
    onOpenChange,
    title,
    description,
    children,
    className = "sm:max-w-125",
}: ReusableModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className={`${className} rounded-2xl border-none shadow-2xl`}>
                <DialogHeader>
                    {
                        title && (
                            <DialogTitle className="text-2xl">
                                {title}
                            </DialogTitle>
                        )
                    }
                    {description && (
                        <DialogDescription className="text-gray-500">
                            {description}
                        </DialogDescription>
                    )}
                </DialogHeader>
                <div className="py-2">
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    );
};