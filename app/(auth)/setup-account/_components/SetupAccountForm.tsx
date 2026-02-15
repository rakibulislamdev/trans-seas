"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { ArrowRight } from "lucide-react";

const setupSchema = z.object({
    fullName: z.string().min(2, { message: "Name is required" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type SetupAccountValues = z.infer<typeof setupSchema>;

export default function SetupAccountForm() {
    const form = useForm<SetupAccountValues>({
        resolver: zodResolver(setupSchema),
        defaultValues: { fullName: "", password: "", confirmPassword: "" },
    });

    function onSubmit(data: SetupAccountValues) {
        console.log("Account Setup Data:", data);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                {/* Full Name Field */}
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-text-strong font-normal text-16">Enter full name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your full name"
                                    className="h-12 md:h-14 rounded-xl border-muted-foreground/20 focus-visible:ring-brand-primary focus-visible:ring-offset-0 text-14"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-xs text-system-red" />
                        </FormItem>
                    )}
                />

                {/* Password Field */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-text-strong font-normal text-16">Enter New Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    className="h-12 md:h-14 rounded-xl border-muted-foreground/20 focus-visible:ring-brand-primary focus-visible:ring-offset-0 text-14"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-xs text-system-red" />
                        </FormItem>
                    )}
                />

                {/* Confirm Password Field */}
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-text-strong font-normal text-16">Confirm New Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    className="h-12 md:h-14 rounded-xl border-muted-foreground/20 focus-visible:ring-brand-primary focus-visible:ring-offset-0 text-14"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-xs text-system-red" />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="w-full h-12 md:h-14 bg-brand-primary hover:bg-brand-primary! text-text-strong-white! rounded-full text-16 font-semibold flex items-center justify-center gap-2 transition-all mt-4 active:scale-[0.98] group cursor-pointer"
                >
                    Create Account
                    <ArrowRight size={18} className="md:w-5 md:h-5 transition-transform group-hover:translate-x-1" />
                </Button>
            </form>
        </Form>
    );
}