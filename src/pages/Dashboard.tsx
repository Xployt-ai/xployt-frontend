import UNavBar from "@/components/UNavbar";
import React from "react";
import LoardRepo from "@/features/LoadRepo";

const Dashboard: React.FC = () => {
  return (
    <>
      <UNavBar />
      <LoardRepo />
    </>
  );
};


export default Dashboard;