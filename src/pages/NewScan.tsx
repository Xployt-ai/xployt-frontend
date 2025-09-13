// src/pages/NewScan.tsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { scanEndpoints } from "@/data/network/scan.ts";
import { Card } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/Button.tsx";
import type { newScanProps } from "@/data/models/scan.ts";
import { EnvVariables } from "@/features/EnvVariables.tsx";
import { motion } from "framer-motion";

const NewScan = () => {
  const [envVars, setEnvVars] = useState([{ key: "", value: "" }]);
  const [newScanProps, setNewScanProps] = useState<newScanProps>({
    repository_name: "",
    branch: "",
    root_directory: "/",
    build_command: "",
    output_directory: "",
    install_command: "",
    env_variables: [],
  });

  const navigate = useNavigate();
  const { repo_name } = useParams();

  const startScan = async () => {
    try {
      if (!repo_name) return;
      setNewScanProps((prev) => ({
        ...prev!,
        repository_name: repo_name,
        env_variables: envVars.filter((env) => env.key && env.value),
      }));
      await scanEndpoints.updateScanProps(newScanProps);
      const scan_id = await scanEndpoints.startScan(repo_name);
      console.log("Scan started successfully:", scan_id);
      navigate(`/scanning/${scan_id}`);
    } catch (error) {
      console.error("Error starting scan:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewScanProps((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };

  return (
    <motion.div
      className="min-h-screen bg-black text-white p-12 flex flex-col items-center relative font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 70, damping: 15 }}
        className="w-full max-w-xl"
      >
        <Card className="p-8 rounded-xl shadow-lg bg-[#1c1c1e] space-y-6 border border-gray-700">
          <motion.h2
            className="text-2xl font-bold mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            New Scan
          </motion.h2>

          {/* Fields fade in sequentially */}
          {[
            {
              label: "Codebase",
              name: "repository_name",
              placeholder: "",
              disabled: true,
              value: newScanProps.repository_name,
              extraClass: "cursor-not-allowed text-gray-400",
            },
            {
              label: "Select the branch",
              name: "branch",
              placeholder: "main",
              value: newScanProps.branch,
            },
            {
              label: "Root Directory",
              name: "root_directory",
              placeholder: "/",
              value: newScanProps.root_directory,
            },
            {
              label: "Build Command",
              name: "build_command",
              placeholder: '"npm run build" or "yarn build"',
              value: newScanProps.build_command,
            },
            {
              label: "Output Directory",
              name: "output_directory",
              placeholder: '"public" (if exists), else "/"',
              value: newScanProps.output_directory,
            },
            {
              label: "Install Command",
              name: "install_command",
              placeholder: '"npm install" or "yarn install"',
              value: newScanProps.install_command,
            },
          ].map((field, index) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <label className="block mb-1 text-sm font-semibold">
                {field.label}
              </label>
              <Input
                placeholder={field.placeholder}
                name={field.name}
                value={field.value}
                onChange={handleInputChange}
                disabled={field.disabled}
                className={field.extraClass}
              />
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <EnvVariables envVars={envVars} setEnvVars={setEnvVars} />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button
              className="w-full bg-white text-black hover:bg-gray-200 font-bold"
              onClick={startScan}
            >
              Start Scan
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default NewScan;
