"use client";

import { AppShell } from "@/components/app-shell";

export default function AdminSidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell>
      {children}
    </AppShell>
  );
}
