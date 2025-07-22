import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

import { Input } from '@/components/ui/input';
import type { Project } from '@/types/Project.tsx';
import { ProjectCard } from '@/components/ProjectCard.tsx';

const LoadRepo = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const projects: Project[] = [
    {
      id: 1,
      name: 'Automatisch',
      lastScan: '2025-07-20',
    },
    {
      id: 2,
      name: 'Xployt.ai',
      lastScan: '2024-06-2',
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="mx-auto min-h-screen w-full max-w-4xl bg-transparent px-0 py-6">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex flex-1 items-center rounded-xl border border-gray-600 px-3 py-1 ">
            <Search className="mr-2 h-4 w-4 text-gray-600" />
            <Input
              type="text"
              placeholder="Search Projects ..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className=" max-w-full border-none bg-transparent outline-none  "
            />
          </div>
          <Button
            disabled={isLoading}
            className="flex items-center gap-2 rounded-xl bg-gray-800 px-6 py-6 font-medium text-white transition-colors hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isLoading ? 'Scanning...' : 'Start Scan'}
          </Button>
        </div>

        <div className="w-full space-y-4 ">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {projects.length === 0 && searchQuery && (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-500">No projects found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadRepo;
