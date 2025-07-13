const Documentation = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Documentation</h1>
            <div className="prose prose-lg">
                <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
                <p className="text-gray-600 mb-4">
                    Welcome to Xployt.ai documentation. Here you'll find everything you need to 
                    get started with our security scanning platform.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Quick Start Guide</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Sign up for an account</li>
                    <li>Connect your repository</li>
                    <li>Configure your scan settings</li>
                    <li>Run your first security scan</li>
                    <li>Review and fix vulnerabilities</li>
                </ol>
                
                <h3 className="text-xl font-semibold mb-3 mt-6">API Reference</h3>
                <p className="text-gray-600 mb-4">
                    Our REST API allows you to integrate Xployt.ai into your existing workflows.
                </p>
            </div>
        </div>
    );
};

export default Documentation; 