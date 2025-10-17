import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import BillCard from "@/features/BillCard";

interface BillPageProps {
  open: boolean;
  onClose: () => void;
}

const BillPage: React.FC<BillPageProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg w-full bg-zinc-900 rounded-2xl p-6">
        
        {/* Header */}
        <DialogHeader>
          <DialogTitle>
            <TypographyH1 className="text-2xl text-white mb-2">Checkout Overview</TypographyH1>
          </DialogTitle>
          <DialogDescription>
            <TypographyP className="text-slate-400">
              Review your subscription, payment method, and upcoming billing details.
            </TypographyP>
          </DialogDescription>
        </DialogHeader>

        {/* Checkout Card */}
        <Card className="mt-6 bg-zinc-800/80 border border-zinc-700 shadow-lg rounded-xl p-6">
          <BillCard />

          <div className="mt-6 border-t border-zinc-700 pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <TypographyP className="text-slate-400 text-sm">
              Next billing: <span className="text-white font-medium">November 15, 2025</span>
            </TypographyP>

            <div className="flex gap-3">
              <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                View History
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Upgrade Plan
              </Button>
            </div>
          </div>
        </Card>

        {/* Close Button */}
        <DialogClose asChild>
          <Button className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default BillPage;
