import { TypographyH2, TypographySmall } from "@/components/ui/typography.tsx";
import { Button } from "@/components/ui/Button.tsx";

export const ScanLiveSummary = () => {
  return (
    <div className="space-y-4">
      <TypographyH2>Live Summary</TypographyH2>
      <div className="flex justify-between items-center">
        <TypographySmall className="text-muted-foreground">2 secrets found</TypographySmall>
        <Button
          variant="secondary"
        >
          Cancel Scan
        </Button>
      </div>
    </div>
  )
}