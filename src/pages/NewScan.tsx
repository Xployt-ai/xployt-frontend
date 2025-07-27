// src/pages/NewScan.tsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { scanEndpoints } from "@/data/network/scan.ts";
import { Card } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/Button.tsx";
import type { newScanProps } from "@/data/models/scan.ts";
import { EnvVariables } from "@/features/EnvVariables.tsx";
// Assuming you have a top nav component

const NewScan = () => {
  const [envVars, setEnvVars] = useState([{key: "", value: ""}]);
  const [newScanProps, setNewScanProps] = useState<newScanProps>({
    repository_name: "",
    branch: "",
    root_directory: "/",
    build_command: "",
    output_directory: "",
    install_command: "",
    env_variables: [],
  })

  const navigate = useNavigate();

  const {repo_name} = useParams()

  const startScan = async () => {
    try {
      if (!repo_name) return;
      setNewScanProps((prev) => ({
        ...prev!,
        repository_name: repo_name,
        env_variables: envVars.filter((env) => env.key && env.value),
      }));
      await scanEndpoints.updateScanProps(newScanProps)
      const scan_id = await scanEndpoints.startScan(repo_name)
      console.log("Scan started successfully:", scan_id);
      navigate(`/scanning/${scan_id}`)
    } catch (error) {
      console.error("Error starting scan:", error);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewScanProps((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-12 flex flex-col items-center relative font-sans">


      <Card className="w-full max-w-xl p-8 rounded-xl shadow-lg bg-[#1c1c1e] space-y-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-6">New Scan</h2>

        {/* GitHub import */}
        <div>
          <label className="block mb-1 text-sm font-semibold">Codebase</label>
          <Input
            disabled
            value={newScanProps.repository_name}
            className="cursor-not-allowed text-gray-400"
            name="repository_name"
          />
        </div>

        {/* Branch select */}
        <div>
          <label className="block mb-1 text-sm font-semibold">Select the branch</label>
          <Input
            placeholder="main"
            name="branch"
            value={newScanProps.branch}
            onChange={handleInputChange}
          />
        </div>

        {/* Root Directory */}
        <div>
          <label className="block mb-1 text-sm font-semibold">Root Directory</label>
          <Input
            name="root_directory"
            value={newScanProps.root_directory}
            onChange={handleInputChange}
            defaultValue="/"
          />
        </div>

        <div className="text-sm text-gray-400 font-semibold">Build and Output Settings</div>

        {/* Build Command */}
        <div>
          <label className="block mb-1 text-sm font-semibold">Build Command</label>
          <Input
            placeholder='"npm run build" or "yarn build"'
            name="build_command"
            value={newScanProps.build_command}
            onChange={handleInputChange}
          />
        </div>

        {/* Output Directory */}
        <div>
          <label className="block mb-1 text-sm font-semibold">Output Directory</label>
          <Input
            placeholder='"public" (if exists), else "/"'
            name="output_directory"
            value={newScanProps.output_directory}
            onChange={handleInputChange}
          />
        </div>

        {/* Install Command */}
        <div>
          <label className="block mb-1 text-sm font-semibold">Install Command</label>
          <Input
            placeholder='"npm install" or "yarn install"'
            name="install_command"
            value={newScanProps.install_command}
            onChange={handleInputChange}
          />
        </div>

        <EnvVariables envVars={envVars} setEnvVars={setEnvVars}/>
        

        <Button
          className="w-full bg-white text-black hover:bg-gray-200 font-bold"
          onClick={() => startScan()}
        >
          Start Scan
        </Button>
      </Card>
      );


    </div>
  );
};

export default NewScan;
