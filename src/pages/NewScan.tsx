import React, { useState } from 'react';

const NewScan = () => {
  const [envVars, setEnvVars] = useState([{ key: '', value: '' }]);

  const handleAddEnvVar = () => {
    setEnvVars([...envVars, { key: '', value: '' }]);
  };

  const handleRemoveEnvVar = (index) => {
    const updated = [...envVars];
    updated.splice(index, 1);
    setEnvVars(updated);
  };

  const handleEnvChange = (index, field, value) => {
    const updated = [...envVars];
    updated[index][field] = value;
    setEnvVars(updated);
  };

  return (
    <div className="min-h-screen bg-black text-white p-12 flex flex-col items-center relative font-sans">
      <div className="bg-[#1c1c1e] p-8 rounded-xl w-full max-w-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6">New Scan</h2>

        {/* GitHub import */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-semibold">Importing from GitHub</label>
          <input
            disabled
            value="github.com/xployt-ai/xploit-scan-stub"
            className="w-full p-2 rounded-md bg-gray-900 text-gray-400 border border-gray-700 cursor-not-allowed"
          />
        </div>

        {/* Branch select */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-semibold">Select the branch</label>
          <select className="w-full p-2 rounded-md bg-black border border-gray-700 text-white">
            <option>main</option>
            <option>dev</option>
          </select>
        </div>

        {/* Project Name */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-semibold">Project Name</label>
          <input
            placeholder="Enter your project name"
            className="w-full p-2 rounded-md bg-black border border-gray-700 text-white"
          />
        </div>

        {/* Root Directory */}
        <div className="mb-6">
          <label className="block mb-1 text-sm font-semibold">Root Directory</label>
          <input
            defaultValue="/"
            className="w-full p-2 rounded-md bg-black border border-gray-700 text-white"
          />
        </div>

        <div className="text-sm text-gray-400 font-semibold mb-2">Build and Output Settings</div>

        {/* Build Command */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-semibold">Build Command</label>
          <input
            placeholder='"npm run build" or "yarn build"'
            className="w-full p-2 rounded-md bg-black border border-gray-700 text-white"
          />
        </div>

        {/* Output Directory */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-semibold">Output Directory</label>
          <input
            placeholder='"public" (if exists), else "/"'
            className="w-full p-2 rounded-md bg-black border border-gray-700 text-white"
          />
        </div>

        {/* Install Command */}
        <div className="mb-6">
          <label className="block mb-1 text-sm font-semibold">Install Command</label>
          <input
            placeholder='"npm install" or "yarn install"'
            className="w-full p-2 rounded-md bg-black border border-gray-700 text-white"
          />
        </div>

        {/* Env Vars */}
        <div className="text-sm text-gray-400 font-semibold mb-2">Environment Variables</div>

        {envVars.map((env, index) => (
          <div key={index} className="flex gap-2 items-center mb-2">
            <input
              type="text"
              placeholder="EXAMPLE_NAME"
              value={env.key}
              onChange={(e) => handleEnvChange(index, 'key', e.target.value)}
              className="w-1/2 p-2 rounded-md bg-black border border-gray-700 text-white"
            />
            <input
              type="text"
              placeholder="Value"
              value={env.value}
              onChange={(e) => handleEnvChange(index, 'value', e.target.value)}
              className="w-1/2 p-2 rounded-md bg-black border border-gray-700 text-white"
            />
            <button
              onClick={() => handleRemoveEnvVar(index)}
              className="text-red-400 text-xl font-bold px-2"
              title="Remove"
            >
              -
            </button>
          </div>
        ))}

        {/* Add more env vars */}
        <button
          onClick={handleAddEnvVar}
          className="text-blue-400 hover:text-blue-500 font-semibold text-sm mb-4"
        >
          + Add More
        </button>

        {/* Tip */}
        <p className="text-xs text-gray-500 mb-4">
          Tip: Push an env above to populate this form.
        </p>

        {/* Start Scan */}
        <button className="w-full bg-white text-black py-2 rounded-md font-bold hover:bg-gray-200 transition">
          Start Scan
        </button>
      </div>

      {/* Profile Circle */}
      <div className="fixed top-8 right-8 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold">
        M
      </div>
    </div>
  );
};

export default NewScan;
