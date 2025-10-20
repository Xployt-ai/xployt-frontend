import { Card } from "@/components/ui/card";
import {TypographyH1 ,TypographyH4, TypographySmall} from '@/components/ui/typography'
import { Button } from "@/components/ui/Button";

const BillCard = () => {
  return (
    <Card className="flex flex-row max-w-full justify-between p-4">
      <div>
        <TypographyH1>Pro Plan</TypographyH1>
        <TypographyH4 className="text-green-500">$20/month</TypographyH4>
        <TypographySmall className="text-muted-foreground mt-2 mb-1">
          Includes 500 tokens per month 
        </TypographySmall>
        
        <TypographySmall className="text-muted-foreground">
          Automatic renewal every month
        </TypographySmall>
      </div>
      <div className="flex flex-col items-center justify-center gap-3">
        <Button 
          variant="outline" 
          className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
        >
          Cancel Subscription
        </Button>
      </div>
    </Card>
  );
};

export default BillCard;