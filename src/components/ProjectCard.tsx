import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Calendar, BarChart3, CheckCircle2, FolderGit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { Repo } from "@/data/models/repo.ts";
import { formatRepoName } from "@/lib/utils.ts";

export const ProjectCard = ({ project }: { project: Repo }) => {
  const navigate = useNavigate();
  const [scanningProject, setScanningProject] = useState('');

  const handleClick = () => {
    navigate(`/securitydashboard/${formatRepoName(project.name)}`);
  };

  const lastScan = project.last_scan || "July 26, 2024, 10:30 AM";
  const totalScans = project.total_scans || 8;
  const resolvedIssues = project.resolved_issues || 12;
  const totalIssues = project.total_issues || 20;
  const resolvedPercentage = ((resolvedIssues / totalIssues) * 100).toFixed(0);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader 
        onClick={handleClick}
        className="cursor-pointer pb-3"
      >
        <div className="flex items-top gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-muted flex-shrink-0">
            <FolderGit2 className="h-5 w-5 text-muted-foreground" />
          </div>
          <CardTitle className="hover:text-primary transition-colors text-lg">
            {project.name}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        {/* Stats Grid */}
        <div className="flex-1 space-y-4 mb-6">
          {/* Last Scan */}
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Last Scan</p>
              <p className="text-sm">{lastScan}</p>
            </div>
          </div>

          {/* Total Scans */}
          <div className="flex items-start gap-3">
            <BarChart3 className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Total Scans</p>
              <p className="text-sm">{totalScans}</p>
            </div>
          </div>

          {/* Issues Resolved */}
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Issues Resolved</p>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-semibold">{resolvedPercentage}%</span>
                <span className="text-sm text-muted-foreground">({resolvedIssues}/{totalIssues})</span>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gray-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${resolvedPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={() => {
            navigate(`/selectscan/${formatRepoName(project.name)}`);
            setScanningProject(project.name);
          }}
          disabled={scanningProject === project.name}
          variant="secondary"
          className="w-full"
        >
          {scanningProject === project.name && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
          {scanningProject === project.name ? 'Scanning...' : 'Scan Again'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;