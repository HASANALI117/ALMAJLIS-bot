import WebHooksComponent from "@/components/dashboard/Webhooks";
import HeaderComponent from "@/components/layout/Header";
import React from "react";

const WebhooksPage = () => {
  return (
    <>
      {/* Section Header */}
      <HeaderComponent section="webhooks" />
      {/* Content */}
      <div className="space-y-6">
        <WebHooksComponent />
      </div>
    </>
  );
};

export default WebhooksPage;
