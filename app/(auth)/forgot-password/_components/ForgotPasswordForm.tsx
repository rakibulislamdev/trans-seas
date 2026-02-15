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
import Link from "next/link";

const forgotPasswordSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
    const form = useForm<ForgotPasswordValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: "" },
    });

    function onSubmit(data: ForgotPasswordValues) {
        console.log("Requesting OTP for:", data.email);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <FormLabel className="text-text-strong font-normal text-16">Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="you@example.com"
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
                    className="w-full h-12 md:h-14 bg-brand-primary/10 hover:bg-brand-primary/20! text-brand-primary rounded-full text-16 font-semibold flex items-center justify-center gap-2 transition-all mt-4 border-none shadow-none group cursor-pointer"
                >
                    Send OTP
                    <ArrowRight size={18} className="md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>

                <div className="text-center pt-2">
                    <p className="text-14 text-prj-gray">
                        Remember your password?{" "}
                        <Link href="/login" className="text-brand-primary font-semibold hover:underline transition-all">
                            Log in
                        </Link>
                    </p>
                </div>
            </form>
        </Form>
    );
}