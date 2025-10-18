import { useEffect, useState } from "react";
// Import the refresh icon from public folder
// No import needed for public assets, use /refresh-icon.png in <img>
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRepositories = async () => {
    setLoading(true);
    setError(null);
    try {
      const repos = await repoEndpoints.getRepos();
      setRepositories(repos || []);
    } catch (err: any) {
      console.error("Error fetching repositories:", err);
      setError(err?.message || "Failed to load repositories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  const filteredRepos = repositories.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black p-12 flex flex-col items-center relative font-sans space-y-6">
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

        <SearchBar
          placeholder="Search repositories"
          onChange={e => setSearch(e.target.value)}
          isLoading={loading}
        />

        {loading && <div className="text-gray-400">Loading repositories...</div>}
        {error && (
          <div className="text-red-400">
            <div className="font-bold">Failed to load repositories</div>
            <div className="text-sm">{error}</div>
            <div className="mt-2">
              <button className="underline" onClick={() => fetchRepositories()}>Try again</button>
            </div>
          </div>
        )}

        {!loading && !error && filteredRepos.length === 0 && (
          <div className="text-gray-500">No repositories found in your GitHub account.</div>
        )}

        <div className="flex flex-col gap-4">
          {/*TODO: add pagination*/}
          {filteredRepos.map((repo, index) => (
            <RepositoryCard
              key={repo.github_repo_id || index}
              repo={repo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RepoImport;
