import Footer from "@/components/UFooter";
import ScanDashboard from "@/features/Scaning";

const ScanningPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow p-8">
        <ScanDashboard />
      </main>
      <Footer />
    </div>
  );
}

export default ScanningPage;

