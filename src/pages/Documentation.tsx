import "./Documentation.css";

const Documentation = () => {
  return (
    <section className="documentation-container">
      <div className="documentation-header">
        <div className="documentation-label">DOCUMENTATION</div>
        <h1 className="documentation-title">How It Works</h1>
        <p className="documentation-intro">
          Welcome to Xployt.ai documentation. Here you'll find everything you need to
          get started with our AI-powered security scanning platform.
        </p>
      </div>

      <div className="documentation-content">
        <div className="documentation-card">
          <h2 className="documentation-section-title">Getting Started</h2>
          <p className="documentation-prose">
            Xployt.ai makes security scanning accessible and automated. Follow these steps
            to start protecting your codebase in minutes.
          </p>
        </div>

        <div className="documentation-card">
          <h3 className="documentation-section-subtitle">Quick Start Guide</h3>
          <ol className="documentation-list">
            <li><span>Sign up for an account</span> — Create your free account to get started</li>
            <li><span>Connect your GitHub repository</span> — Authorize secure access via OAuth</li>
            <li><span>Select your project</span> — Choose the MERN application you want to scan</li>
            <li><span>Run your first scan</span> — Let our AI analyze your code for vulnerabilities</li>
            <li><span>Review results</span> — Get detailed reports with actionable fixes</li>
          </ol>
        </div>

        <div className="documentation-card">
          <h3 className="documentation-section-subtitle">API Reference</h3>
          <p className="documentation-prose">
            Our REST API allows you to integrate Xployt.ai scans into your CI/CD pipelines
            and existing development workflows. Full API documentation coming soon.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Documentation; 