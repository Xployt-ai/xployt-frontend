import { Card } from '@/components/ui/card';
// import icon from '../../public/x logo.png';
import { Button } from '@/components/ui/Button.tsx';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type {Repo} from "@/data/models/repo.ts";
import {formatRepoName} from "@/lib/utils.ts";

export const ProjectCard = ({ project }: { project: Repo }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/securitydashboard/${formatRepoName(project.name)}`);
  }

  const [scanningProject, setScanningProject] = useState('');
  return (
    <Card key={project.github_repo_id} className=" max-w-full p-4">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-transparent">
            {/* <img src={icon} alt="Project Logo" className="h-8 w-8" /> TODO: load from src */}
          </div>
          <div onClick={() => {handleClick()}}>
            <h3 className="mb-1 text-lg font-semibold text-white">{project.name}</h3>
            {/*<p className="text-sm text-gray-400">Last scan - {project.lastScan}</p>*/}
          </div>
        </div>

        <Button
          onClick={() => {
            navigate(`/new-scan/${formatRepoName(project.name)}`);
            setScanningProject(project.name);
          }}
          disabled={scanningProject === project.name}
          variant="secondary"
          className="flex items-center gap-2 rounded-lg bg-white px-6 py-2 font-medium text-gray-900 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {scanningProject === project.name && <Loader2 className="h-4 w-4 animate-spin" />}
          {scanningProject === project.name ? 'Scanning...' : 'Scan Again'}
        </Button>
      </div>
    </Card>
  );
};
