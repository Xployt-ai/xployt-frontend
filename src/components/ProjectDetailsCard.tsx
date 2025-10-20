import { Card, CardContent } from "@/components/ui/card.tsx";

export default function ProjectDetailsCard({ repo }: { repo?: string }) {
  const projectDetails = [
    { label: "Repository", value: repo || "Automatisch" },
    { label: "Last scan", value: "July 26, 2024, 10:30 AM" },
    { label: "Duration", value: "3 Min 56 Sec." },
  ];

  return (
    <div className="mb-8">
      <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight mb-4">Project Details</h2>
      <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 divide-x-0 md:divide-x divide-border">
            {projectDetails.map((item, index) => (
              <div key={index} className="flex flex-col space-y-2 px-4 first:pl-0 last:pr-0">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <span className="text-lg font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
