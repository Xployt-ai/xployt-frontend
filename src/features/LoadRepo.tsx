import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
<<<<<<< HEAD
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import icon from '../../public/x Logo.png';
=======
import { Input } from '@/components/ui/Input';
import type { Project } from "@/types/Project.tsx";
import { ProjectCard } from "@/components/ProjectCard.tsx";
>>>>>>> 9c49e7dbb4bf85bd9ac94e6a802f43e50a9cb450

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
    }
  ];

  return (
    <div className='bg-black min-h-screen'>
      <div className="w-full max-w-4xl mx-auto py-6 px-0 bg-transparent min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <div className="border border-gray-600 rounded-xl flex-1 flex items-center px-3 py-1 ">
          <Search className="text-gray-600 w-4 h-4 mr-2" />
          <Input
            type="text"
            placeholder="Search Projects ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className=" max-w-full bg-transparent border-none outline-none  "
          />
        </div>
          <Button
            disabled={isLoading}
            className="px-6 py-6 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          {isLoading ? 'Scanning...' : 'Start Scan'}
        </Button>
      </div>

      <div className="space-y-4 w-full ">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {projects.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No projects found matching "{searchQuery}"</p>
        </div>
      )}
    </div>
    </div>

  );
};

export default LoadRepo;