import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SHAPView from './SHAPView';

const mockData = {
  tx_id: "TX_123",
  natural_language: "This is a test summary with High Risk.",
  features: [
    { name: "Feature A", importance: 0.5 }
  ]
};

describe('SHAPView Component', () => {
  it('renders natural language summary correctly', () => {
    render(<SHAPView data={mockData} />);
    expect(screen.getByText(/test summary with High Risk/i)).toBeInTheDocument();
  });

  it('renders feature names', () => {
    render(<SHAPView data={mockData} />);
    expect(screen.getByText('Feature A')).toBeInTheDocument();
  });

  it('calls onGeneratePack when button is clicked', () => {
    const handlePack = jest.fn();
    render(<SHAPView data={mockData} onGeneratePack={handlePack} />);
    
    const button = screen.getByText(/Evidence Pack/i);
    fireEvent.click(button);
    
    expect(handlePack).toHaveBeenCalledWith("TX_123");
  });
});
