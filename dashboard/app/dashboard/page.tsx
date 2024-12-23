import BotSettings from "@/components/BotSettings";
import Menu from "@/components/Menu";

import React from "react";

const page = () => {
  return (
    <div className="flex">
      <Menu />
      <BotSettings />
    </div>
  );
};

export default page;
