import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {TypographyH1 ,TypographyH4, TypographySmall} from '@/components/ui/typography'
import { Button } from "@/components/ui/Button";
import PaymentModal from "@/components/PaymentModal";
import { subscriptionEndpoints, type ProStatus } from "@/data/network/subscription";

const BillCard = () => {
  const [proStatus, setProStatus] = useState<ProStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    fetchProStatus();
  }, []);

  const fetchProStatus = async () => {
    try {
      setIsLoading(true);
      const status = await subscriptionEndpoints.getProStatus();
      console.log("Pro status:", status);
      setProStatus(status);
    } catch (error) {
      console.error("Error fetching pro status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribe = () => {
    setShowPaymentModal(true);
  };

  const handleSubscriptionSuccess = () => {
    console.log("Subscription successful, refreshing status...");
    fetchProStatus();
  };

  const handleCancelSubscription = async () => {
    try {
      setIsCancelling(true);
      const response = await subscriptionEndpoints.unsubscribeFromPro();
      console.log("Unsubscribe response:", response);
      await fetchProStatus();
    } catch (error) {
      console.error("Error cancelling subscription:", error);
    } finally {
      setIsCancelling(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="flex flex-row max-w-full justify-between p-4">
        <TypographySmall className="text-slate-400">Loading subscription status...</TypographySmall>
      </Card>
    );
  }

  // If not a pro user, show subscription option
  if (!proStatus?.is_pro) {
    return (
      <>
        <Card className="flex flex-row max-w-full justify-between p-4">
          <div>
            <TypographyH1>Pro Plan</TypographyH1>
            <TypographyH4 className="text-green-500">$20/month</TypographyH4>
            <TypographySmall className="text-muted-foreground mt-2 mb-1">
              Includes 500 tokens per month 
            </TypographySmall>
            <TypographySmall className="text-muted-foreground">
              Unlock all pro features
            </TypographySmall>
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={handleSubscribe}
            >
              Subscribe Now
            </Button>
          </div>
        </Card>

        <PaymentModal 
          open={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handleSubscriptionSuccess}
        />
      </>
    );
  }

  // If pro user, show subscription details
  return (
    <Card className="flex flex-row max-w-full justify-between p-4">
      <div>
        <TypographyH1>Pro Plan</TypographyH1>
        <TypographyH4 className="text-green-500">
          {proStatus.is_cancelled ? 'Cancelled' : '$20/month'}
        </TypographyH4>
        <TypographySmall className="text-muted-foreground mt-2 mb-1">
          Includes 500 tokens per month 
        </TypographySmall>
        
        {proStatus.is_cancelled ? (
          <TypographySmall className="text-yellow-500">
            Access expires on {new Date(proStatus.subscription_end_date!).toLocaleDateString()}
          </TypographySmall>
        ) : (
          <TypographySmall className="text-muted-foreground">
            Automatic renewal every month
          </TypographySmall>
        )}
        
        {proStatus.subscription_end_date && (
          <TypographySmall className="text-slate-500 mt-2">
            {proStatus.is_cancelled 
              ? `${proStatus.days_remaining || 0} days remaining` 
              : `Next billing: ${new Date(proStatus.subscription_end_date).toLocaleDateString()}`
            }
          </TypographySmall>
        )}
      </div>
      <div className="flex flex-col items-center justify-center gap-3">
        {!proStatus.is_cancelled ? (
          <Button 
            variant="outline" 
            className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
            onClick={handleCancelSubscription}
            disabled={isCancelling}
          >
            {isCancelling ? "Cancelling..." : "Cancel Subscription"}
          </Button>
        ) : (
          <>
            <Button 
              variant="outline"
              className="text-yellow-500 border-yellow-500 hover:bg-yellow-500/10 cursor-default"
              disabled
            >
              Pro valid until {proStatus.subscription_end_date && new Date(proStatus.subscription_end_date).toLocaleDateString()}
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={handleSubscribe}
            >
              Resubscribe
            </Button>
          </>
        )}
      </div>
    </Card>
  );
};

export default BillCard;