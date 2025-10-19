import { TypographyH2, TypographyMonospace, TypographySmall } from "@/components/ui/typography.tsx";
import { Progress } from "@/components/ui/progress.tsx";
import type { ScanProgressAggStream } from "@/data/models/scan.ts";

interface scanStatusProps {
  progress: ScanProgressAggStream
}

export const ScanStatus = ({progress}: scanStatusProps) => {
  const {status, progress_percent} = progress.collection;
  return (
    <div className="space-y-6">
      <TypographyH2>Scan Status</TypographyH2>

      {/* Overall Progress */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <TypographySmall>Overall Progress</TypographySmall>
          <TypographySmall>{progress_percent}</TypographySmall>
        </div>
        <Progress value={progress_percent} className="bg-gray-800 h-1"/>
        <TypographyMonospace>{status}</TypographyMonospace>
      </div>
      {/*Scan Steps*/}
      <div className="space-y-4">
        {progress.vulnerabilities.map((vuln, index) => (
          <div
            key={index}
            className={`flex justify-between items-center py-3 ${
              index !== 0 ? "border-t border-gray-700" : ""
            }`}
          >
            <TypographySmall>{vuln.vulnerability}</TypographySmall>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 bg-${vuln.severity}-500 rounded-full`}/>
              <TypographySmall className={`text-muted-foreground text-sm`}>
                {vuln.severity}
              </TypographySmall>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}