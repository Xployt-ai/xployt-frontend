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

  // ✅ new states for pagination & filters
  const [currentPage, setCurrentPage] = useState(1);
  const [reposPerPage] = useState(6);
  const [filterType, setFilterType] = useState("all"); // 'all' | 'public' | 'private'

  const fetchRepositories = async () => {
    setError(null);
    try {
      const repos = await repoEndpoints.getRepos();
      setRepositories(repos || []);
    } catch (err: any) {
      console.error("Error fetching repositories:", err);
      setError(err?.message || "Failed to load repositories");
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
    <div className="min-h-screen bg-background p-12 flex flex-col items-center relative font-sans space-y-6">
      {/* Header */}
      <div className="text-center max-w-xl mb-8">
        <h1 className="text-4xl font-bold">Select a repository to scan</h1>
        <p className="text-gray-400 mt-2 text-sm">
          {user ? `Signed in as ${user.username}` : 'Connect your GitHub account to import repositories.'}
        </p>
      </div>

      <div className="w-full max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Import Git Repository</h2>
          <button
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white bg-transparent focus:outline-none"
            onClick={() => { NETWORK.invalidateCache('/repositories'); fetchRepositories(); }}
            aria-label="Refresh"
            style={{ minWidth: '100px', background: 'transparent', border: 'none', borderRadius: 0, boxShadow: 'none' }}
          >
            <span>Refresh</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.13-.37 2.17-1 3.03l1.46 1.46A7.932 7.932 0 0020 12c0-4.42-3.58-8-8-8zm-6.41.59L4.59 6.41A7.932 7.932 0 004 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3c-3.31 0-6-2.69-6-6 0-1.13.37-2.17 1-3.03z"/>
            </svg>
          </button>
        </div>

        {/* ✅ Added filter dropdown */}
        <div className="flex justify-between  items-center">
          <div className="w-full max-w mr-8 ">
            <SearchBar  
            placeholder="Search repositories"
            onChange={e => setSearch(e.target.value)}
            isLoading={false}
          />
          </div>
          <select
            className="bg-background border border-gray-600 rounded-md px-3 py-2 text-sm text-gray-300 focus:outline-none"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        {error && (
          <div className="text-red-400">
            <div className="font-bold">Failed to load repositories</div>
            <div className="text-sm">{error}</div>
            <div className="mt-2">
              <button className="underline" onClick={() => fetchRepositories()}>Try again</button>
            </div>
          </div>
        )}

        {!error && filteredRepos.length === 0 && (
          <div className="text-gray-500">No repositories found in your GitHub account.</div>
        )}

        <div className="flex flex-col gap-4 ">
          {/* ✅ Pagination applied here */}
          {currentRepos.map((repo, index) => (
            <div className=" rounded-lg p-2 hover:bg-gray-800 transition">
            <RepositoryCard
              key={repo.github_repo_id || index}
              repo={repo}
            /></div>
          ))}
        </div>

        {/* ✅ Pagination Controls */}
        {filteredRepos.length > reposPerPage && (
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              className="px-4 py-2 text-sm border border-gray-600 rounded hover:bg-gray-800 disabled:opacity-50"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-gray-400 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-4 py-2 text-sm border border-gray-600 rounded hover:bg-gray-800 disabled:opacity-50"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RepoImport;
