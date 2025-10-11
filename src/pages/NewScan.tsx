// src/pages/NewScan.tsx
import React, { useState, useEffect } from "react";
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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();
  const { repo_name } = useParams();

  // Pre-fill repository name from params
  useEffect(() => {
    if (repo_name) {
      setNewScanProps((prev) => ({ ...prev, repository_name: repo_name }));
    }
  }, [repo_name]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewScanProps((prev) => ({ ...prev, [name]: value }));

    // Clear error on input change
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateForm = (scanData: newScanProps) => {
    const newErrors: { [key: string]: string } = {};

    if (!scanData.branch.trim()) newErrors.branch = "Branch is required";
    if (!scanData.root_directory.trim()) newErrors.root_directory = "Root directory is required";
    if (!scanData.build_command.trim()) newErrors.build_command = "Build command is required";
    if (!scanData.output_directory.trim()) newErrors.output_directory = "Output directory is required";
    if (!scanData.install_command.trim()) newErrors.install_command = "Install command is required";

    envVars.forEach((env, index) => {
      if ((env.key && !env.value) || (!env.key && env.value)) {
        newErrors[`env_${index}`] = "Both key and value are required for environment variables";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const startScan = async () => {
    if (!repo_name) return;

    const scanData: newScanProps = {
      ...newScanProps,
      repository_name: repo_name,
      env_variables: envVars.filter((env) => env.key && env.value),
    };

    if (!validateForm(scanData)) return;

    try {
      await scanEndpoints.updateScanProps(scanData);
      const scan_id = await scanEndpoints.startScan(repo_name);
      navigate(`/scanning/${scan_id}`);
    } catch (error) {
      console.error("Error starting scan:", error);
    }
  };

  // Input field configuration
  const fields = [
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
  ];

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

          {fields.map((field, index) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <label className="block mb-1 text-sm font-semibold">{field.label}</label>
              <Input
                placeholder={field.placeholder}
                name={field.name}
                value={field.value}
                onChange={handleInputChange}
                disabled={field.disabled}
                className={`${field.extraClass ?? ""} ${
                  errors[field.name] ? "border-red-500 border" : ""
                }`}
              />
              {errors[field.name] && (
                <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
              )}
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <EnvVariables envVars={envVars} setEnvVars={setEnvVars} />
            {Object.keys(errors)
              .filter((key) => key.startsWith("env_"))
              .map((key) => (
                <p key={key} className="text-red-500 text-xs mt-1">
                  {errors[key]}
                </p>
              ))}
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
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
