import { Card } from "@/components/ui/card.tsx";
import { cn } from "@/lib/utils.ts";

type ScanOptionCardProps = {
  title: string;
  description: string;
  points: string[];
  selected: boolean;
  onClick: () => void;
};

const ScanOptionCard = ({
  title,
  description,
  points,
  selected,
  onClick,
}: ScanOptionCardProps) => {
  return (
  <Card
  onClick={onClick}
  className={cn(
    "cursor-pointer transition border hover:border-primary hover:shadow-md flex flex-col justify-between h-full",
    selected ? "border-primary bg-muted" : "bg-card"
  )}
>
  <div className="p-5 space-y-2">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
    <ul className="list-disc ml-5 text-sm text-muted-foreground">
      {points.map((point, i) => (
        <li key={i}>{point}</li>
      ))}
    </ul>
  </div>
</Card>

  );
};

export default ScanOptionCard;
