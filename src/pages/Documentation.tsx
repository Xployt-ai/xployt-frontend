import "./Documentation.css";

const Documentation = () => {
    return (
        <div className="documentation-container">
            <h1 className="documentation-title">Documentation</h1>
            <div>
                <h2 className="documentation-section-title">Getting Started</h2>
                <p className="documentation-prose">
                    Welcome to Xployt.ai documentation. Here you'll find everything you need to 
                    get started with our security scanning platform.
                </p>
                <h3 className="documentation-section-title">Quick Start Guide</h3>
                <ol className="documentation-list">
                    <li>Sign up for an account</li>
                    <li>Connect your repository</li>
                    <li>Configure your scan settings</li>
                    <li>Run your first security scan</li>
                    <li>Review and fix vulnerabilities</li>
                </ol>
                <h3 className="documentation-section-title">API Reference</h3>
                <p className="documentation-prose">
                    Our REST API allows you to integrate Xployt.ai into your existing workflows.
                </p>
            </div>
        </div>
    );
};

export default Documentation; 