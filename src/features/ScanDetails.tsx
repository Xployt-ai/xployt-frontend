import { TypographyH2, TypographySmall } from "@/components/ui/typography.tsx";
import type { ScanFinding } from "@/data/models/scan.ts";

interface scanDetailsProps {
  scanFindings: ScanFinding[];
}

export const ScanDetails = ({scanFindings}: scanDetailsProps) => {
  return(
    <div className="space-y-6">
      <TypographyH2>Scan Details</TypographyH2>

      {/*TODO: use shad.cn table*/}

      {/* Table Header */}
      <div className="grid grid-cols-3 gap-4 py-3 bg-gray-800 px-4 rounded-t">
        <TypographySmall className="text-white">Severity</TypographySmall>
        <TypographySmall className="text-white">Finding</TypographySmall>
        <TypographySmall className="text-white">Affected URL</TypographySmall>
      </div>

      {/* Table Rows */}
      <div className=" rounded-b">
        {scanFindings.map(({severity, finding, url}) => (
          <div
            key={finding}
            className="grid grid-cols-3 gap-4 py-3 px-4 border-b border-gray-800 last:border-b-0"
          >
            <TypographySmall className={` text-muted-foreground `}>
              {severity}
            </TypographySmall>
            <TypographySmall className="text-muted-foreground">{finding}</TypographySmall>
            <TypographySmall className="truncate">{url}</TypographySmall>

          </div>
        ))}
      </div>
    </div>
  )
}