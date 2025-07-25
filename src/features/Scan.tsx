// src/features/Scan.tsx
import {Button} from "@/components/ui/Button";
import {Input} from "@/components/ui/input";
import {Card} from "@/components/ui/card";
import {useState} from "react";
import {scanEndpoints} from "@/data/network/scan.ts";
import {useNavigate, useParams} from "react-router-dom";

const Scan = () => {
  const [envVars, setEnvVars] = useState([{key: "", value: ""}]);

  const navigate = useNavigate();

  const {repo_name} = useParams()

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

  const startScan = async() => {
    try {
      if (!repo_name) return;
      const scan_id = await scanEndpoints.startScan(repo_name)
      console.log("Scan started successfully:", scan_id);
      navigate(`/scanning/${scan_id}`)
    }catch (error) {
      console.error("Error starting scan:", error);
    }
  }

  return (
    <Card className="w-full max-w-xl p-8 rounded-xl shadow-lg bg-[#1c1c1e] space-y-6 border border-gray-700">
      <h2 className="text-2xl font-bold mb-6">New Scan</h2>

      {/* GitHub import */}
      <div>
        <label className="block mb-1 text-sm font-semibold">Codebase</label>
        <Input
          disabled
          value="github.com/xployt-ai/xploit-scan-stub"
          className="cursor-not-allowed text-gray-400"
        />
      </div>

      {/* Branch select */}
      <div>
        <label className="block mb-1 text-sm font-semibold">Select the branch</label>
        <Input placeholder="main"/>
      </div>

      {/* Root Directory */}
      <div>
        <label className="block mb-1 text-sm font-semibold">Root Directory</label>
        <Input defaultValue="/"/>
      </div>

      <div className="text-sm text-gray-400 font-semibold">Build and Output Settings</div>

      {/* Build Command */}
      <div>
        <label className="block mb-1 text-sm font-semibold">Build Command</label>
        <Input placeholder='"npm run build" or "yarn build"'/>
      </div>

      {/* Output Directory */}
      <div>
        <label className="block mb-1 text-sm font-semibold">Output Directory</label>
        <Input placeholder='"public" (if exists), else "/"'/>
      </div>

      {/* Install Command */}
      <div>
        <label className="block mb-1 text-sm font-semibold">Install Command</label>
        <Input placeholder='"npm install" or "yarn install"'/>
      </div>

      {/* Environment Variables */}
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

      <Button
        className="w-full bg-white text-black hover:bg-gray-200 font-bold"
        onClick ={() => startScan()}
      >
        Start Scan
      </Button>
    </Card>
  );
};

export default Scan;
