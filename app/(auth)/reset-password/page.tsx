import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import logo from "@/public/auth/logo.png";
import background_logo from "@/public/auth/background_logo.png";
import ResetPasswordForm from "./_components/ResetPasswordForm";

export default function ResetPasswordPage() {
    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-dashboard-bg overflow-x-hidden p-4 md:p-8">

            {/* Background Watermark */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <div className="relative w-75 h-75 sm:w-125 sm:h-125 md:w-175 md:h-175 lg:w-290 lg:h-225 opacity-[0.04]">
                    <Image
                        src={background_logo}
                        alt="Watermark"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>

            {/* Logo */}
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
            <div className="relative z-10 w-full max-w-137.5 bg-white rounded-2xl border border-brand-primary/10 shadow-[0px_20px_60px_rgba(0,0,0,0.05)] p-6 sm:p-10 md:p-12">

                <Link
                    href="/forgot-password"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full group hover:bg-gray-100 transition-colors mb-6 -ml-2"
                >
                    <ArrowLeft size={24} className="text-brand-primary group-hover:-translate-x-1 transition-transform" />
                </Link>

                <div className="mb-8">
                    <h1 className="text-28 md:text-40 font-bold text-text-strong mb-3 whitespace-nowrap">
                        Enter new password
                    </h1>
                    <p className="text-prj-gray text-14 md:text-16 font-normal">
                        Please create a new password.
                    </p>
                </div>

                <ResetPasswordForm />
            </div>
        </div>
    );
}