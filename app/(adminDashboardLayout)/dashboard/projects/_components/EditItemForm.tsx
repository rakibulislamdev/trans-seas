"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export const EditItemForm = ({ item, onCancel }: { item: unknown, onCancel: () => void }) => {
    return (
        <div className="space-y-5">
            {/* Name Field */}
            <div className="space-y-1.5">
                <Label className="text-gray-600 font-medium">Name</Label>
                <Input
                    defaultValue={item?.name}
                    className="border-blue-200 focus-visible:ring-blue-400 rounded-lg h-11"
                />
            </div>

            {/* Specifications (Textarea) */}
            <div className="space-y-1.5">
                <Label className="text-gray-600 font-medium">Specifications</Label>
                <Textarea
                    defaultValue={item?.desc}
                    className="border-blue-200 focus-visible:ring-blue-400 rounded-xl min-h-25 resize-none"
                />
            </div>

            {/* Commodity & Manufacture (Two Columns) */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <Label className="text-gray-600 font-medium">Commodity</Label>
                    <Select defaultValue={item?.commodity?.toLowerCase().replace(" ", "-")}>
                        <SelectTrigger className="border-blue-200 focus:ring-blue-400 h-11 rounded-lg">
                            <SelectValue placeholder="Select commodity" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="furniture">Furniture</SelectItem>
                            <SelectItem value="stone">Stone</SelectItem>
                            <SelectItem value="wall-covering">Wall Covering</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-1.5">
                    <Label className="text-gray-600 font-medium">Manufacture</Label>
                    <Input
                        defaultValue={item?.manufacturer}
                        className="border-blue-200 focus-visible:ring-blue-400 rounded-lg h-11"
                    />
                </div>
            </div>

            {/* Quantity & Unit (Two Columns) */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <Label className="text-gray-600 font-medium">Quantity</Label>
                    <Input
                        defaultValue={item?.qty?.split(' ')[0]}
                        className="border-blue-200 focus-visible:ring-blue-400 rounded-lg h-11"
                    />
                </div>
                <div className="space-y-1.5">
                    <Label className="text-gray-600 font-medium">Unit</Label>
                    <Select defaultValue="pcs">
                        <SelectTrigger className="border-blue-200 focus:ring-blue-400 h-11 rounded-lg">
                            <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent className="max-h-62.5">
                            <SelectItem value="pcs">pcs</SelectItem>
                            <SelectItem value="sqm">sqm</SelectItem>
                            <SelectItem value="lm">lm</SelectItem>
                            <SelectItem value="kg">kg</SelectItem>
                            <SelectItem value="set">set</SelectItem>
                            <SelectItem value="lot">lot</SelectItem>
                            <SelectItem value="m3">m3</SelectItem>
                            <SelectItem value="ton">ton</SelectItem>
                            <SelectItem value="roll">roll</SelectItem>
                            <SelectItem value="sheet">sheet</SelectItem>
                            <SelectItem value="box">box</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Divider and Footer Buttons */}
            <div className="pt-4 border-t border-blue-50 flex justify-end gap-3">
                <Button
                    variant="outline"
                    onClick={onCancel}
                    className="rounded-xl px-8 h-11 border-blue-400 text-blue-500 hover:bg-blue-50 font-bold"
                >
                    Cancel
                </Button>
                <Button
                    className="rounded-xl px-8 h-11 bg-[#0071BC] hover:bg-[#005a96] text-white font-bold"
                >
                    Approve
                </Button>
            </div>
        </div>
    );
};