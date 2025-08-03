import { TypographyH2 } from "@/components/ui/typography.tsx";
import type { ScanFinding } from "@/data/models/scan.ts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"

interface scanDetailsProps {
  scanFindings: ScanFinding[];
}

export const ScanDetails = ({scanFindings}: scanDetailsProps) => {
  return(
    <div className="space-y-6">
      <TypographyH2>Scan Details</TypographyH2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Severity</TableHead>
            <TableHead>Finding</TableHead>
            <TableHead>Affected URL</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scanFindings.map(({ severity, finding, url }) => (
            <TableRow key={finding}>
              <TableCell>{severity}</TableCell>
              <TableCell>{finding}</TableCell>
              <TableCell className="truncate">{url}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}