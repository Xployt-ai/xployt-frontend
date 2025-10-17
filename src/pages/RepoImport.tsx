import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import RepositoryCard from "@/components/RepositoryCard.tsx";
import { SearchBar } from "@/components/SearchBar.tsx";
import { repoEndpoints } from "@/data/network/repo.ts";
import type { Repo } from "@/data/models/repo.ts";

const RepoImport = () => {
  const [repositories, setRepositories] = useState<Repo[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getRepositories = async () => {
      console.debug("Fetching repositories...");
      const repos = await repoEndpoints.getRepos();
      console.log(repos);
      return repos;
    };
    getRepositories()
      .then((repos) => {
        setRepositories(repos);
        console.debug("Repositories set in state:");
      })
      .catch((error) => {
        console.error("Error fetching repositories:", error);
      });
  }, []);

  const filteredRepos = repositories.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      className="min-h-screen bg-black text-white p-12 flex flex-col items-center relative font-sans space-y-6 border border-gray-700"
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
        <h1 className="text-4xl font-bold">Let's build a secure app</h1>
        <p className="text-gray-400 mt-2 text-sm">
          Select your GitHub repository to instantly begin scanning for security
          issues to kick-start your secure development journey
        </p>
      </motion.div>

      {/* Card */}
      <motion.div
        className="bg-[#1c1c1e] p-8 rounded-xl shadow-lg space-y-6 border border-gray-700 w-4xl"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4">Import Git Repository</h2>

        {/* SearchBar animation on mount */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SearchBar
            placeholder="Search repositories"
            onChange={(e) => setSearch(e.target.value)}
            isLoading={false}
          />
        </motion.div>

        {/* Repository list */}
        <div className="flex flex-col gap-4">
          {filteredRepos.map((repo, index) => (
            <motion.div
              key={repo.name}
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