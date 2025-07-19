import UNavBar from "@/components/UNavbar";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import BillCard from "@/features/BillCard";

const Bill = () => {
  return (
    <>
      <UNavBar />
      <div className='bg-black min-h-screen'>    
        <div className="w-full max-w-4xl mx-auto py-6 px-0 bg-transparent min-h-screen">
          <div className="flex flex-col items-start justify-start ">
            <TypographyH1>
              Billing
            </TypographyH1>
            <TypographyP className="text-slate-400">
                Manage your Xployt.ai subscription and payment history.
            </TypographyP>
        </div>  
          
              <BillCard />

    </div>
    </div>
    </>
  );
};

export default Bill;
