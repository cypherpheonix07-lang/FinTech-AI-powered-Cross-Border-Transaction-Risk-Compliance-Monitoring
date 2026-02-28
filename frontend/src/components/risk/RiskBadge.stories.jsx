import RiskBadge from './RiskBadge';

export default {
  title: 'Risk/RiskBadge',
  component: RiskBadge,
  tags: ['autodocs'],
};

export const LowRisk = {
  args: {
    score: 0.2,
  },
};

export const MediumRisk = {
  args: {
    score: 0.5,
  },
};

export const HighRisk = {
  args: {
    score: 0.9,
  },
};
