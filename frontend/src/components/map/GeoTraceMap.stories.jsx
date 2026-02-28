import GeoTraceMap from './GeoTraceMap';

export default {
  title: 'Mapping/GeoTraceMap',
  component: GeoTraceMap,
  parameters: {
    layout: 'fullscreen',
  },
};

const mockPath = {
  overall_risk: 0.45,
  hops: [
    { id: 'ACC_1', country: 'USA', bank: 'Federal Reserve' },
    { id: 'ACC_2', country: 'UK', bank: 'Standard Chartered' },
    { id: 'ACC_3', country: 'Germany', bank: 'Deutsche Bank' }
  ]
};

export const StandardPath = {
  args: {
    pathData: mockPath,
  },
};
