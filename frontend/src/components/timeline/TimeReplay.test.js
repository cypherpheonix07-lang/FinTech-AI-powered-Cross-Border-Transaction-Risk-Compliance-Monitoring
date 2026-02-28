import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import TimeReplay from './TimeReplay';

const mockHops = [
  { id: '1', bank: 'Bank A' },
  { id: '2', bank: 'Bank B' }
];

describe('TimeReplay Component', () => {
  it('renders correctly in standby', () => {
    render(<TimeReplay hops={mockHops} />);
    expect(screen.getByText(/Standby/i)).toBeInTheDocument();
  });

  it('updates step when play is clicked', async () => {
    jest.useFakeTimers();
    const handleStep = jest.fn();
    render(<TimeReplay hops={mockHops} onStepChange={handleStep} />);
    
    const playBtn = screen.getByRole('button', { name: '' }); // The play button doesn't have text
    // Selecting by icon name is cleaner if we had test-ids, using button instead
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]); // Play button
    
    act(() => {
      jest.advanceTimersByTime(1100);
    });
    
    expect(handleStep).toHaveBeenCalledWith(0);
    jest.useRealTimers();
  });
});
