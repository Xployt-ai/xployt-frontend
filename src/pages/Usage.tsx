import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Separator } from '@/components/ui/separator';
import NETWORK from '@/data/network';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { UsageLineChart } from '@/components/usage-line-chart.tsx';
import { format, subDays, isSameDay } from 'date-fns';

const TIME_WINDOWS = [
  { label: '7 days', value: 7 },
  { label: '30 days', value: 30 },
  { label: '3 months', value: 90 },
];

// Mock data until API is connected
const mockTransactions = Array.from({ length: 42 }).map((_, i) => ({
  id: i + 1,
  type: i % 2 === 0 ? 'Top-up' : 'Usage',
  amount: (Math.random() * 100).toFixed(2),
  date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
}));

// Transaction type helper
type Transaction = { id: number; type: string; amount: number; date: string };

export default function Usage() {
  const [windowDays, setWindowDays] = useState<number>(7);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // live balance & transactions
  const [tokens, setTokens] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<any>([]);
  const [topupAmount, setTopupAmount] = useState<number | ''>('');

  // compute data for line chart
  const chartData = Array.from({ length: windowDays }).map((_, idx) => {
    const dateObj = subDays(new Date(), windowDays - 1 - idx);
    return {
      date: format(dateObj, 'MM/dd'),
      value: transactions
        .filter(
          (tx: Transaction) =>
            tx.type === 'Usage' && isSameDay(new Date(tx.date), dateObj)
        )
        .reduce((sum: number, tx: Transaction) => sum + Number(tx.amount), 0),
    };
  });

  // fetch current balance once
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await NETWORK.get('/credits/balance');
        const json = await res.json();
        if (json?.success) {
          setTokens(Number(json.data?.new_balance ?? json.data?.balance ?? 0));
          return;
        }
      } catch (_) {}
      // fallback
      setTokens(250);
    };
    fetchBalance();
  }, []);

  // fetch transactions (runs once – change to depend on pageSize when real backend ready)
  useEffect(() => {
    const fetchTx = async () => {
      try {
        const res = await NETWORK.get(`/credits/transactions?limit=${pageSize}`);
        const json = await res.json();
        if (json?.success) {
          setTransactions(json.data ?? []);
          return;
        }
      } catch (_) {}
      // fallback
      setTransactions(mockTransactions);
    };
    fetchTx();
  }, [pageSize]);

  // pagination logic
  const pageCount = Math.ceil(transactions.length / pageSize);
  const paginated = transactions.slice((page - 1) * pageSize, page * pageSize);

  const handleTopup = async () => {
    if (typeof topupAmount !== 'number' || topupAmount <= 0) return;
    try {
      const res = await NETWORK.post('/credits/topup', {
        amount: topupAmount,
      });
      const json = await res.json();
      if (json?.success) {
        setTokens(Number(json.data?.new_balance ?? tokens ?? 0));
        // prepend new transaction locally for immediate feedback
        setTransactions((tx: any) => [
          {
            id: json.data.transaction_id ?? Date.now(),
            type: 'Top-up',
            amount: json.data.amount,
            date: new Date().toLocaleDateString(),
          },
          ...tx,
        ]);
      }
    } catch (_) {
      // ignore – keep existing balance
    } finally {
      setTopupAmount('');
    }
  };

  return (
    <div className="px-4 py-8 max-w-5xl mx-auto space-y-10">
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

      <Separator />

      {/* Transaction History */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Transaction history</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((tx: any) => (
              <TableRow key={tx.id}>
                <TableCell>{tx.id}</TableCell>
                <TableCell>{tx.date}</TableCell>
                <TableCell>{tx.type}</TableCell>
                <TableCell className="text-right">{tx.amount}</TableCell>
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

      <Separator />

      {/* Token Top-up */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Token top-up</h2>
        <p className="mb-2">Current tokens: <span className="font-medium">{tokens ?? '...'}</span></p>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            min={1}
            value={topupAmount}
            onChange={(e) => setTopupAmount(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-32 p-2 rounded-md bg-background border border-input text-foreground"
            placeholder="Amount"
          />
          <Button onClick={handleTopup}>Top-up</Button>
        </div>
      </section>
    </div>
  );
}
