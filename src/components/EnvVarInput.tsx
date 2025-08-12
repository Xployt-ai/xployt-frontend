import { cn } from "@/lib/utils.ts";

type EnvVarInputProps = {
  env: { key: string; value: string };
  index: number;
  onChange: (index: number, field: "key" | "value", value: string) => void;
  onRemove: (index: number) => void;
};

export function EnvVarInput({ env, index, onChange, onRemove }: EnvVarInputProps) {
  return (
    <div className="flex gap-2 items-center mb-2">
      <input
        type="text"
        placeholder="EXAMPLE_NAME"
        value={env.key}
        onChange={(e) => onChange(index, "key", e.target.value)}
        className={cn(
          "w-1/2 p-2 rounded-md bg-black border border-gray-700 text-white",
          "focus:outline-none focus:ring-2 focus:ring-blue-500"
        )}
      />
      <input
        type="text"
        placeholder="Value"
        value={env.value}
        onChange={(e) => onChange(index, "value", e.target.value)}
        className={cn(
          "w-1/2 p-2 rounded-md bg-black border border-gray-700 text-white",
          "focus:outline-none focus:ring-2 focus:ring-blue-500"
        )}
      />
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="text-red-400 text-xl font-bold px-2 hover:text-red-600"
        title="Remove"
      >
        -
      </button>
    </div>
  );
}
