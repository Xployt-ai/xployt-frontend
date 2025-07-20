import { Button } from "@/components/ui/Button";

interface RepositoryCardProps {
  name: string;
  date: string;
  onImport?: () => void;
}

const RepositoryCard = ({ name, date, onImport }: RepositoryCardProps) => (
  <div className="bg-[#121212] p-4 border border-gray-800 rounded-md flex justify-between items-center">
    <div className="flex items-center gap-3">
      <span role="img" aria-label="folder" className="text-xl">
        📁
      </span>
      <div>
        <strong>{name}</strong>
        <div className="text-sm text-gray-500">{date}</div>
      </div>
    </div>
    <Button onClick={onImport} className="bg-white text-black font-bold">
      Import
    </Button>
  </div>
);

export default RepositoryCard;
