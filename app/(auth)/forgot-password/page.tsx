import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import logo from "@/public/auth/logo.png";
import background_logo from "@/public/auth/background_logo.png";
import ForgotPasswordForm from "./_components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-dashboard-bg overflow-hidden">

            {/* Background Watermark - Responsive Scaling */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none">
                <div className="relative w-75 h-75 sm:w-125 sm:h-125 md:w-175 md:h-175 lg:w-290 lg:h-225">
                    <Image
                        src={background_logo}
                        alt="Watermark"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>

            {/* Top Left Logo */}
            <div className="absolute top-6 left-6 md:top-10 md:left-10 z-20">
                <Image
                    src={logo}
                    alt="Trans Seal Logo"
                    width={100}
                    height={50}
                    className="object-contain w-24 md:w-35 h-auto"
                />
            </div>

            {/* Main Card */}
            <div className="relative z-10 w-full max-w-130 bg-white dark:bg-card rounded-3xl shadow-[0px_20px_60px_rgba(0,113,189,0.08)] p-6 sm:p-10 md:p-12 border border-brand-primary/5">

                {/* Back Arrow */}
                <Link
                    href="/login"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-50 transition-colors mb-6 -ml-2 group"
                >
                    <ArrowLeft size={24} className="text-brand-primary group-hover:-translate-x-1 transition-transform" />
                </Link>

                <div className="mb-8 text-left">
                    <h1 className="text-28 md:text-40 font-semibold text-text-strong mb-3 tracking-tight leading-[1.2] whitespace-nowrap">
                        Forgot your password?
                    </h1>
                    <p className="text-prj-gray text-14 md:text-16 font-normal leading-relaxed">
                        Enter your email address, and we'll send you a one-time password (OTP) to reset your password.
                    </p>
                </div>

                <ForgotPasswordForm />
            </div>
        </div>
    );
}