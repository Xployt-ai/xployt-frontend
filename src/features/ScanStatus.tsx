import { TypographyH2, TypographyMonospace, TypographySmall } from "@/components/ui/typography.tsx";
import { Progress } from "@/components/ui/progress.tsx";
import type { ScanProgress, ScanStep } from "@/data/models/scan.ts";

interface scanStatusProps {
  scanProgress: ScanProgress,
  scanSteps: ScanStep[]
}

export const ScanStatus = ({scanProgress, scanSteps}: scanStatusProps) => {
  return (
    <div className="space-y-6">
      <TypographyH2>Scan Status</TypographyH2>

      {/* Overall Progress */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <TypographySmall>Overall Progress</TypographySmall>
          <TypographySmall>{scanProgress.progress_percent}</TypographySmall>
        </div>
        <Progress value={scanProgress.progress_percent} className="bg-gray-800 h-1"/>
        <TypographyMonospace>{scanProgress.progress_text}</TypographyMonospace>
      </div>
      {/*Scan Steps*/}
      <div className="space-y-4">
        {scanSteps.map((step, index) => (
          <div
            key={step.label}
            className={`flex justify-between items-center py-3 ${
              index !== 0 ? "border-t border-gray-700" : ""
            }`}
          >
            <TypographySmall>{step.label}</TypographySmall>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 bg-${step.color}-500 rounded-full`}/>
              <TypographySmall className={`text-muted-foreground text-sm`}>
                {step.status}
              </TypographySmall>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}