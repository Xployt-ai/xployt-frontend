import { useState } from 'react';
import { creditEndpoints } from '@/data/network/credit';

interface TopupCardProps {
  onTopupSuccess?: (newBalance: number) => void;
}

export default function TopupCard({ onTopupSuccess }: TopupCardProps) {
  const [amount, setAmount] = useState('1.00');
  const [isLoading, setIsLoading] = useState(false);
  const currency = 'USD';

  const exchangeRates = {
    USD: 20,
  };

  const tokenAmount = (parseFloat(amount || '0') * exchangeRates.USD).toFixed(2);

  const handleTopup = async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    
    setIsLoading(true);
    try {
      console.log('Initiating top-up for amount:', parseFloat(amount));
      const topupData = await creditEndpoints.creditTopup(parseFloat(amount));
      console.log('Top-up response:', topupData);
      
      // Update with the new balance from response
      if (topupData.new_balance !== undefined) {
        console.log('Updating balance to:', topupData.new_balance);
        onTopupSuccess?.(topupData.new_balance);
      } else {
        console.warn('new_balance not found in response, fetching fresh balance');
        // If new_balance not in response, fetch fresh balance
        try {
          const balanceData = await creditEndpoints.getCreditBalance();
          console.log('Fresh balance:', balanceData.balance);
          onTopupSuccess?.(balanceData.balance);
        } catch (balanceError) {
          console.error('Failed to fetch fresh balance:', balanceError);
        }
      }
      
      setAmount('1.00');
      alert('Top-up successful! Your balance has been updated.');
    } catch (error) {
      console.error('Top-up failed:', error);
      alert('Top-up failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md">
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

        <button 
          onClick={handleTopup}
          disabled={isLoading || !amount || parseFloat(amount) <= 0}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Processing...' : 'Confirm & Add Cash'}
        </button>
      </div>
    </div>
  );
}
