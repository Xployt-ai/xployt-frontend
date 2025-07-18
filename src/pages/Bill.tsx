import UNavBar from "@/components/UNavbar";
import { TypographyH1, TypographyP } from "@/components/ui/typography";

const Bill = () => {
  return (
    <>
      <UNavBar />
      <div className='bg-black min-h-screen'>    
        <div className="w-full max-w-4xl mx-auto py-6 px-0 bg-transparent min-h-screen">
          <div>
            <TypographyH1>
              Billing
            </TypographyH1>
            <TypographyP>
                Manage your Xployt.ai subscription and payment history.
            </TypographyP>
        </div>    
    </div>
    </div>
    </>
  );
};

export default Bill;
