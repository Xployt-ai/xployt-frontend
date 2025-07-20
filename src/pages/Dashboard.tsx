import UNavBar from "@/components/UNavbar";
import React from "react";
import LoadRepo from "@/features/LoadRepo";
import Footer from "@/components/Footer";

const Dashboard: React.FC = () => {
  return (
    <>
      <UNavBar />
      <LoadRepo />
      <Footer />
    </>
  );
};


export default Dashboard;