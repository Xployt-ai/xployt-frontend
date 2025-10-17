import { TypographyH2, TypographySmall } from "@/components/ui/typography.tsx";
import type { ScanFinding } from "@/data/models/scan.ts";
import { useState } from "react";
import { Button } from "@/components/ui/Button.tsx";

interface scanDetailsProps {
  scanFindings: ScanFinding[];
}

export const ScanDetails = ({ scanFindings }: scanDetailsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedFinding, setExpandedFinding] = useState<string | null>(null);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(scanFindings.length / itemsPerPage);
  const currentFindings = scanFindings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleRowClick = (finding: string) => {
    if (expandedFinding === finding) {
      setExpandedFinding(null);
    } else {
      setExpandedFinding(finding);
    }
  };

  return (
    <div className="space-y-6">
      <TypographyH2>Scan Details</TypographyH2>

      {/* Table Header */}
      <div className="grid grid-cols-3 gap-4 py-3 bg-gray-800 px-4 rounded-t">
        <TypographySmall className="text-white">Severity</TypographySmall>
        <TypographySmall className="text-white">Finding</TypographySmall>
        <TypographySmall className="text-white">Affected URL</TypographySmall>
      </div>

      {/* Table Rows */}
      <div className=" rounded-b">
        {currentFindings.map(({ severity, finding, url }) => (
          <div key={finding}>
            <div
              onClick={() => handleRowClick(finding)}
              className="grid grid-cols-3 gap-4 py-3 px-4 border-b border-gray-800 last:border-b-0 hover:bg-gray-800 cursor-pointer"
            >
              <TypographySmall className={` text-muted-foreground `}>
                {severity}
              </TypographySmall>
              <TypographySmall className="text-muted-foreground">
                {finding}
              </TypographySmall>
              <TypographySmall className="truncate">{url}</TypographySmall>
            </div>
            {expandedFinding === finding && (
              <div className="p-4 bg-gray-900">
                <TypographySmall className="text-white">Full URL: {url}</TypographySmall>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          variant="outline"
        >
          Previous
        </Button>
        <TypographySmall>
          Page {currentPage} of {totalPages}
        </TypographySmall>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          variant="outline"
        >
          Next
        </Button>
      </div>
    </div>
  );
};