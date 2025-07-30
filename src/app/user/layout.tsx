// app/user/layout.tsx
import CommonBanner from "@/components/CommonBanner/CommonBanner";
import DashboardSidebar from "@/components/Pages/UserDashboard/Dashboard/DashboardSidebar/DashboardSidebar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CommonBanner
        title="Dashboard"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Dashboard", href: "/user" },
        ]}
      />
      <div className="container mx-auto py-20">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <DashboardSidebar />
          </div>
          <div className="col-span-9">{children}</div>
        </div>
      </div>
    </>
  );
}
