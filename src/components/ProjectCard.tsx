import type { Project } from "@/types/Project.tsx";
import { Card } from "@/components/ui/Card.tsx";
import icon from "../../public/x logo.png";
import { Button } from "@/components/ui/Button.tsx";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const navigate = useNavigate()

export const ProjectCard = ({ project }: { project: Project }) => {
  const [scanningProject, setScanningProject] = useState("");
  return (
    <Card key={project.id} className=" p-4 max-w-full">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-transparent rounded-lg flex items-center justify-center">
            <img src={icon} alt="Project Logo" className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">
              {project.name}
            </h3>
            <p className="text-gray-400 text-sm">
              Last scan - {project.lastScan}
            </p>
          </div>
        </div>

        <Button
          onClick={() => {
            navigate('/scanning')
            setScanningProject(project.name)
          }}
          disabled={scanningProject === project.name}
          variant="secondary"
          className="px-6 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {scanningProject === project.name && <Loader2 className="w-4 h-4 animate-spin" />}
          {scanningProject === project.name ? 'Scanning...' : 'Scan Again'}
        </Button>
      </div>
    </Card>
  );
};