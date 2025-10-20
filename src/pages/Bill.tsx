import { TypographyP } from "@/components/ui/typography";
import BillCard from "@/features/BillCard";

const Bill = () => {
  return (
    <div className="px-4 py-8 max-w-5xl mx-auto space-y-10 min-h-[80vh]">
      {/* Header */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Subscription</h2>
        <TypographyP className="text-slate-400 mb-6">
          Manage your Xployt.ai subscription and payment history.
        </TypographyP>

        <BillCard />
      </section>
    </div>
  );
};

export default Bill;
