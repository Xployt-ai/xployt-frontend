import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { creditEndpoints } from '@/data/network/credit';
import type { CreditTransaction } from '@/data/models/credit';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { UsageLineChart } from '@/components/usage-line-chart.tsx';
import { format, subDays, isSameDay, parseISO } from 'date-fns';

const TIME_WINDOWS = [
  { label: '7 days', value: 7 },
  { label: '30 days', value: 30 },
  { label: '3 months', value: 90 },
];

export default function Usage() {
  const [windowDays, setWindowDays] = useState<number>(7);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // live balance & transactions
  const [tokens, setTokens] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<CreditTransaction[]>([]);

  // compute data for line chart - both topup and usage
  const chartData = Array.from({ length: windowDays }).map((_, idx) => {
    const dateObj = subDays(new Date(), windowDays - 1 - idx);
    const dateStr = format(dateObj, 'MM/dd');
    
    const topupValue = transactions
      .filter(
        (tx: CreditTransaction) =>
          (tx.transaction_type.toLowerCase() === 'topup' || tx.transaction_type.toLowerCase() === 'pro_monthly') && 
          isSameDay(parseISO(tx.created_at), dateObj)
      )
      .reduce((sum: number, tx: CreditTransaction) => sum + Math.abs(tx.amount), 0);
    
    const usageValue = transactions
      .filter(
        (tx: CreditTransaction) =>
          tx.transaction_type.toLowerCase() === 'debit' && 
          isSameDay(parseISO(tx.created_at), dateObj)
      )
      .reduce((sum: number, tx: CreditTransaction) => sum + Math.abs(tx.amount), 0);
    
    return {
      date: dateStr,
      topup: topupValue,
      usage: usageValue,
    };
  });

  // fetch current balance once
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

  // fetch transactions from API
  useEffect(() => {
    const fetchTx = async () => {
      try {
        const txData = await creditEndpoints.getCreditTransactions();
        setTransactions(txData);
      } catch (error) {
        console.error('Failed to fetch credit transactions:', error);
        // Set empty array on error
        setTransactions([]);
      }
    };
    fetchTx();
  }, []);

  // pagination logic
  const pageCount = Math.ceil(transactions.length / pageSize);
  const paginated = transactions.slice((page - 1) * pageSize, page * pageSize);

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

      {/* Usage History */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Usage history</h2>
        <div className="flex gap-2 mb-4">
          {TIME_WINDOWS.map((w) => (
            <Button
              key={w.value}
              variant={w.value === windowDays ? 'default' : 'outline'}
              onClick={() => setWindowDays(w.value)}
              size="sm"
            >
              {w.label}
            </Button>
          ))}
        </div>
        <UsageLineChart data={chartData} />
      </section>

      {/* Transaction History */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Transaction history</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((tx: CreditTransaction) => (
              <TableRow key={tx.id}>
                <TableCell className="text-white">{tx.id}</TableCell>
                <TableCell className="text-white">{format(parseISO(tx.created_at), 'MMM dd, yyyy')}</TableCell>
                <TableCell>
                  <span className={`capitalize font-semibold ${
                    tx.transaction_type.toLowerCase() === 'topup' || tx.transaction_type.toLowerCase() === 'pro_monthly' 
                      ? 'text-green-500' 
                      : 'text-red-500'
                  }`}>
                    {tx.transaction_type}
                  </span>
                </TableCell>
                <TableCell className="text-white">{tx.description || '-'}</TableCell>
                <TableCell className={`text-right font-semibold ${
                  tx.transaction_type.toLowerCase() === 'topup' || tx.transaction_type.toLowerCase() === 'pro_monthly' 
                    ? 'text-green-500' 
                    : 'text-red-500'
                }`}>
                  {tx.transaction_type.toLowerCase() === 'credit' ? '-' : '+'}{Math.abs(tx.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Pagination controls */}
        <div className="flex items-center justify-end gap-2 mt-4">
          <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Previous
          </Button>
          <span className="text-sm">
            Page {page} of {pageCount}
          </span>
          <Button variant="outline" size="sm" disabled={page === pageCount} onClick={() => setPage((p) => p + 1)}>
            Next
          </Button>
        </div>
      </section>


    </div>
  );
}
