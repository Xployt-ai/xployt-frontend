import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';


import icon from '../../public/x Logo.png';

const LoadRepo = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scanningProject, setScanningProject] = useState(null);
  
  const projects = [
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
    <div className='bg-black '>    
      <div className="w-full max-w-4xl mx-auto py-6 px-0 bg-transparent min-h-screen">
      {/* Header with Search */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative flex-1 align-left">
          <Search className="text-gray-600" />
          <Input
            type="text"
            placeholder="Search Projects ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-3 w-full bg-transparent border border-gray-600 rounded-lg "
          />
        </div>
        <Button
          disabled={isLoading}
          className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          {isLoading ? 'Scanning...' : 'Start Scan'}
        </Button>
      </div>

      {/* Project Cards */}
      <div className="space-y-4">
        {projects.map((project) => (
          <Card key={project.id} className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Project Logo */}
                  <div className="w-10 h-10 bg-transparent rounded-lg flex items-center justify-center">
                    <img src={icon} alt="Project Logo" className="w-8 h-8" />
                  </div>
                  
                  {/* Project Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {project.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Last scan - {project.lastScan}
                    </p>
                  </div>
                </div>

                {/* Scan Again Button */}
                <Button
                  onClick={() => (project.name)}
                  disabled={scanningProject === project.name}
                  variant="secondary"
                  className="px-6 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {scanningProject === project.name && <Loader2 className="w-4 h-4 animate-spin" />}
                  {scanningProject === project.name ? 'Scanning...' : 'Scan Again'}
                </Button>
              </div>
          </Card>
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