import useStore from './store';

describe('Zustand Store Architecture', () => {
  beforeEach(() => {
    useStore.setState({ nodes: [], edges: [], isAuthenticated: false });
  });

  it('should initialize with empty graph data', () => {
    const state = useStore.getState();
    expect(state.nodes).toEqual([]);
    expect(state.edges).toEqual([]);
  });

  it('should handle authentication logic correctly', () => {
    const { login } = useStore.getState();
    login('ADMIN_SECRET_KEY');
    
    expect(useStore.getState().isAuthenticated).toBe(true);
    expect(useStore.getState().user.role).toBe('admin');
  });

  it('should update graph data correctly', () => {
    const { setGraphData } = useStore.getState();
    const mockNodes = [{ id: '1', risk: 0.1 }];
    const mockEdges = [{ id: 'e1', from: '1', to: '2' }];
    
    setGraphData(mockNodes, mockEdges);
    
    expect(useStore.getState().nodes).toHaveLength(1);
    expect(useStore.getState().edges).toHaveLength(1);
  });
});
