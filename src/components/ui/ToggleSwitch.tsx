import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type ToggleSwitchProps = {
  label: string;
  checked: boolean;
  onToggle: () => void;
};

const ToggleSwitch = ({ label, checked, onToggle }: ToggleSwitchProps) => {
  return (
    <div className="flex items-center justify-between bg-muted px-4 py-2 rounded-md border w-56">
      <Label className="text-sm">{label}</Label>
      <Switch checked={checked} onCheckedChange={onToggle} />
    </div>
  );
};

export default ToggleSwitch;
