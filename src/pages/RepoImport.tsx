import React, { useState } from "react";

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
    <div className="min-h-screen bg-black text-white p-12 flex flex-col items-center relative font-sans">
      {/* Header */}
      <div className="text-center max-w-xl mb-8">
        <h1 className="text-4xl font-bold">Let's build secure app</h1>
        <p className="text-gray-400 mt-2 text-sm">
          Select your GitHub repository to instantly begin scanning for security
          issues to kick-start your secure development journey
        </p>
      </div>

      {/* Card */}
      <div className="bg-[#1c1c1e] p-8 rounded-xl w-full max-w-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Import Git Repository</h2>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search Repositories"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-md border border-gray-700 bg-black text-white mb-6"
        />

        {/* Repo List */}
        <div className="flex flex-col gap-4">
          {filteredRepos.map((repo, index) => (
            <div
              key={index}
              className="bg-[#121212] p-4 border border-gray-800 rounded-md flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <span role="img" aria-label="folder" className="text-xl">
                  📁
                </span>
                <div>
                  <strong>{repo.name}</strong>
                  <div className="text-sm text-gray-500">{repo.date}</div>
                </div>
              </div>
              <button className="bg-white text-black font-bold px-4 py-1 rounded">
                Import
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Circle */}
      <div className="fixed top-8 right-8 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold">
        M
      </div>
    </div>
  );
};

export default RepoImport;
