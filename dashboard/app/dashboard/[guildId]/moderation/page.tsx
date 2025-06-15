import ComingSoon from "@/components/common/ComingSoon";
import HeaderComponent from "@/components/layout/Header";
import React from "react";

const ModerationPage = () => {
  return (
    <>
      {/* Section Header */}
      <HeaderComponent section="coming-soon" />
      {/* Content */}
      <div className="space-y-6">
        <ComingSoon />
      </div>
    </>
  );
};

export default ModerationPage;
