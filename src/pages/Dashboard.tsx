import {useEffect, useState} from "react";
import {Loader2, FileText, AlertTriangle, Target,  TrendingUp, TrendingDown} from "lucide-react";
import {ProjectCard} from "@/components/ProjectCard.tsx";
import {SearchBar} from "@/components/SearchBar.tsx";
import {repoEndpoints} from "@/data/network/repo.ts";
import type {Repo} from "@/data/models/repo.ts";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";

const Dashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [repositories, setRepositories] = useState<Repo[]>([]);

  const metrics = [
    {
      icon: FileText,
      title: 'Total Repositories',
      value: '24',
      change: '+12.5%',
      isPositive: true,
      badge: 'Active'
    },
    {
      icon: AlertTriangle,
      title: 'Critical Alerts',
      value: '7',
      change: '-23.1%',
      isPositive: true,
      badge: 'Resolved'
    },
    {
      icon: Target,
      title: 'Scan Coverage',
      value: '94%',
      change: '+5.2%',
      isPositive: true,
      badge: 'Excellent'
    }
  ];

  useEffect(() => {
    const getRepositories = async () => {
      setIsLoading(true)
      console.debug("Fetching repositories...");
      const repos = await repoEndpoints.getRepos();
      setIsLoading(false)
      return repos;
    };
    getRepositories()
      .then((repos) => {
        repos = repos.filter(repo => repo.is_linked);
        setRepositories(repos);
        console.debug("Repositories set in state:", repos);
      })
      .catch((error) => {
        console.error("Error fetching repositories:", error);
      });
  }, []);

  // TODO: Add the search functionality and loading logic
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto min-h-screen w-full max-w-4xl bg-transparent px-0 py-6">
                  {/* Analytics Metrics Section */}
        <div className="space-y-4 mb-4">
          <h2 className="text-2xl font-semibold mb-4">Welcome back, Developer</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {metrics.map((metric, index) => (
              <Card key={index} className="transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">{metric.title}</p>
                      <p className="text-4xl font-bold">{metric.value}</p>
                      <div className="flex items-center gap-2">
                        <span className={`flex items-center text-sm font-medium ${
                          metric.isPositive ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {metric.isPositive ? (
                            <TrendingUp className="mr-1 h-4 w-4" />
                          ) : (
                            <TrendingDown className="mr-1 h-4 w-4" />
                          )}
                          {metric.change}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <metric.icon className="h-8 w-8 text-muted-foreground" />
                      <Badge variant={metric.isPositive ? "default" : "secondary"}>
                        {metric.badge}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <SearchBar
          placeholder={"Search repositories"}
          onChange={handleSearch}
          isLoading={searchLoading}
          />
        <div className="w-full space-y-4 ">
          {!isLoading && repositories.map(project => (
            <ProjectCard key={project.github_repo_id} project={project}/>
          ))}
          {
            isLoading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500"/>
              </div>
            )
          }
        </div>
        {!searchLoading && repositories.length === 0 && searchQuery && (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-500">No projects found matching "{searchQuery}"</p>
          </div>
        )}

        
      </div>

    </div>
  );
};

export default Dashboard;