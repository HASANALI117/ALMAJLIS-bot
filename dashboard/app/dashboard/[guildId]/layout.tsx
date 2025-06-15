"use client";

import { GuildProvider } from "@/contexts";
import { useParams } from "next/navigation";
import { ReactNode } from "react";
import DashboardShell from "@/components/layout/DashboardShell";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { guildId } = useParams();

  return (
    <GuildProvider id={guildId as string}>
      <DashboardShell>{children}</DashboardShell>
    </GuildProvider>
  );
}
