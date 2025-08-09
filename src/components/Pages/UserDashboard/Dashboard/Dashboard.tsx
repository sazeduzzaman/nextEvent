import React from "react";
import UserDashboardInfo from "./DashboardInfo/UserDashboardInfo";
import DashboardCards from "./DashboardInfo/DashboardCards";

interface DashboardProps {
  events: any;
}

const Dashboard: React.FC<DashboardProps> = ({ events }) => {
  return (
    <div className="rounded-md shadow-md">
      <UserDashboardInfo events={events} />
      <DashboardCards events={events} />
    </div>
  );
};

export default Dashboard;
