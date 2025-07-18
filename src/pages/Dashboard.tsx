import UNavBar from "@/components/UNavbar";
import React from "react";
import LoadRepo from "@/features/LoadRepo";

const Dashboard: React.FC = () => {
  return (
    <>
      <UNavBar />
      <LoadRepo />
    </>
  );
};


export default Dashboard;