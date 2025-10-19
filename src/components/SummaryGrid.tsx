import { Card } from "@/components/ui/card.tsx";
import { TypographyH2, TypographyH3, TypographySmall } from "@/components/ui/typography.tsx";

export default function SummaryGrid({ counts }: { counts: { critical: number; high: number; medium: number } }) {
  return (
    <div className="mb-6">
      <TypographyH3 className="mb-4">Issue Summary</TypographyH3>
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4">
          <TypographySmall className="text-gray-400 ">Critical</TypographySmall>
          <TypographyH2>{counts.critical}</TypographyH2>
        </Card>
        <Card className="p-4">
          <TypographySmall className="text-gray-400">High</TypographySmall>
          <TypographyH2>{counts.high}</TypographyH2>
        </Card>
        <Card className="p-4">
          <TypographySmall className="text-gray-400">Medium</TypographySmall>
          <TypographyH2>{counts.medium}</TypographyH2>
        </Card>
      </div>
    </div>
  );
}
