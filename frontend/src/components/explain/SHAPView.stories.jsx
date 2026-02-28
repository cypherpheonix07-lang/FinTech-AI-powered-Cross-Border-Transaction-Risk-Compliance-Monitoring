import SHAPView from './SHAPView';

export default {
  title: 'Intelligence/SHAPView',
  component: SHAPView,
  tags: ['autodocs'],
};

const mockData = {
  tx_id: "TX_TEST_999",
  overall_risk: 0.82,
  natural_language: "High risk detected due to unusual hop count and jurisdictional risk in the settlement corridor.",
  features: [
    { name: "Hop Count", importance: 0.55, impact: 'high' },
    { name: "Country Risk", importance: 0.28, impact: 'high' },
    { name: "Amount Deviation", importance: 0.15, impact: 'medium' },
    { name: "Time Decay", importance: -0.08, impact: 'low' },
    { name: "Frequency", importance: 0.10, impact: 'medium' }
  ]
};

export const CriticalRisk = {
  args: {
    data: mockData,
    onGeneratePack: (id) => console.log('Generating pack for:', id),
  },
};
