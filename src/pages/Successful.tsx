import SuccessMessage from "@/components/ui/SuccessMessage";
import ProjectDetails from "@/components/ui/ProjectDetails";
import ProgressBar from "@/components/ui/ProgressBar";
import ContinueButton from "@/components/ui/ContinueButton";

const Successful = () => {
  const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
  const repositories = [{ name: "Automatisch", date: today }];

  const handleContinue = () => {
    console.log("Continue clicked! Navigate to dashboard...");
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="bg-[#1C1C1E] w-full max-w-[720px] rounded-2xl shadow-lg border border-gray-700 p-12 space-y-8 text-center">
        <SuccessMessage />
        <ProjectDetails repositories={repositories} />
        <ProgressBar progress={67} />
        {/* Added cursor-pointer here */}
        <ContinueButton onClick={handleContinue} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Successful;
