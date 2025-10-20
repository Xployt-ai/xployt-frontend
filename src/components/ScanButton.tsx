import React from 'react';

type Project = { name: string };

type Props = {
  project: Project;
  scanningProject: string | null;
  setScanningProject: (name: string | null) => void;
  navigate: (path: string) => void;
  formatRepoName: (name: string) => string;
  disabled?: boolean;
  className?: string;
};

const ScanButton: React.FC<Props> = ({
  project,
  scanningProject,
  setScanningProject,
  navigate,
  formatRepoName,
  disabled,
  className,
}) => {
  const isScanning = scanningProject === project.name;

  const handleClick = () => {
    navigate(`/new-scan/${formatRepoName(project.name)}`);
    setScanningProject(project.name);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isScanning}
      className={`w-full ${className ?? ''} ${isScanning ? 'opacity-70 cursor-wait' : ''}`}
      type="button"
    >
      {isScanning && (
        <svg className="h-4 w-4 animate-spin mr-2 inline-block" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {isScanning ? 'Scanning...' : 'Scan Again'}
    </button>
  );
};

export default ScanButton;