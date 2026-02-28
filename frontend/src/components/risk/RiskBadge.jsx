import React from 'react';

const RiskBadge = ({ score }) => {
  const getRiskDetails = (s) => {
    if (s > 0.6) return { label: 'High Risk', color: 'bg-risk-high text-white', dot: 'bg-red-200' };
    if (s > 0.3) return { label: 'Medium Risk', color: 'bg-risk-medium text-white', dot: 'bg-amber-200' };
    return { label: 'Low Risk', color: 'bg-risk-low text-white', dot: 'bg-green-200' };
  };

  const { label, color, dot } = getRiskDetails(score);

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${color}`}>
      <span className={`w-2 h-2 rounded-full mr-2 animate-pulse ${dot}`} />
      {label}
    </div>
  );
};

export default RiskBadge;
