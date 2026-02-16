"use client";

import React, { useState } from "react";
import { UserPlus, Trash2 } from "lucide-react";
import Image from "next/image";
import InviteUserModal from "./InviteUserModal";

// 1. Type Definitions
interface TeamMember {
    id: string;
    name: string;
    email: string;
    avatar: string;
    status: "Active" | "Inactive";
    joinedDate: string;
    hasAdminAccess: boolean;
}

// Mock Data
const initialMembers: TeamMember[] = Array(4).fill({
    id: "1",
    name: "Gianluigi Rodriguez",
    email: "gianluigirodriguez@gmail.com",
    avatar: "https://i.pravatar.cc/150?u=gianluigi",
    status: "Active",
    joinedDate: "Nov 5, 2025",
    hasAdminAccess: true,
});

export default function InviteUserList() {
    const [members, setMembers] = useState<TeamMember[]>(initialMembers);
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

    return (
        <div className="max-w-6xl mx-auto py-6 font-sans text-[#1a1a1a]">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Team Directory</h1>
                    <p className="text-gray-500 text-sm mt-1">30 members</p>
                </div>
                <button
                    onClick={() => setIsInviteModalOpen(true)}
                    className="bg-[#0070c0] hover:bg-[#005da1] text-white px-5 py-2.5 rounded-full font-semibold flex items-center gap-2 transition-colors shadow-sm text-sm"
                >
                    Invite User
                    <UserPlus size={18} />
                </button>
            </div>

            {/* Table Container */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100 bg-white">
                                <th className="px-6 py-4 text-sm font-medium text-gray-600">User</th>
                                <th className="px-6 py-4 text-sm font-medium text-gray-600">Status</th>
                                <th className="px-6 py-4 text-sm font-medium text-gray-600">Joined</th>
                                <th className="px-6 py-4 text-sm font-medium text-gray-600 text-center">Admin Access</th>
                                <th className="px-6 py-4 text-sm font-medium text-gray-600 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {members.map((member, index) => (
                                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                    {/* User Info */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                                                <Image
                                                    src={member.avatar}
                                                    alt={member.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-sm text-gray-800">{member.name}</span>
                                                <span className="text-xs text-gray-400 font-medium">{member.email}</span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Status Badge */}
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                                            {member.status}
                                        </span>
                                    </td>

                                    {/* Joined Date */}
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium text-gray-700">
                                            {member.joinedDate}
                                        </span>
                                    </td>

                                    {/* Admin Toggle Switch */}
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center">
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    defaultChecked={member.hasAdminAccess}
                                                />
                                                <div className="w-11 h-6 bg-blue-100 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0070c0]"></div>
                                            </label>
                                        </div>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-red-400 hover:text-red-600 transition-colors p-2">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <InviteUserModal
                isOpen={isInviteModalOpen}
                onClose={() => setIsInviteModalOpen(false)}
            />
        </div>
    );
}
