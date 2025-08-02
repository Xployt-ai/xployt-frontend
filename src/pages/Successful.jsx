import React from "react";

const Successful = () => {
  const repositories = [{ name: "Automatisch", date: "2023-11-20" }];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 font-sans relative">
      <div className="bg-[#1c1c1e] p-8 rounded-2xl shadow-lg w-full max-w-xl text-center space-y-6">
        {/* Success Message */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">🎉 Congratulations!</h1>
          <p className="text-gray-300 text-sm">
            You just started a new project for scanning.
          </p>
        </div>

        {/* Project Details */}
        <div className="text-left space-y-4">
          <h2 className="text-xl font-semibold">📁 Project Details</h2>
          {repositories.map((repo, index) => (
            <div key={index} className="bg-[#121212] p-4 rounded-lg border border-gray-700 space-y-3">
              <div className="text-sm">
                <label className="block text-gray-400 mb-1">Repository</label>
                <div>{repo.name}</div>
              </div>
              <div className="text-sm">
                <label className="block text-gray-400 mb-1">Last Commit</label>
                <div>{repo.date}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Section */}
        <div className="space-y-2 text-left">
          <p>
            Overall Progress:{" "}
            <span className="text-green-400 font-bold">67%</span>
          </p>
          <div className="w-full h-3 bg-gray-700 rounded-md overflow-hidden">
            <div
              className="h-full bg-green-500"
              style={{ width: "67%" }}
            ></div>
          </div>
        </div>

        {/* CTA Button */}
        <button className="w-full bg-white text-black py-2 rounded-md font-bold hover:bg-gray-200 transition">
          Continue to Dashboard
        </button>
      </div>

      {/* Profile Circle */}
      <div className="fixed top-8 right-8 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold">
        M
      </div>
    </div>
  );
};

export default Successful;
