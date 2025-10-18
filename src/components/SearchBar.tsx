import { useState } from "react";
import { Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading: boolean;
}

export const SearchBar = ({
  placeholder,
  onChange,
  onSearch,
  isLoading,
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="mb-0 flex items-center gap-4">
      <div className="flex flex-1 items-center rounded-xl border border-gray-600 px-3 py-2">
        <Search className="mr-2 h-4 w-4 text-gray-600" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            onChange(e);
          }}
          className="w-full border-none bg-transparent outline-none"
        />
      </div>
      <Button
        disabled={isLoading}
        onClick={(e) => {
          if (onSearch) onSearch(e);
        }}
        className="cursor-pointer flex items-center gap-2 rounded-xl bg-gray-800 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {isLoading ? "Searching..." : "Search"}
      </Button>
    </div>
  );
};
