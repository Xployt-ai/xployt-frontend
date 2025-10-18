import { useEffect, useState } from "react";
import RepositoryCard from "@/components/RepositoryCard.tsx";
import { SearchBar } from "@/components/SearchBar.tsx";
import { repoEndpoints } from "@/data/network/repo.ts";
import type { Repo } from "@/data/models/repo.ts";
import { useAuth } from "@/contexts/AuthContext";

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
            className="text-sm text-gray-400 hover:text-white"
            onClick={() => fetchRepositories()}
          >
            Refresh
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
