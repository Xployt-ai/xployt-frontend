import React from "react";

interface FeatureCardProps {
  title: string;
  desc: string;
  active?: boolean;
  onClick?: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, desc, active = false, onClick }) => (
  <div className={`feature-card${active ? " active" : ""}`} onClick={onClick}>
    <h3>{title}</h3>
    <p>{desc}</p>
  </div>
);

export default FeatureCard;