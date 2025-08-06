"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = Cookies.get("authUser");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-gray-100 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {user.name || user.email}
      </h1>
      {/* Display more user info if available */}
      <p>Role: {user.role}</p>
    </div>
  );
};

export default Dashboard;
