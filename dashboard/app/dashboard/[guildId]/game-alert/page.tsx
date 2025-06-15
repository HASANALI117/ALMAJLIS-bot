import GamealertsComponent from "@/components/dashboard/Gamealerts";
import HeaderComponent from "@/components/layout/Header";
import React from "react";

const GameAlertsPage = () => {
  return (
    <>
      {/* Section Header */}
      <HeaderComponent section="game-alert" />
      {/* Content */}
      <div className="space-y-6">
        <GamealertsComponent />
      </div>
    </>
  );
};

export default GameAlertsPage;
