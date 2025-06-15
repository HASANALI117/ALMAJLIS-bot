import AutomodComponent from "@/components/dashboard/Automod";
import HeaderComponent from "@/components/layout/Header";
import React from "react";

const AutoModPage = () => {
  return (
    <>
      {/* Section Header */}
      <HeaderComponent section="automod" />
      {/* Content */}
      <div className="space-y-6">
        <AutomodComponent />
      </div>
    </>
  );
};

export default AutoModPage;
