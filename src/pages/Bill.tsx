import { TypographyH1, TypographyP } from "@/components/ui/typography";
import BillCard from "@/features/BillCard";

const Bill = () => {
  return (
    
      <div className="w-full max-w-4xl bg-transparent min-h-[80vh]">
              <h2 className="text-white text-3xl font-bold mb-8">Subscription</h2>
    <div>
          <TypographyP className="text-slate-400">
            Manage your Xployt.ai subscription and payment history.
          </TypographyP>
        </div>

        <BillCard />

      </div>
  );
};

export default Bill;
