"use client";

import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  footerNavLinks,
  adminNavGroups,
  studentNavGroups,
} from "@/components/app-shared";
import { NavGroup } from "@/components/nav-group";
import { useAuthStore } from "@/lib/store";
import Link from "next/link";
import { NavUser } from "@/components/nav-user";

export function AppSidebar() {
  const user = useAuthStore((state) => state.user);
  const groups = user?.role === "admin" ? adminNavGroups : studentNavGroups;

  return (
    <Sidebar
      className={cn(
        "*:data-[slot=sidebar-inner]:bg-background",
        "*:data-[slot=sidebar-inner]:dark:bg-[radial-gradient(60%_18%_at_10%_0%,--theme(--color-foreground/.08),transparent)]",
        "**:data-[slot=sidebar-menu-button]:[&>span]:text-foreground/75",
      )}
      collapsible="icon"
      variant="sidebar"
    >
      <SidebarHeader className="h-14 justify-center border-b px-2">
        <SidebarMenuButton asChild size="lg">
          <Link
            href="/"
            className="group-data-[collapsible=icon]:justify-center"
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-near-black text-white shrink-0 shadow-sm">
              <span className="text-xs font-bold">LL</span>
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden ml-2">
              <span className="font-bold text-foreground! tracking-tight">
                LevelLogic
              </span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        {groups.map((group, index) => (
          <NavGroup key={`sidebar-group-${index}`} {...group} />
        ))}
      </SidebarContent>
      <SidebarFooter className="gap-0 py-2">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
