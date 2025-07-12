import React, { useState } from 'react';
import './NewScan.css';

const NewScan = () => {
  const [envVars, setEnvVars] = useState([{ key: '', value: '' }]);

  const handleAddEnvVar = () => {
    setEnvVars([...envVars, { key: '', value: '' }]);
  };

  const handleRemoveEnvVar = (index: number) => {
    const updated = [...envVars];
    updated.splice(index, 1);
    setEnvVars(updated);
  };

  const handleEnvChange = (index: number, field: 'key' | 'value', value: string) => {
    const updated = [...envVars];
    updated[index][field] = value;
    setEnvVars(updated);
  };

  return (
    <div className="scan-container">
      <div className="scan-card">
        <h2>New Scan</h2>

        <div className="input-group">
          <label>Importing from GitHub</label>
          <input disabled value="github.com/xployt-ai/xploit-scan-stub" />
        </div>

        <div className="input-group">
          <label>Select the branch</label>
          <select>
            <option>main</option>
            <option>dev</option>
          </select>
        </div>

        <div className="input-group">
          <label>Project Name</label>
          <input placeholder="Enter your project name" />
        </div>

        <div className="input-group">
          <label>Root Directory</label>
          <input defaultValue="/" />
        </div>

        <div className="section-label">Build and Output Settings</div>

        <div className="input-group">
          <label>Build Command</label>
          <input placeholder={`"npm run build" or "yarn build"`} />
        </div>

        <div className="input-group">
          <label>Output Directory</label>
          <input placeholder={`"public" (if exists), else "/"`} />
        </div>

        <div className="input-group">
          <label>Install Command</label>
          <input placeholder={`"npm install" or "yarn install"`} />
        </div>

        <div className="section-label">Environment Variables</div>

        {envVars.map((env, index) => (
          <div className="env-pair" key={index}>
            <input
              type="text"
              placeholder="EXAMPLE_NAME"
              value={env.key}
              onChange={(e) => handleEnvChange(index, 'key', e.target.value)}
            />
            <input
              type="text"
              placeholder="Value"
              value={env.value}
              onChange={(e) => handleEnvChange(index, 'value', e.target.value)}
            />
            <button onClick={() => handleRemoveEnvVar(index)}>-</button>
          </div>
        ))}

        <button onClick={handleAddEnvVar} className="add-more">+ Add More</button>

        <p className="tip">Tip: Push an env above to populate this form.</p>

        <button className="start-button">Start Scan</button>
      </div>

      <div className="profile-circle">M</div>
    </div>
  );
};

export default NewScan;
