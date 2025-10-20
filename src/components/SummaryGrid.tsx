import { Card } from "@/components/ui/card.tsx";

export default function SummaryGrid({ counts }: { counts: { critical: number; high: number; medium: number } }) {
  return (
    <div className="mb-6">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">Issue Summary</h3>
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4">
          <small className="text-sm font-medium text-muted-foreground">Critical</small>
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight">{counts.critical}</h2>
        </Card>
        <Card className="p-4">
          <small className="text-sm font-medium text-muted-foreground">High</small>
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight">{counts.high}</h2>
        </Card>
        <Card className="p-4">
          <small className="text-sm font-medium text-muted-foreground">Medium</small>
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight">{counts.medium}</h2>
        </Card>
      </div>
    </div>
  );
}
