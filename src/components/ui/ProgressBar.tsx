const ProgressBar = ({ percentage = 0 }) => (
  <div>
    <p>
      Overall Progress:{" "}
      <span className="text-green-400 font-bold">{percentage}%</span>
    </p>
    <div className="w-full h-3 bg-gray-700 rounded-md overflow-hidden mt-1">
      <div className="h-full bg-green-500 transition-all" style={{ width: `${percentage}%` }}></div>
    </div>
  </div>
);

export default ProgressBar;
