"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardPage = () => {
  const { guildId } = useParams();
  const router = useRouter();

  useEffect(() => {
    // Redirect to the default dashboard section
    router.replace(`/dashboard/${guildId}/bot-settings`);
  }, [guildId, router]);

  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-white/70">Redirecting to dashboard...</p>
      </div>
    </div>
  );
};

export default DashboardPage;
