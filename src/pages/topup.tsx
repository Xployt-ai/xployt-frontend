import { useState } from 'react';
export default function TopUpAccount() {
  const [amount, setAmount] = useState('100.00');
  const currency = 'USD';

  const exchangeRates = {
    USD: 1,
  };

  const tokenAmount = (parseFloat(amount) * exchangeRates.USD).toFixed(2);

  return (
  <div className="min-h-screen bg-background text-foreground flex items-start justify-center pt-20 px-4">

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Top Up Your Account</h1>
          <p className="text-muted-foreground">Add funds to purchase more tokens.</p>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
          <div className="mb-6">
            <label className="block text-sm text-muted-foreground mb-2">Amount</label>
            <div className="relative">
              <div className="flex items-center bg-background rounded-md border border-input px-4 py-3">
                <span className="text-muted-foreground mr-2">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 bg-transparent text-foreground outline-none text-lg"
                  placeholder="0.00"
                />
                <div className="ml-2 text-muted-foreground">{currency}</div>
              </div>
              
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <div className="bg-muted rounded-full p-2">
              <div className="w-6 h-0.5 bg-border"></div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm text-muted-foreground mb-2">You'll get</label>
            <div className="bg-background rounded-md border border-input px-4 py-3 flex items-center justify-between">
              <span className="text-xl font-semibold">{tokenAmount} TKN</span>
                <span className="text-sm text-muted-foreground">
                1 {currency} = {exchangeRates.USD} TKN
              </span>
            </div>
          </div>

          <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-md transition-colors">
            Confirm & Add Cash
          </button>
        </div>
      </div>
    </div>
  )}