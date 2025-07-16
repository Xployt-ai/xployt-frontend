import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const NewScan = () => {
  const [envVars, setEnvVars] = useState([{ key: "", value: "" }]);

  const handleAddEnvVar = () => {
    setEnvVars([...envVars, { key: "", value: "" }]);
  };

  const handleRemoveEnvVar = (index) => {
    const updated = [...envVars];
    updated.splice(index, 1);
    setEnvVars(updated);
  };

  const handleEnvChange = (index, field, value) => {
    const updated = [...envVars];
    updated[index][field] = value;
    setEnvVars(updated);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-12 flex flex-col items-center relative font-sans">
      <Card className="w-full max-w-xl p-8 rounded-xl shadow-lg bg-[#1c1c1e]">
        <h2 className="text-2xl font-bold mb-6">New Scan</h2>

        {/* GitHub import */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-semibold">Importing from GitHub</label>
          <Input
            disabled
            value="github.com/xployt-ai/xploit-scan-stub"
            className="bg-gray-900 text-gray-400 border-gray-700 cursor-not-allowed"
          />
        </div>

        {/* Branch select */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-semibold">Select the branch</label>
          <select className="w-full p-2 rounded-md bg-black border border-gray-700 text-white">
            <option>main</option>
            <option>dev</option>
          </select>
        </div>

        {/* Project Name */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-semibold">Project Name</label>
          <Input placeholder="Enter your project name" />
        </div>

        {/* Root Directory */}
        <div className="mb-6">
          <label className="block mb-1 text-sm font-semibold">Root Directory</label>
          <Input defaultValue="/" />
        </div>

        <div className="text-sm text-gray-400 font-semibold mb-2">Build and Output Settings</div>

        {/* Build Command */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-semibold">Build Command</label>
          <Input placeholder='"npm run build" or "yarn build"' />
        </div>

        {/* Output Directory */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-semibold">Output Directory</label>
          <Input placeholder='"public" (if exists), else "/"' />
        </div>

        {/* Install Command */}
        <div className="mb-6">
          <label className="block mb-1 text-sm font-semibold">Install Command</label>
          <Input placeholder='"npm install" or "yarn install"' />
        </div>

        {/* Env Vars */}
        <div className="text-sm text-gray-400 font-semibold mb-2">Environment Variables</div>

        {envVars.map((env, index) => (
          <div key={index} className="flex gap-2 items-center mb-2">
            <Input
              type="text"
              placeholder="EXAMPLE_NAME"
              value={env.key}
              onChange={(e) => handleEnvChange(index, "key", e.target.value)}
              className="w-1/2"
            />
            <Input
              type="text"
              placeholder="Value"
              value={env.value}
              onChange={(e) => handleEnvChange(index, "value", e.target.value)}
              className="w-1/2"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveEnvVar(index)}
              className="text-red-500 font-bold px-2"
              title="Remove"
            >
              -
            </Button>
          </div>
        ))}

        {/* Add more env vars */}
        <Button
          variant="link"
          onClick={handleAddEnvVar}
          className="text-blue-400 hover:text-blue-500 font-semibold text-sm mb-4 px-0"
        >
          + Add More
        </Button>

        {/* Tip */}
        <p className="text-xs text-gray-500 mb-4">
          Tip: Push an env above to populate this form.
        </p>

        {/* Start Scan */}
        <Button className="w-full bg-white text-black hover:bg-gray-200 font-bold">
          Start Scan
        </Button>
      </Card>

    
      
    </div>
  );
};

export default NewScan;
