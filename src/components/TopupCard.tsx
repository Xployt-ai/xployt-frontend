import { useState } from 'react';
import { creditEndpoints } from '@/data/network/credit';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, XCircle } from 'lucide-react';

interface TopupCardProps {
  onTopupSuccess?: (newBalance: number) => void;
}

export default function TopupCard({ onTopupSuccess }: TopupCardProps) {
  const [amount, setAmount] = useState('1.00');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const currency = 'USD';

  const exchangeRates = {
    USD: 20,
  };

  const tokenAmount = (parseFloat(amount || '0') * exchangeRates.USD).toFixed(2);

  const handleTopup = async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    
    setIsLoading(true);
    try {
      const dollarAmount = parseFloat(amount);
      const tokenAmountToAdd = dollarAmount * exchangeRates.USD; // Convert to tokens
      
      console.log('Initiating top-up for:', {
        dollarAmount: dollarAmount,
        tokenAmount: tokenAmountToAdd,
        exchangeRate: exchangeRates.USD
      });
      
      // Send token amount to backend (not dollar amount)
      const topupData = await creditEndpoints.creditTopup(tokenAmountToAdd);
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
      
      // Notify other parts of the app that credits have been updated
      try {
        const ts = Date.now();
        localStorage.setItem('credits:updated_at', String(ts));
        window.dispatchEvent(new CustomEvent('credits:updated', { detail: { updatedAt: ts } }));
      } catch (e) {
        console.warn('Failed to notify credit update:', e);
      }
      
      // Show success popup
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error: any) {
      console.error('Top-up failed:', error);
      
      // Show error popup
      setErrorMessage(error?.message || error?.errorDescription || 'Top-up failed. Please try again.');
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md space-y-4">
      {/* Success Alert */}
      {showSuccess && (
        <Alert className="bg-green-500/10 border-green-500/50">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <AlertTitle className="text-green-500">Success!</AlertTitle>
          <AlertDescription className="text-green-400">
            Top-up successful! Your balance has been updated.
          </AlertDescription>
        </Alert>
      )}

      {/* Error Alert */}
      {showError && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {errorMessage}
          </AlertDescription>
        </Alert>
      )}

      <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
        {/* Tokens Section (Top) */}
        <div className="mb-6">
          <label className="block text-sm text-muted-foreground mb-2">You'll get</label>
          <div className="bg-background rounded-md border border-input px-4 py-3 flex items-center justify-between">
            <span className="text-xl font-semibold">{tokenAmount} TKN</span>
            <span className="text-sm text-muted-foreground">
              1 {currency} = {exchangeRates.USD} TKN
            </span>
          </div>
        </div>

        {/* Amount Section (Bottom) */}
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
