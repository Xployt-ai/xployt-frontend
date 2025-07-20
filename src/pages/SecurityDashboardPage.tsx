import UNavBar from "@/components/UNavbar";
import Footer from "@/components/Footer";   
import SecurityDashboard from "@/features/SecurityDashboard";        

const SecurityDashboardPage = () => {
  return (
    <>
      <UNavBar />
        <SecurityDashboard />
      <Footer />
    </>
  );
};

export default SecurityDashboardPage;
