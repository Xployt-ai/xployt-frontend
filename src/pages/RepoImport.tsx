import React, { useState } from "react";
import "./RepoImport.css"; 

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
    <div className="import-container">
      <div className="import-header">
        <h1>Let's build secure app</h1>
        <p>
          Select your GitHub repository to instantly begin scanning for security
          issues to kick-start your secure development journey
        </p>
      </div>

      <div className="import-card">
        <h2>Import Git Repository</h2>

        <input
          type="text"
          placeholder="Search Repositories"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <div className="repo-list">
          {filteredRepos.map((repo, index) => (
            <div key={index} className="repo-item">
              <div className="repo-info">
                <span role="img" aria-label="folder" className="repo-icon">
                  📁
                </span>
                <div>
                  <strong>{repo.name}</strong>
                  <div className="repo-date">{repo.date}</div>
                </div>
              </div>
              <button className="import-button">Import</button>
            </div>
          ))}
        </div>
      </div>

      <div className="profile-circle">M</div>
    </div>
  );
};

export default RepoImport;
