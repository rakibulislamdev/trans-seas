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
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const resetPasswordSchema = z.object({
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
    const form = useForm<ResetPasswordValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: { password: "", confirmPassword: "" },
    });

    function onSubmit(data: ResetPasswordValues) {
        console.log("Resetting password...", data);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 md:space-y-6">

                {/* New Password Field */}
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
                                    className="h-12 md:h-14 rounded-xl border-muted-foreground/20 focus-visible:ring-brand-primary focus-visible:ring-offset-0"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-xs" />
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
                                    className="h-12 md:h-14 rounded-xl border-muted-foreground/20 focus-visible:ring-brand-primary focus-visible:ring-offset-0"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="w-full h-12 md:h-14 bg-brand-primary hover:bg-brand-primary! group text-text-strong-white! rounded-full text-16 font-semibold transition-all mt-4 active:scale-[0.98] cursor-pointer"
                >
                    Reset Password
                    <ArrowRight size={24} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Button>

                <div className="text-center pt-2">
                    <p className="text-14 text-prj-gray">
                        Remember your password?{" "}
                        <Link href="/login" className="text-brand-primary font-semibold hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </form>
        </Form>
    );
}