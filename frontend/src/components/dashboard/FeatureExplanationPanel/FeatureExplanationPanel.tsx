import React from "react";

type Props = {
  risk: {
    anomaly_score?: number;
    supervised_prob?: number;
    graph_flag?: boolean;
    finalRiskScore?: number;
    risk_level?: string;
  };
};

export const FeatureExplanationPanel: React.FC<Props> = ({ risk }) => {
  if (!risk) return <div className="p-4">No risk details</div>;

  const anomaly = risk.anomaly_score ?? 0;
  const supervised = risk.supervised_prob ?? 0;
  const graphFlag = !!risk.graph_flag;

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Risk Explanation</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-gray-500">Anomaly Score</div>
          <div className="text-xl font-mono">{anomaly.toFixed(4)}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Supervised Probability</div>
          <div className="text-xl font-mono">{(supervised * 100).toFixed(2)}%</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Graph Flag</div>
          <div className={`text-xl ${graphFlag ? "text-red-600" : "text-green-600"}`}>
            {graphFlag ? "Linked to Shared Identifiers" : "No Shared Links"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Final Score</div>
          <div className="text-xl font-bold">{risk.finalRiskScore ?? "-"}</div>
          <div className="text-sm text-gray-500">{risk.risk_level}</div>
        </div>
      </div>
    </div>
  );
};

export default FeatureExplanationPanel;
