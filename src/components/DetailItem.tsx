import { TypographySmall } from "@/components/ui/typography.tsx";

interface DetailItemProps {
  label: string;
  value: string;
}

export const DetailItem = ({label, value}: DetailItemProps) => {
  return(
    <div key={label} className="flex justify-between items-center">
      <TypographySmall className="text-muted-foreground">{label}</TypographySmall>
      <TypographySmall className="text-muted-foreground">{value}</TypographySmall>
    </div>
  )
}