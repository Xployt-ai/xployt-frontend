import "./Pricing.css";

const Pricing = () => {
    return (
        <div className="pricing-container">
            <h1 className="pricing-title">Pricing</h1>
            <div className="pricing-grid">
                <div className="pricing-card">
                    <h3 className="pricing-card-title">Starter</h3>
                    <p className="pricing-card-price">$29<span>/month</span></p>
                    <ul className="pricing-card-list">
                        <li>• Up to 5 repositories</li>
                        <li>• Basic security scans</li>
                        <li>• Email support</li>
                    </ul>
                </div>
                <div className="pricing-card pro">
                    <h3 className="pricing-card-title">Professional</h3>
                    <p className="pricing-card-price">$99<span>/month</span></p>
                    <ul className="pricing-card-list">
                        <li>• Up to 25 repositories</li>
                        <li>• Advanced security scans</li>
                        <li>• Priority support</li>
                    </ul>
                </div>
                <div className="pricing-card">
                    <h3 className="pricing-card-title">Enterprise</h3>
                    <p className="pricing-card-price">Custom</p>
                    <ul className="pricing-card-list">
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