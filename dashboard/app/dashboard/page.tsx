import React from "react";

import Dashboard from "@/components/Dashboard";
import { AuthProvider } from "@/contexts/AuthContext";

const page = () => {
  return (
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  );
};

export default page;
