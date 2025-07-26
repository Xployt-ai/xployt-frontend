import React, {useEffect, useState} from "react";
import type {Repo} from "@/data/models/repo.ts";
import {repoEndpoints} from "@/data/network/repo.ts";
import {Loader2} from "lucide-react";
import {ProjectCard} from "@/components/ProjectCard.tsx";
import {SearchBar} from "@/components/SearchBar.tsx";

const Dashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [repositories, setRepositories] = useState<Repo[]>([]);

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
    <div className="min-h-screen bg-black">
      <div className="mx-auto min-h-screen w-full max-w-4xl bg-transparent px-0 py-6">
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