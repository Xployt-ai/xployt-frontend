import React from 'react';

const ScanProgress: React.FC = () => {
  const scanPhases = [
    { name: 'Basic Scan', status: 'Done', color: 'success' },
    { name: 'Deep Static Analysis', status: 'Ongoing', color: 'warning' },
    { name: 'Runtime Behavior Scan', status: 'Queued', color: 'secondary' },
  ];

  const scanDetails = [
    { severity: 'High', finding: 'SQL Injection Vulnerability', url: 'https://site.com/login' },
    { severity: 'Medium', finding: 'Cross-Site Scripting (XSS)', url: 'https://site.com/search' },
    { severity: 'Low', finding: 'Outdated Software Version', url: 'https://site.com/about' },
  ];

  return (
    <div className="container py-4 text-white" style={{ backgroundColor: '#0f0f0f' }}>
      <h2 className="text-center mb-4">Scan in progress</h2>

      {/* Scan Status & Project Details */}
      <div className="row mb-4">
        <div className="col-md-8">
          <div className="card bg-dark p-3 mb-3">
            <h5>Scan Status</h5>
            <div className="mb-2">Overall Progress</div>
            <div className="progress mb-3" style={{ height: '20px' }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: '67%' }}
                aria-valuenow={67}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                67%
              </div>
            </div>

            {scanPhases.map((phase, idx) => (
              <div key={idx} className="d-flex justify-content-between align-items-center mb-2">
                <span>{phase.name}</span>
                <span className={`badge bg-${phase.color}`}>{phase.status}</span>
              </div>
            ))}
          </div>

          {/* Live Summary */}
          <div className="card bg-dark p-3 mb-3">
            <h5>Live Summary</h5>
            <p>3 events found</p>
            <button className="btn btn-outline-danger btn-sm">Cancel Scan</button>
          </div>
        </div>

        {/* Project Details + Indicators */}
        <div className="col-md-4">
          <div className="card bg-dark p-3 mb-3">
            <h5>Project Details</h5>
            <p><strong>Repository:</strong> Automation-AI</p>
            <p><strong>Last Commit:</strong> 2023-11-06</p>
          </div>

          <div className="card bg-dark p-3">
            <h5>Scan Indicators</h5>
            <p><strong>Pages Scanned:</strong> 15 / 82</p>
            <p><strong>Vulnerabilities Found:</strong> 3</p>
            <p><strong>Errors:</strong> 2</p>
          </div>
        </div>
      </div>

      {/* Scan Details Table */}
      <div className="card bg-dark p-3">
        <h5>Scan Details</h5>
        <table className="table table-dark table-bordered mt-3">
          <thead className="table-secondary text-dark">
            <tr>
              <th>Severity</th>
              <th>Finding</th>
              <th>Affected URL</th>
            </tr>
          </thead>
          <tbody>
            {scanDetails.map((detail, index) => (
              <tr key={index}>
                <td>
                  <span className={`badge bg-${detail.severity === 'High' ? 'danger' : detail.severity === 'Medium' ? 'warning text-dark' : 'secondary'}`}>
                    {detail.severity}
                  </span>
                </td>
                <td>{detail.finding}</td>
                <td><a href={detail.url} className="text-primary" target="_blank" rel="noopener noreferrer">{detail.url}</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScanProgress;
