"use client";

import WelcomeSection from "./WelcomeSection";
import LeaveSection from "./LeaveSection";
import PlaceholdersSection from "./PlaceholdersSection";

const WelcomeComponent = () => {
  return (
    <div className="space-y-6">
      <WelcomeSection />
      <LeaveSection />
      <PlaceholdersSection />
    </div>
  );
};

export default WelcomeComponent;
