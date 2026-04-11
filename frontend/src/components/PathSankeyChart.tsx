import React from 'react';
import { ResponsiveContainer, Sankey, Tooltip } from 'recharts';

// Define the data structure for the Sankey diagram
const data = {
  nodes: [
    { name: 'Sender (US)' },           // 0
    { name: 'Correspondent Bank A' },  // 1
    { name: 'Clearing House' },        // 2
    { name: 'Correspondent Bank B' },  // 3
    { name: 'Recipient (EU)' },        // 4
  ],
  links: [
    { source: 0, target: 1, value: 1000, risk: 'low' },
    { source: 1, target: 2, value: 1000, risk: 'medium' },
    { source: 2, target: 3, value: 1000, risk: 'high' },
    { source: 3, target: 4, value: 1000, risk: 'low' },
  ],
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 border rounded shadow-lg text-sm">
        <p className="font-bold text-gray-800">{data.source?.name} → {data.target?.name}</p>
        <p className="text-gray-600">Value: ${data.value}</p>
        <p className={`font-semibold ${data.risk === 'high' ? 'text-red-500' : data.risk === 'medium' ? 'text-yellow-500' : 'text-green-500'}`}>
          Risk Level: {data.risk?.toUpperCase() || 'N/A'}
        </p>
      </div>
    );
  }
  return null;
};

export const PathVisualizer: React.FC = () => {
  return (
    <div className="w-full h-96 bg-gray-50 border rounded-xl shadow-inner p-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Transfer Path Visualization Engine</h2>
      <ResponsiveContainer width="100%" height="100%">
        <Sankey
          data={data}
          node={{ stroke: '#cbd5e1', strokeWidth: 2 }}
          nodePadding={50}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          link={{ stroke: '#94a3b8' }}
        >
          <Tooltip content={<CustomTooltip />} />
        </Sankey>
      </ResponsiveContainer>
    </div>
  );
};

export default PathVisualizer;
