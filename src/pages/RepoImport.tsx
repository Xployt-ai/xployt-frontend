import { useState } from "react";
import SearchInput from "@/components/ui/SearchInput";
import RepositoryCard from "@/components/ui/RepositoryCard";

const repositories = [
  { name: "Automatisch", date: "Apr 30" },
  { name: "PickMe", date: "2/2/24" },
  { name: "Xployt.ai", date: "2/1/23" },
];

const RepoImport = () => {
  const [search, setSearch] = useState("");

  const filteredRepos = repositories.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray text-white p-12 flex flex-col items-center relative font-sans space-y-6 border border-gray-700 ">
      {/* Header */}
      <div className="text-center max-w-xl mb-8 ">
        <h1 className="text-4xl font-bold">Let's build secure app</h1>
        <p className="text-gray-400 mt-2 text-sm">
          Select your GitHub repository to instantly begin scanning for security
          issues to kick-start your secure development journey
        </p>
      </div>

      {/* Card */}
      <div
  className="bg-[#1c1c1e] p-8 rounded-xl shadow-lg space-y-6 border border-gray-700"
  style={{ width: "1002px", height: "584px" }}
>
  <h2 className="text-2xl font-bold mb-4">Import Git Repository</h2>

        <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />

        <div className="flex flex-col gap-4">
          {filteredRepos.map((repo, index) => (
            <RepositoryCard
              key={index}
              name={repo.name}
              date={repo.date}
              onImport={() => console.log(`Importing ${repo.name}`)}
            />
          ))}
        </div>
      </div>

      
     
    </div>
  );
};

export default RepoImport;
