import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

interface DataPoint {
  date: string;
  topup?: number;
  usage?: number;
  value?: number; // Keep for backward compatibility
}

interface Props {
  data: DataPoint[];
}

export function UsageLineChart({ data }: Props) {
  // Check if data has topup/usage or just value
  const hasMultipleLines = data.length > 0 && (data[0].topup !== undefined || data[0].usage !== undefined);

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="date"
          stroke="#ffffff"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tick={{ fill: '#ffffff' }}
        />
        <YAxis
          stroke="#ffffff"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tick={{ fill: '#ffffff' }}
        />
        <Tooltip
          contentStyle={{ 
            background: 'hsl(var(--background))', 
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px'
          }}
          formatter={(value: number) => `${value} tokens`}
        />
        {hasMultipleLines ? (
          <>
            <Legend 
              wrapperStyle={{ paddingTop: '10px' }}
              iconType="line"
            />
            <Line
              type="monotone"
              dataKey="topup"
              stroke="#22c55e"
              name="Top-up"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="usage"
              stroke="#ef4444"
              name="Usage"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </>
        ) : (
          <Line
            type="monotone"
            dataKey="value"
            stroke="currentColor"
            className="text-primary"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}
