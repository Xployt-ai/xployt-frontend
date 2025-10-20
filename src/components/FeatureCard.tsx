import React from "react";

interface FeatureCardProps {
  title: string;
  desc: string;
  active?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, desc, active = false }) => (
  <div className={`feature-card${active ? " active" : ""}`}>
    <h3>{title}</h3>
    <p>{desc}</p>
  </div>
);

export default FeatureCard;