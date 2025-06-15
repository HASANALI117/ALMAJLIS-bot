import CommandsComponent from "@/components/dashboard/Commands";
import HeaderComponent from "@/components/layout/Header";
import React from "react";

const CommandsPage = () => {
  return (
    <>
      {/* Section Header */}
      <HeaderComponent section="commands" />
      {/* Content */}
      <div className="space-y-6">
        <CommandsComponent />
      </div>
    </>
  );
};

export default CommandsPage;
