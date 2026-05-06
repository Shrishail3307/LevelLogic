"use client";

import { useAuthStore } from "@/lib/store";
import { format } from "date-fns";
import { Bell, Search, User } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export function StudentTopbar() {
  const user = useAuthStore((state) => state.user);
  const today = format(new Date(), "MMMM do, yyyy");

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b border-hairline bg-canvas px-6">
      <div className="flex items-center gap-2 flex-1">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-4 data-[orientation=vertical]:h-10 bg-hairline"
        />
        <div className="flex flex-col">
          <h1 className="text-sm font-medium text-ink tracking-tight">
            Welcome, {user?.name?.split(" ")[0] || "Student"}
          </h1>
          <p className="label-mono text-[10px] text-muted-slate hidden sm:block">
            {today}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 px-4 h-9 bg-stone/50 border border-hairline rounded-full text-muted-slate group cursor-pointer hover:border-action-blue transition-all">
          <Search className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">Search the platform...</span>
          <span className="ml-8 text-[10px] opacity-50">⌘K</span>
        </div>

        <button className="relative w-9 h-9 rounded-full bg-white flex items-center justify-center border border-hairline hover:bg-stone transition-all">
          <Bell className="w-4 h-4 text-ink" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-coral border border-white rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-hairline">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-xs font-medium text-ink">
              {user?.name || "Student User"}
            </span>
            <span className="label-mono text-[9px] text-action-blue">
              Lvl 12 Mastery
            </span>
          </div>
          <div className="w-9 h-9 rounded-full bg-stone border border-hairline flex items-center justify-center overflow-hidden">
            <User className="w-4 h-4 text-ink" />
          </div>
        </div>
      </div>
    </header>
  );
}
