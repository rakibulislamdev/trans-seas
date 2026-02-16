"use client";

import React, { useState } from "react";
import { ReusableModal } from "@/components/common/ReusableModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface InviteUserModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const InviteUserModal = ({ isOpen, onClose }: InviteUserModalProps) => {
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const handleSendInvite = () => {
        if (!email) {
            toast.error("Please enter an email address");
            return;
        }
        // Simulate API call
        toast.success("Invite Sent!", {
            description: `An invitation has been sent to ${email}`,
        });
        handleClose();
    };

    const handleClose = () => {
        setEmail("");
        setIsAdmin(false);
        onClose();
    };

    return (
        <ReusableModal
            isOpen={isOpen}
            onOpenChange={(open) => !open && handleClose()}
            title=""
            className="sm:max-w-[500px] p-0 overflow-hidden rounded-[40px]"
        >
            <div className="p-10 space-y-8">
                <h2 className="text-[32px] font-bold text-[#1a1a1a] tracking-tight">
                    Invite New User
                </h2>

                <div className="space-y-3">
                    <label className="text-lg font-bold text-[#1a1a1a]">Email</label>
                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-16 px-6 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-lg placeholder:text-gray-400"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h3 className="text-xl font-bold text-[#1a1a1a]">Grant Admin Access</h3>
                        <p className="text-gray-500 text-base">
                            User can manage settings and permissions
                        </p>
                    </div>
                    <button
                        onClick={() => setIsAdmin(!isAdmin)}
                        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-200 focus:outline-none ${isAdmin ? "bg-[#0070c0]" : "bg-gray-200"
                            }`}
                    >
                        <span
                            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-200 ${isAdmin ? "translate-x-7" : "translate-x-1"
                                }`}
                        />
                    </button>
                </div>

                <div className="flex items-center gap-4 pt-4">
                    <button
                        onClick={handleSendInvite}
                        className="flex-1 h-16 rounded-full bg-[#0070c0] hover:bg-[#005da1] text-white text-xl font-bold transition-all active:scale-95 shadow-md"
                    >
                        Send Invite
                    </button>
                    <button
                        onClick={handleClose}
                        className="flex-1 h-16 rounded-full border-2 border-[#0070c0] text-[#0070c0] hover:bg-blue-50 text-xl font-bold transition-all active:scale-95"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </ReusableModal>
    );
};

export default InviteUserModal;
