import React from 'react';
import CounterfactualView from '../components/explain/CounterfactualView';
import ScheduleReportForm from '../components/reports/ScheduleReportForm';

export default {
  title: 'Ecosystem/Components',
};

const mockCounterfactual = {
  target_risk: 0.3,
  estimated_new_risk: 0.28,
  suggestions: [
    { feature: 'Velocity', current_value: '10', suggested_value: '2', impact: 0.3 },
    { feature: 'Jurisdiction', current_value: 'KYC-L3', suggested_value: 'KYC-L1', impact: 0.15 }
  ]
};

export const CounterfactualAnalysis = () => (
  <div className="p-10 bg-dark-900 min-h-screen">
    <CounterfactualView data={mockCounterfactual} />
  </div>
);

export const ReportScheduler = () => (
  <div className="p-10 bg-dark-900 min-h-screen">
    <ScheduleReportForm />
  </div>
);
