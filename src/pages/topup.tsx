import { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { creditEndpoints } from '@/data/network/credit';
import TopupCard from '@/components/TopupCard';

export default function TopUpAccount() {
  const [tokens, setTokens] = useState<number | null>(null);

  // Fetch current token balance
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const balanceData = await creditEndpoints.getCreditBalance();
        setTokens(balanceData.balance);
      } catch (error) {
        console.error('Failed to fetch credit balance:', error);
        // fallback
        setTokens(250);
      }
    };
    fetchBalance();
  }, []);

  const handleTopupSuccess = (newBalance: number) => {
    // Update the token balance after successful top-up
    setTokens(newBalance);
    console.log('Top-up successful! New balance:', newBalance);
  };

  return (
    <div className="px-4 py-8 max-w-5xl mx-auto space-y-10 min-h-[80vh]">
      {/* Token Balance Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Token Balance</h2>
        <div className="bg-card rounded-lg p-6 border border-border shadow-sm max-w-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground">Available Tokens</span>
            <span className="text-3xl font-bold">{tokens !== null ? tokens : '...'} TKN</span>
          </div>
          <p className="text-sm text-muted-foreground">Use tokens to perform security scans</p>
        </div>
      </section>

      <Separator />

      {/* Top Up Section */}
      <section>
        <h2 className="text-xl font-semibold ">Top Up Your Account</h2>
        <p className="text-muted-foreground mb-6">Add funds to purchase more tokens.</p>

        <div className="max-w-md">
          <TopupCard onTopupSuccess={handleTopupSuccess} />
        </div>
      </section>
    </div>
  );
}