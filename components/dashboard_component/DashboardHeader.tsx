"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export function DashboardHeader() {

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="px-4 sm:px-6 lg:px-8 py-7">
        <div className="flex items-center justify-between gap-4">
          {/* Left side - Can add breadcrumbs or title here */}
          <div className="flex-1">
            <h1 className="text-xl sm:text-xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
          </div>

          {/* Right side - User info */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* User details - hidden on mobile */}
            <div className="hidden sm:block text-right">
         
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                </div>
          
                <>
                  <p className="text-sm font-semibold text-gray-900 leading-tight">
                    Loading...
                  </p>
                  <p className="text-xs font-medium text-gray-500 capitalize">
                    Fetching user data
                  </p>
                </>
          
            </div>

            {/* Avatar */}
            <Avatar className="h-9 w-9 sm:h-10 sm:w-10 ring-2 ring-[#314B79] ring-offset-2 transition-transform hover:scale-105">
              <AvatarImage
                src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png"
                alt="admin-profile"
                className="object-cover"
                width={200}
                height={200}
              />
              <AvatarFallback className="bg-linear-to-br from-[#314B79] to-[#4A6FA5] text-white font-semibold text-sm sm:text-base">
              Alok Roy
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
