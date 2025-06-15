import WelcomeComponent from "@/components/dashboard/Welcome";
import HeaderComponent from "@/components/layout/Header";
import React from "react";

const WelcomePage = () => {
  return (
    <>
      {/* Section Header */}
      <HeaderComponent section="welcome" />
      {/* Content */}
      <div className="space-y-6">
        <WelcomeComponent />
      </div>
    </>
  );
};

export default WelcomePage;
