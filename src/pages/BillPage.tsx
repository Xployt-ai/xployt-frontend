import { useState } from "react";
import { Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const BillPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Payment submitted successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* Main Container */}
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-0 overflow-hidden rounded-lg border">
        {/* Left: Billing Form */}
        <Card className="border-0 rounded-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Checkout Details
              <Info className="w-4 h-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="expirationDate">Expiration Date</Label>
                  <Input
                    id="expirationDate"
                    type="text"
                    name="expirationDate"
                    value={formData.expirationDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" variant="secondary">
                Complete Payment
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Right: Order Summary */}
        <Card className="border-0 rounded-none bg-muted/50 border-l">
          <CardHeader>
            <CardTitle className="text-lg">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plan</span>
                <span className="font-medium">Pro Monthly</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-medium">1 Month</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Discount</span>
                <span className="font-medium">- LKR 0.00</span>
              </div>
            </div>

            <div className="border-t pt-4 flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>LKR 3,500.00</span>
            </div>

            {/* Security Info */}
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
              <p>
                All payments are securely processed and encrypted. We do not store
                your card information.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 border rounded-lg bg-background">
                <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-semibold leading-tight">
                    Secure
                  </div>
                  <div className="text-xs text-muted-foreground leading-tight">
                    Payment
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 border rounded-lg bg-background">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </div>
                <div className="text-xs font-bold">SSL Protected</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BillPage;