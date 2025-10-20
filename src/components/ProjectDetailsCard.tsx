import { TypographyH2, TypographyP, TypographyMuted } from "@/components/ui/typography.tsx";

export default function ProjectDetailsCard({ repo }: { repo?: string }) {
  const projectDetails = [
    { label: "Repository", value: repo || "Automatisch" },
    { label: "Last scan", value: "July 26, 2024, 10:30 AM" },
    { label: "Duration", value: "3 Min 56 Sec." },
  ];

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <TypographyH2 className="mb-4">Project Details</TypographyH2>
          <div className="rounded-lg p-4 space-y-3">
            {projectDetails.map((item, index) => (
              <div key={index} className="flex justify-between border-t border-gray-700 py-4">
                <TypographyP>{item.label}</TypographyP>
                <TypographyMuted>{item.value}</TypographyMuted>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
