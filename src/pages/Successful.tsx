import React from "react";
import "./Successful.css";
import NavBar from "@/features/nav/NavBar";

const Successful = () => {
  const repositories = [
    { name: "Automatisch", date: "2023-11-20" },
  ];

  return (
    <div>
      <NavBar />
    <div className="success-container">
      <div className="success-card">
        <div className="success-header-box">
          <h1>🎉 Congratulations!</h1>
          <p>You just started a new project for scanning.</p>
        </div>

        <div className="details-section">
          <h2>📁 Project Details</h2>

          {repositories.map((repo, index) => (
            <div key={index} className="repo-box">
              <div className="field">
                <label>Repository</label>
                <div>{repo.name}</div>
              </div>
              <div className="field">
                <label>Last Commit</label>
                <div>{repo.date}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="progress-box">
          <p>
            Overall Progress: <span className="progress-text">67%</span>
          </p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "67%" }}></div>
          </div>
        </div>

        <button className="import-button">Continue to Dashboard</button>
      </div>

      <div className="profile-circle">M</div>
    </div>
    </div>
  );
};

export default Successful;
