import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/Button.tsx";

interface EnvVariableProps {
  envVars: { key: string; value: string }[];
  setEnvVars: (vars: { key: string; value: string }[]) => void;
}

export const EnvVariables = ({envVars: envVars, setEnvVars}: EnvVariableProps) => {
  const handleAdd = () => {
    setEnvVars([...envVars, {key: "", value: ""}]);
  };

  const handleRemove = (index: number) => {
    setEnvVars(envVars.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: "key" | "value", value: string) => {
    const updated = [...envVars];
    updated[index][field] = value;
    setEnvVars(updated);
  };

  return (
    <div>
      <div className="text-sm text-gray-400 font-semibold mb-2">Environment Variables</div>
      {envVars.map((env, index) => (
        <div key={index} className="flex gap-2 items-center mb-2">
          <Input
            type="text"
            placeholder="EXAMPLE_NAME"
            value={env.key}
            onChange={(e) => handleChange(index, "key", e.target.value)}
            className="w-1/2"
          />
          <Input
            type="text"
            placeholder="Value"
            value={env.value}
            onChange={(e) => handleChange(index, "value", e.target.value)}
            className="w-1/2"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleRemove(index)}
            className="text-red-500 font-bold px-2"
            title="Remove"
          >
            -
          </Button>
        </div>
      ))}
      <Button
        variant="link"
        onClick={handleAdd}
        className="text-blue-400 hover:text-blue-500 font-semibold text-sm mb-4 px-0"
      >
        + Add More
      </Button>
      <p className="text-xs text-gray-500 mb-4">
        Tip: Push an env above to populate this form.
      </p>
    </div>
  )
}