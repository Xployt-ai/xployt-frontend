import { Input } from "@/components/ui/input";

const SearchInput = ({ value, onChange }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <Input
    type="text"
    placeholder="Search Repositories"
    value={value}
    onChange={onChange}
    className="mb-6"
  />
);

export default SearchInput;
