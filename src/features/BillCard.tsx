import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { subscriptionEndpoints } from '@/data/network/subscription';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

interface BillCardProps {
  plan: string;
  onUpgrade?: () => void;
  onStatusChange?: () => void;
}

const BillCard = ({ plan, onUpgrade, onStatusChange }: BillCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isPro = plan === 'Pro';
  const isExpired = plan === 'Expired';
  const isFree = plan === 'Free';

  // Reset dialogs when plan changes (after successful subscription change)
  useEffect(() => {
    setShowErrorDialog(false);
    setShowCancelDialog(false);
    setIsLoading(false);
  }, [plan]);

  const confirmCancelSubscription = async () => {
    setIsLoading(true);
    setShowCancelDialog(false);

    try {
      const response = await subscriptionEndpoints.unsubscribeFromPro();
      console.log('Unsubscribe response:', response);
      
      // Refresh subscription data and reset loading
      await onStatusChange?.();
      setIsLoading(false);
    } catch (error: any) {
      console.error('Failed to cancel subscription:', error);
      setErrorMessage(error?.message || 'Failed to cancel subscription. Please try again.');
      setShowErrorDialog(true);
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Confirmation Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Cancel Subscription
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel your Pro subscription? You will lose access to Pro features at the end of your current billing period.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCancelDialog(false)}
              disabled={isLoading}
            >
              Keep Subscription
            </Button>
            <Button
              variant="destructive"
              onClick={confirmCancelSubscription}
              disabled={isLoading}
            >
              {isLoading ? 'Cancelling...' : 'Yes, Cancel'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Error Dialog */}
      <Dialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" />
              Error
            </DialogTitle>
            <DialogDescription>
              {errorMessage}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowErrorDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card className="p-6">
        <div className="space-y-6">
          {/* Pro Plan Details */}
          <div className="flex flex-row justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">Pro Plan</h2>
              <p className="text-xl font-semibold text-green-500 mb-3">$20/month</p>
              <p className="text-sm text-muted-foreground mb-1">
                Includes 500 tokens per month
              </p>
              <p className="text-sm text-muted-foreground">
                Automatic renewal every month
              </p>
            </div>

            {/* Action Button */}
            <div className="flex flex-col items-end gap-2">
              {isPro && (
                <Button
                  variant="outline"
                  className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                  onClick={() => setShowCancelDialog(true)}
                  disabled={isLoading}
                >
                  Cancel Subscription
                </Button>
              )}
              
              {(isFree || isExpired) && (
                <Button
                  onClick={onUpgrade}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={isLoading}
                >
                  {isExpired ? 'Reactivate - $20' : 'Upgrade to Pro - $20'}
                </Button>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-700"></div>

          {/* Subscription Status */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Subscription Status</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Current plan</p>
                <p className="text-base font-medium">{plan}</p>
              </div>

              {/* Status Indicator */}
              {isPro && (
                <div className="flex items-center gap-2 text-green-400 bg-green-500/10 px-3 py-1.5 rounded-full">
                  <CheckCircle2 size={16} />
                  <span className="text-sm font-medium">Active</span>
                </div>
              )}
              
              {isExpired && (
                <div className="flex items-center gap-2 text-yellow-400 bg-yellow-500/10 px-3 py-1.5 rounded-full">
                  <XCircle size={16} />
                  <span className="text-sm font-medium">Expired</span>
                </div>
              )}
              
              {isFree && (
                <div className="flex items-center gap-2 text-slate-400 bg-slate-500/10 px-3 py-1.5 rounded-full">
                  <span className="text-sm font-medium">Free Plan</span>
                </div>
              )}
            </div>
            
            {/* Status Message */}
            <div className="mt-3">
              {isPro && (
                <p className="text-sm text-slate-400">
                  Your Pro subscription is active and will renew automatically.
                </p>
              )}
              {isExpired && (
                <p className="text-sm text-yellow-400">
                  Your subscription has expired. Reactivate to continue enjoying Pro features.
                </p>
              )}
              {isFree && (
                <p className="text-sm text-slate-400">
                  Upgrade to Pro to unlock 500 tokens per month and premium features.
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default BillCard;