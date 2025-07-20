import Navbar from "@/components/UNavbar";
import Footer from "@/components/UFooter";
import ScanDashboard from "@/features/Scaning";

const ScanningPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-8">
        <ScanDashboard />
      </main>
      <Footer />
    </div>
  );
}

export default ScanningPage;

