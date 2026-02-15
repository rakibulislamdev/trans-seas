import Image from "next/image";
import logo from "@/public/auth/logo.png";
import background_logo from "@/public/auth/background_logo.png";
import LoginForm from "./_components/LoginForm";


export default function LoginPage() {
    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-dashboard-bg overflow-x-hidden p-4 md:p-8">
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
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
            <div className="absolute top-6 left-6 md:top-10 md:left-10 z-20">
                <Image
                    src={logo}
                    alt="Trans Seal Logo"
                    width={100}
                    height={50}
                    className="object-contain md:w-35 md:h-17.5"
                />
            </div>
            <div className="relative z-10 w-full max-w-130 bg-dashboard-bg rounded-2xl border border-brand-primary/10 shadow-[0px_20px_60px_rgba(0, 113, 189, 0.20)] p-6 sm:p-10 md:p-12">
                <div className="mb-8 md:mb-10 text-center sm:text-left">
                    <h1 className="text-28 md:text-40 font-semibold text-text-strong mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-prj-gray text-14 md:text-16 font-normal">
                        Log in to continue your application
                    </p>
                </div>

                <LoginForm />
            </div>
        </div>
    );
}