"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Form Validation Schema
const formSchema = z.object({
    projectName: z.string().min(2, "Project name is required"),
    clientName: z.string().min(2, "Client name is required"),
    location: z.string().min(2, "Location is required"),
    clientEmail: z.string().email("Invalid email address"),
    currency: z.string().min(1, "Currency is required"),
});

type ProjectFormValues = z.infer<typeof formSchema>;

export const ProjectForm = ({ onSuccess }: { onSuccess: () => void }) => {
    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            projectName: "",
            clientName: "",
            location: "",
            clientEmail: "",
            currency: "USD",
        },
    });

    function onSubmit(values: ProjectFormValues) {
        console.log(values);
        // API Call ekhane hobe
        onSuccess();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Project Name */}
                <FormField
                    control={form.control}
                    name="projectName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-600 font-semibold">Project Name</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. Grand Hyatt Tower Hotel" {...field} className="h-11 rounded-lg border-blue-200 focus:ring-1 focus:ring-blue-400" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    {/* Client Name */}
                    <FormField
                        control={form.control}
                        name="clientName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-600 font-semibold">Client Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Kareem Sheikh" {...field} className="h-11 rounded-lg border-blue-200" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Location */}
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-600 font-semibold">Location</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Dubai, UAE" {...field} className="h-11 rounded-lg border-blue-200" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Client Email */}
                <FormField
                    control={form.control}
                    name="clientEmail"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-600 font-semibold">Client Email</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. kareemsheikh@gmail.com" {...field} className="h-11 rounded-lg border-blue-200" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Currency */}
                <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-600 font-semibold">Currency</FormLabel>
                            <FormControl>
                                <Input {...field} className="h-11 rounded-lg border-blue-200" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Footer Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onSuccess}
                        className="h-11 px-8 rounded-xl border-blue-400 text-[#0073BE] font-bold hover:bg-blue-50"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="h-11 px-6 rounded-xl bg-[#0073BE] hover:bg-[#005fa0] font-bold text-white flex items-center gap-2"
                    >
                        New Project <ArrowRight size={18} />
                    </Button>
                </div>
            </form>
        </Form>
    );
};