import React from "react";

interface PricingCardProps {
  plan: string;
  price: string;
  per?: string;
  tokens?: string;
  features: string[];
  buttonText: string;
  highlight?: boolean;
  onButtonClick?: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, price, per, tokens, features, buttonText, highlight = false, onButtonClick }) => (
  <div className={`pricing-card${highlight ? " pricing-card-highlight" : ""}`}>
    <div className="pricing-plan">{plan}</div>
    <div className={`pricing-price-row${highlight ? " pricing-price-row-highlight" : ""}`}>
      <div className="pricing-price">{price}</div>
      {per && <span className="pricing-per">{per}</span>}
    </div>
    {tokens && (
      <div className="pricing-tokens">
        <span className="pricing-tokens-badge">{tokens}</span>
      </div>
    )}
    <ul className="pricing-features">
      {features.map((feature, idx) => (
        <li key={idx}><img src="/checkmark.png" alt="check" className="pricing-check" /> {feature}</li>
      ))}
    </ul>
    <button className={`pricing-btn${highlight ? " pricing-btn-filled" : " pricing-btn-outline"}`} onClick={onButtonClick}>{buttonText}</button>
  </div>
);

export default PricingCard;