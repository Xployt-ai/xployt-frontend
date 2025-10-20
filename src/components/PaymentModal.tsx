import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { TypographyH4, TypographySmall } from "@/components/ui/typography";
import { subscriptionEndpoints } from "@/data/network/subscription";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const PaymentModal = ({ open, onClose, onSuccess }: PaymentModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      setError(null);

      console.log("Processing payment for Pro subscription...");
      const response = await subscriptionEndpoints.subscribeToPro();
      
      console.log("Subscription successful:", response);
      
      // Close modal and notify parent
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error("Payment error:", err);
      setError(err.message || "Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Subscribe to Pro Plan</DialogTitle>
          <DialogDescription>
            Complete your subscription to unlock pro features
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Plan Details */}
          <div className="bg-zinc-800 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <TypographyH4>Pro Plan</TypographyH4>
              <TypographyH4 className="text-green-500">$20/month</TypographyH4>
            </div>
            
            <div className="space-y-2">
              <TypographySmall className="text-slate-300 flex items-center gap-2">
                <span className="text-green-500">✓</span>
                500 tokens per month
              </TypographySmall>
              <TypographySmall className="text-slate-300 flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Automatic monthly renewal
              </TypographySmall>
              <TypographySmall className="text-slate-300 flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Cancel anytime
              </TypographySmall>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="border-t border-zinc-700 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Subtotal</span>
              <span className="text-white">$20.00</span>
            </div>
            <div className="flex justify-between text-sm font-semibold">
              <span className="text-white">Total Due Today</span>
              <span className="text-green-500">$20.00</span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500 rounded-lg p-3">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Pay $20.00"}
            </Button>
          </div>

          <TypographySmall className="text-center text-slate-500">
            You will be charged $20.00 monthly until you cancel
          </TypographySmall>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
