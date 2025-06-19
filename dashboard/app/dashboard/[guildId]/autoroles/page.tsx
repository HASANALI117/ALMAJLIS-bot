import AutoroleComponent from "@/components/dashboard/Autorole";
import HeaderComponent from "@/components/layout/Header";
import React from "react";

const AutoRolesPage = () => {
  return (
    <>
      {/* Section Header */}
      <HeaderComponent section="autoroles" />
      {/* Content */}
      <div className="space-y-6">
        <AutoroleComponent />
      </div>
    </>
  );
};

export default AutoRolesPage;
