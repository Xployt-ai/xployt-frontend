const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="space-y-2 text-left mt-6">
    <p>
      Overall Progress: <span className="text-white">{progress}%</span>
    </p>
    <div className="w-full h-3 bg-gray-600 rounded-md overflow-hidden">
      <div
        className="h-full bg-white transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  </div>
);

export default ProgressBar;
