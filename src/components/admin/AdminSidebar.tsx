"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  PlusCircle,
  FileQuestion,
  Users,
  LogOut,
  Layers,
  Settings,
  Shield,
  ChevronsUpDown,
  BadgeCheck,
  Bell,
  type LucideIcon,
} from "lucide-react";
import { useAuthStore } from "@/lib/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

const mainNav: { title: string; url: string; icon: LucideIcon }[] = [
  { title: "Console", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "All Tests", url: "/admin/tests", icon: Layers },
  { title: "Create Test", url: "/admin/create-test", icon: PlusCircle },
  { title: "Students", url: "/admin/students", icon: Users },
  { title: "Results", url: "/admin/results", icon: BadgeCheck },
];

// Removed System Navigation

// --- NavMain ---
function NavMain({ items }: { items: typeof mainNav }) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="label-mono text-muted-slate mb-2 group-data-[collapsible=icon]:hidden">
        Management
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="gap-1.5">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                size="lg"
                isActive={pathname.startsWith(item.url)}
                tooltip={item.title}
                className="rounded-2xl data-[active=true]:bg-near-black data-[active=true]:text-white data-[active=true]:shadow-lg data-[active=true]:shadow-near-black/10 transition-all duration-200"
              >
                <Link
                  href={item.url}
                  className="flex items-center gap-3 group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:justify-center"
                >
                  <item.icon className="size-5 shrink-0" />
                  <span className="group-data-[collapsible=icon]:hidden font-medium">
                    {item.title}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

// --- NavUser ---
function NavUser() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const { isMobile } = useSidebar();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "AD";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="rounded-2xl data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-full border border-hairline shrink-0">
                <AvatarFallback className="rounded-full bg-stone text-ink text-xs font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight ml-2 group-data-[collapsible=icon]:hidden">
                <span className="truncate font-medium">
                  {user?.name || "Administrator"}
                </span>
                <span className="truncate text-xs text-muted-slate">
                  {user?.email || "admin@levellogic.io"}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-muted-slate group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-xl border-hairline shadow-sm"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarFallback className="rounded-full bg-stone text-ink text-xs font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user?.name || "Administrator"}
                  </span>
                  <span className="truncate text-xs text-muted-slate">
                    {user?.email || "admin@levellogic.io"}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-hairline" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="rounded-lg">
                <BadgeCheck className="w-4 h-4 mr-2" />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-hairline" />
            <DropdownMenuItem
              onClick={handleLogout}
              className="rounded-lg text-error-red"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

// --- Brand Header ---
function BrandHeader() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild className="hover:bg-transparent">
          <Link
            href="/"
            className="flex items-center gap-3 group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:justify-center"
          >
            <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-cohere-black text-white shrink-0 shadow-lg shadow-cohere-black/10">
              <span className="text-sm font-bold">LL</span>
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
              <span className="truncate font-display font-bold text-xl tracking-tight text-ink">
                LevelLogic
              </span>
              <span className="truncate text-[10px] uppercase tracking-[0.15em] text-muted-slate font-bold">
                Console
              </span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

// --- Main Export ---
export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      variant="sidebar"
      className="border-r border-hairline bg-canvas"
      {...props}
    >
      <SidebarHeader className="p-4 group-data-[collapsible=icon]:p-2 border-b border-hairline mb-4">
        <BrandHeader />
      </SidebarHeader>
      <SidebarContent className="px-3 group-data-[collapsible=icon]:px-2">
        <NavMain items={mainNav} />
      </SidebarContent>
      <SidebarFooter className="p-4 group-data-[collapsible=icon]:p-2 border-t border-hairline mt-auto">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
