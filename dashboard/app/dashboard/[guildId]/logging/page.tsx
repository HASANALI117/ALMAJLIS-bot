import LoggingComponent from "@/components/dashboard/Logging";
import HeaderComponent from "@/components/layout/Header";
import React from "react";

const LoggingPage = () => {
  return (
    <>
      {/* Section Header */}
      <HeaderComponent section="logging" />
      {/* Content */}
      <div className="space-y-6">
        <LoggingComponent />
      </div>
    </>
  );
};

export default LoggingPage;
