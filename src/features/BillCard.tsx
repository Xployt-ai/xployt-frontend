import { Card } from "@/components/ui/card";
import {TypographyH1 , TypographyP ,TypographyH4, TypographySmall} from '@/components/ui/typography'
import card from "@/assets/card.svg"; 
import { Button } from "@/components/ui/Button";

const BillCard = () => {
  return (
    <Card className="flex flex-row max-w-full justify-between p-4">
      <div >
      <TypographyH1>Standard Plan</TypographyH1>
      <TypographyH4 className="text-green-500">$5/month</TypographyH4>
      <TypographySmall>Add Bill Payment Method /// change</TypographySmall>
      <div className="mt-4 flex ">
        <img src={card} alt="Card Image" className="pr-4" />

          <TypographySmall >Visa ending in 4242</TypographySmall>
        </div>
      </div>
      <div className=" flex flex-col items-center justify-center ">
        <Button className="mb-4 ">Update Payment Method</Button>
        <Button variant="outline" className="text-red-700" >Update Payment Method</Button>
      </div>

    </Card>


  );
};

export default BillCard;