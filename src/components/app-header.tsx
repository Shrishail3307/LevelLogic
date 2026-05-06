"use client";

import { cn } from "@/lib/utils";
import { DecorIcon } from "@/components/ui/decor-icon";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AppBreadcrumbs } from "@/components/app-breadcrumbs";
import {
  adminNavGroups,
  studentNavGroups,
  footerNavLinks,
} from "@/components/app-shared";
import { CustomSidebarTrigger } from "@/components/custom-sidebar-trigger";
import { NavUser } from "@/components/nav-user";
import { BellIcon, SearchIcon } from "lucide-react";
import { usePathname } from "next/navigation";

export function AppHeader() {
  const pathname = usePathname();

  // Combine all possible nav items to find the current active one
  const allNavItems = [
    ...adminNavGroups.flatMap((g) => g.items),
    ...studentNavGroups.flatMap((g) => g.items),
    ...footerNavLinks,
  ];

  const activeItem = allNavItems.find(
    (item) => item.path && pathname.startsWith(item.path),
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex h-14 shrink-0 items-center justify-between gap-2 border-b px-4 md:px-6",
        "bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50",
      )}
    >
      <DecorIcon className="hidden md:block" position="bottom-left" />
      <div className="flex items-center gap-3">
        <CustomSidebarTrigger />
        <Separator
          className="mr-2 h-4 data-[orientation=vertical]:self-center"
          orientation="vertical"
        />
        <AppBreadcrumbs page={activeItem} />
      </div>
      <div className="flex items-center">
        <Button size="icon" variant="ghost">
          <SearchIcon className="size-4" />
        </Button>
        <Button aria-label="Notifications" size="sm" variant="ghost">
          <BellIcon className="size-4" />
        </Button>
      </div>
    </header>
  );
}
