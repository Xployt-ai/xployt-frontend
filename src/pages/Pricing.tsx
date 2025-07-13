const Pricing = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Pricing</h1>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="border rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">Starter</h3>
                    <p className="text-3xl font-bold text-blue-600 mb-4">$29<span className="text-lg text-gray-500">/month</span></p>
                    <ul className="space-y-2 text-gray-600">
                        <li>• Up to 5 repositories</li>
                        <li>• Basic security scans</li>
                        <li>• Email support</li>
                    </ul>
                </div>
                <div className="border rounded-lg p-6 border-blue-500 bg-blue-50">
                    <h3 className="text-xl font-semibold mb-4">Professional</h3>
                    <p className="text-3xl font-bold text-blue-600 mb-4">$99<span className="text-lg text-gray-500">/month</span></p>
                    <ul className="space-y-2 text-gray-600">
                        <li>• Up to 25 repositories</li>
                        <li>• Advanced security scans</li>
                        <li>• Priority support</li>
                    </ul>
                </div>
                <div className="border rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">Enterprise</h3>
                    <p className="text-3xl font-bold text-blue-600 mb-4">Custom</p>
                    <ul className="space-y-2 text-gray-600">
                        <li>• Unlimited repositories</li>
                        <li>• Custom integrations</li>
                        <li>• Dedicated support</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Pricing; 