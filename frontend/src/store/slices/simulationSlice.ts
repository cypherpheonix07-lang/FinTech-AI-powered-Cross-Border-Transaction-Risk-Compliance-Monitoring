import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { SimulationState } from '@/types';
import { simulationApi } from '@/services/api';
import type { RootState } from '@/store';

interface SimState {
  simulation: SimulationState;
  sessionId: string | null;
  loading: boolean;
}

const initialState: SimState = {
  simulation: { isRunning: false, mode: 'normal', transactionsPerSecond: 0, elapsed: 0, generated: 0, flagged: 0 },
  sessionId: null,
  loading: false,
};

export const startSimulation = createAsyncThunk('simulation/start', async (mode: string) => simulationApi.start(mode));
export const stopSimulation = createAsyncThunk('simulation/stop', async (_, { getState }) => {
  const { simulation } = getState() as RootState;
  if (simulation.sessionId) await simulationApi.stop(simulation.sessionId);
});

const simulationSlice = createSlice({
  name: 'simulation',
  initialState,
  reducers: {
    updateSimulationStats(state, action: PayloadAction<Partial<SimulationState>>) {
      state.simulation = { ...state.simulation, ...action.payload };
    },
    setSimulationMode(state, action: PayloadAction<SimulationState['mode']>) {
      state.simulation.mode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startSimulation.fulfilled, (state, action) => {
        state.sessionId = action.payload.sessionId;
        state.simulation.isRunning = true;
        state.simulation.generated = 0;
        state.simulation.flagged = 0;
        state.simulation.elapsed = 0;
      })
      .addCase(stopSimulation.fulfilled, (state) => {
        state.simulation.isRunning = false;
        state.sessionId = null;
      });
  },
});

export const { updateSimulationStats, setSimulationMode } = simulationSlice.actions;
export const selectSimulation = (state: RootState) => state.simulation;
export default simulationSlice.reducer;
