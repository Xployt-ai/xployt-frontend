import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
    <motion.div
      className="min-h-screen bg-black p-12 flex flex-col items-center relative font-sans space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.div
        className="text-center max-w-xl mb-8"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold">Select a repository to scan</h1>
        <p className="text-gray-400 mt-2 text-sm">
          {user
            ? `Signed in as ${user.username}`
            : "Connect your GitHub account to import repositories."}
        </p>
      </motion.div>

      {/* Card */}
      <motion.div
        className="bg-[#1c1c1e] p-8 rounded-xl shadow-lg space-y-6 border border-gray-700 w-full max-w-4xl"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold mb-4">Import Git Repository</h2>
          <button
            className="text-sm text-gray-400 hover:text-white"
            onClick={fetchRepositories}
          >
            Refresh
          </button>
        </div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SearchBar
            placeholder="Search repositories"
            onChange={(e) => setSearch(e.target.value)}
            isLoading={loading}
          />
        </motion.div>

        {/* Loading / Error */}
        {loading && <div className="text-gray-400">Loading repositories...</div>}
        {error && (
          <div className="bg-red-900 p-3 rounded text-red-100">
            <div className="font-bold">Failed to load repositories</div>
            <div className="text-sm">{error}</div>
            <div className="mt-2">
              <button className="underline" onClick={fetchRepositories}>
                Try again
              </button>
            </div>
          </div>
        )}

        {!loading && !error && filteredRepos.length === 0 && (
          <div className="text-gray-500">
            No repositories found in your GitHub account.
          </div>
        )}

        {/* Repository list */}
        <div className="flex flex-col gap-4">
          {filteredRepos.map((repo, index) => (
            <motion.div
              key={repo.github_repo_id || index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <RepositoryCard repo={repo} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RepoImport;
