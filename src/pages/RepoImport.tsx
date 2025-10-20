import { useEffect, useState } from "react";
import RepositoryCard from "@/components/RepositoryCard.tsx";
import { SearchBar } from "@/components/SearchBar.tsx";
import { repoEndpoints } from "@/data/network/repo.ts";
import type { Repo } from "@/data/models/repo.ts";
import { useAuth } from "@/contexts/AuthContext";
import NETWORK from "@/data/network/index.ts";

const RepoImport = () => {
  const { user } = useAuth();
  const [repositories, setRepositories] = useState<Repo[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // ✅ new states for pagination & filters
  const [currentPage, setCurrentPage] = useState(1);
  const [reposPerPage] = useState(6);
  const [filterType, setFilterType] = useState("all"); // 'all' | 'public' | 'private'

  const fetchRepositories = async (isRefresh = false) => {
    setError(null);
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    
    try {
      const repos = await repoEndpoints.getRepos();
      setRepositories(repos || []);
    } catch (err: any) {
      console.error("Error fetching repositories:", err);
      setError(err?.message || "Failed to load repositories");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  // ✅ Apply search + filter
  const filteredRepos = repositories
    .filter((repo) =>
      repo.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((repo) => {
      if (filterType === "public") return !repo.private;
      if (filterType === "private") return repo.private;
      return true;
    });

  // ✅ Pagination logic
  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = filteredRepos.slice(indexOfFirstRepo, indexOfLastRepo);
  const totalPages = Math.ceil(filteredRepos.length / reposPerPage);

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto min-h-screen w-full max-w-4xl bg-transparent px-0 py-6">
        {/* Header */}
        <div className="space-y-4 mb-4">
          <h2 className="text-2xl font-semibold mb-4">Select a Repository to Scan</h2>
          <p className="text-muted-foreground">
            {user ? `Signed in as ${user.username}` : 'Connect your GitHub account to import repositories.'}
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Repositories</h2>
            <button
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white bg-transparent focus:outline-none transition-colors disabled:opacity-50"
              onClick={() => { NETWORK.invalidateCache('/repositories'); fetchRepositories(true); }}
              disabled={isRefreshing}
              aria-label="Refresh"
            >
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`}
              >
                <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.13-.37 2.17-1 3.03l1.46 1.46A7.932 7.932 0 0020 12c0-4.42-3.58-8-8-8zm-6.41.59L4.59 6.41A7.932 7.932 0 004 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3c-3.31 0-6-2.69-6-6 0-1.13.37-2.17 1-3.03z"/>
              </svg>
            </button>
          </div>

          {/* ✅ Added filter dropdown */}
          <div className="flex justify-between items-center gap-4">
            <div className="flex-1">
              <SearchBar  
                placeholder="Search repositories..."
                onChange={e => setSearch(e.target.value)}
                isLoading={false}
              />
            </div>
            <select
              className="bg-background border border-gray-600 rounded-md px-3 py-2 text-sm text-gray-300 focus:outline-none hover:border-gray-500 transition-colors"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Repositories</option>
              <option value="public">Public Only</option>
              <option value="private">Private Only</option>
            </select>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="text-muted-foreground">Loading repositories...</p>
            </div>
          )}
          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="text-muted-foreground">Loading repositories...</p>
            </div>
          )}

          {/* Error State */}
          {!isLoading && error && (
            <div className="text-red-400 space-y-2">
              <div className="font-bold">Failed to load repositories</div>
              <div className="text-sm">{error}</div>
              <div className="mt-2">
                <button className="underline hover:text-red-300" onClick={() => fetchRepositories()}>
                  Try again
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && filteredRepos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {search || filterType !== "all" 
                  ? "No repositories match your search criteria" 
                  : "No repositories found in your GitHub account"}
              </p>
            </div>
          )}

          {/* Repository List */}
          {!isLoading && !error && currentRepos.length > 0 && (
            <div className="flex flex-col gap-3">
              {currentRepos.map((repo, index) => (
                <div 
                  key={repo.github_repo_id || index}
                  className="animate-fade-in rounded-lg hover:bg-accent/50 transition-colors"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <RepositoryCard repo={repo} />
                </div>
              ))}
            </div>
          )}

          {/* ✅ Pagination Controls */}
          {!isLoading && filteredRepos.length > reposPerPage && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                className="px-4 py-2 text-sm border border-gray-600 rounded hover:bg-gray-800 disabled:opacity-50 transition-colors"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-gray-400 text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="px-4 py-2 text-sm border border-gray-600 rounded hover:bg-gray-800 disabled:opacity-50 transition-colors"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default RepoImport;
