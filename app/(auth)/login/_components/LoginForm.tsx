"use client";

import Link from "next/link";
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
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";


const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    rememberMe: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;



export default function LoginForm() {

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    function onSubmit(data: LoginFormValues) {
        console.log("Form Data:", data);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 md:space-y-6">

                {/* Email Field */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-text-strong font-normal text-16">Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="you@example.com"
                                    className="h-12 md:h-14 rounded-xl border-muted-foreground/20 focus-visible:ring-brand-primary focus-visible:ring-offset-0"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                />

                {/* Password Field */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-text-strong font-normal text-16">Password</FormLabel>
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

                {/* Remember Me & Forgot Password - Layout change for very small screens */}
                <div className="flex flex-row items-center justify-between gap-2">
                    <FormField
                        control={form.control}
                        name="rememberMe"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        className="h-4 w-4 rounded border-muted-foreground/70"
                                    />
                                </FormControl>
                                <FormLabel className="text-xs md:text-14 text-prj-gray font-normal cursor-pointer">
                                    Remember me
                                </FormLabel>
                            </FormItem>
                        )}
                    />
                    <Link
                        href="/forgot-password"
                        className="text-xs md:text-14 font-semibold text-brand-primary hover:underline whitespace-nowrap"
                    >
                        Forgot Password?
                    </Link>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full h-12 md:h-14 bg-brand-primary hover:bg-brand-primary! group text-text-strong-white! rounded-full text-16 font-semibold flex items-center justify-center gap-2 transition-all mt-4 active:scale-[0.98] cursor-pointer"
                >
                    Log in <ArrowRight size={18} className="md:w-5 md:h-5 group-hover:translate-x-1! transition-all" />
                </Button>
            </form>
        </Form>
    )
}
