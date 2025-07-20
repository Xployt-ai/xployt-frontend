import SuccessMessage from "@/components/ui/SuccessMessage";
import ProjectDetails from "@/components/ui/ProjectDetails";
import ProgressBar from "@/components/ui/ProgressBar";
import ContinueButton from "@/components/ui/ContinueButton";

const Successful = () => {
  
  const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD" format
const repositories = [{ name: "Automatisch", date: today }];


  const handleContinue = () => {
    console.log("Continue clicked! Navigate to dashboard...");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6 font-sans relative">
      <div className="bg-[#1c1c1e] w-[948px] h-[539px] pl-[22px] pr-[32px] pt-8 pb-8 rounded-2xl shadow-lg text-center space-y-6 border border-gray-700">
        <SuccessMessage />
        <ProjectDetails repositories={repositories} />
        <ProgressBar progress={67} />
        <ContinueButton onClick={handleContinue} />
      </div>
    </div>
  );
};

export default Successful;
