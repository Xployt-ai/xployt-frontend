import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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

export default function Usage() {
  const [windowDays, setWindowDays] = useState<number>(7);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // pagination logic
  const pageCount = Math.ceil(mockTransactions.length / pageSize);
  const paginated = mockTransactions.slice((page - 1) * pageSize, page * pageSize);

  // current token count mock
  const [tokens, setTokens] = useState(250);
  const [topupAmount, setTopupAmount] = useState<number | ''>('');

  const handleTopup = () => {
    if (typeof topupAmount === 'number' && topupAmount > 0) {
      setTokens((t) => t + topupAmount);
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
        {/* Placeholder for chart */}
        <div className="h-40 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
          Chart for last {windowDays} days (to be implemented)
        </div>
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
            {paginated.map((tx) => (
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
        <p className="mb-2">Current tokens: <span className="font-medium">{tokens}</span></p>
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
