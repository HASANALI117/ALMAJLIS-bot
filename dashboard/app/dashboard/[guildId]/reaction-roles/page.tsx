import ReactionrolesComponent from "@/components/dashboard/Reactionroles";
import HeaderComponent from "@/components/layout/Header";
import React from "react";

const ReactionRolesPage = () => {
  return (
    <>
      {/* Section Header */}
      <HeaderComponent section="reaction-roles" />
      {/* Content */}
      <div className="space-y-6">
        <ReactionrolesComponent />
      </div>
    </>
  );
};

export default ReactionRolesPage;
