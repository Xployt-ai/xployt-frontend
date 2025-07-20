import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

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