import { Button } from "@/components/ui/Button.tsx";

type Props = {
  onStart: () => void;
};

const StartScanFooter = ({ onStart }: Props) => {
  return (
    <div className="flex justify-between items-center border-t pt-4 mt-6 text-sm text-muted-foreground">
      <span>🔒 Scan results will be available in the Security tab once completed.</span>
      <div className="flex items-center gap-3">
        <span className="text-xs">Est. Time: 5–10 mins</span>
        <Button onClick={onStart}>Start Scan</Button>
      </div>
    </div>
  );
};

export default StartScanFooter;
