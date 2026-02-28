import { create } from 'zustand';

const useStore = create((set, get) => ({
  // Graph Data
  nodes: [],
  edges: [],
  
  // Selection State
  selectedNode: null,
  selectedEdge: null,
  selectedTracePath: null,
  
  // Analytics
  transactions: [],
  riskScore: 0,
  riskReasons: [],
  
  // Clustering State
  isClustered: false,
  clusterBy: 'bank', // 'bank' | 'country'
  
  // Auth State
  user: null, // { role: 'admin' | 'user', apiKey: string }
  isAuthenticated: false,
  
  // Loading & Global States
  loading: false,
  error: null,
  
  // Actions
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  setGraphData: (nodes, edges) => set({ nodes, edges }),
  
  selectNode: (nodeId) => {
    const node = get().nodes.find(n => n.id === nodeId);
    set({ selectedNode: node, selectedEdge: null });
  },
  
  selectEdge: (edgeId) => {
    const edge = get().edges.find(e => e.id === edgeId);
    set({ selectedEdge: edge, selectedNode: null });
  },
  
  setTracePath: (path, riskScore, riskReasons) => set({ 
    selectedTracePath: path,
    riskScore,
    riskReasons
  }),
  
  setClustering: (active, by = 'bank') => set({ isClustered: active, clusterBy: by }),
  
  login: (apiKey) => {
    // Demo logic: keys starting with 'ADMIN_' are admin roles
    const role = apiKey.startsWith('ADMIN_') ? 'admin' : 'user';
    set({ user: { role, apiKey }, isAuthenticated: true });
  },
  
  logout: () => set({ user: null, isAuthenticated: false }),
  
  // Cases Slice
  cases: [
    { id: 'CASE_101', title: 'Suspicious High-Velocity Layering', status: 'open', analyst: 'Analyst_Alpha', txIds: ['TX_482'], createdAt: new Date().toISOString() }
  ],
  addCase: (newCase) => set((state) => ({ 
    cases: [...state.cases, { ...newCase, id: `CASE_${Math.floor(Math.random() * 10000)}`, createdAt: new Date().toISOString() }] 
  })),
  updateCaseStatus: (id, status) => set((state) => ({
    cases: state.cases.map(c => c.id === id ? { ...c, status } : c)
  })),
  addCommentToCase: (id, comment) => set((state) => ({
    cases: state.cases.map(c => c.id === id ? { ...c, comments: [...(c.comments || []), comment] } : c)
  })),

  // Snapshots & Comparison
  snapshots: [],
  saveSnapshot: (name) => set((state) => ({
    snapshots: [...state.snapshots, { 
      id: `SNAP_${Date.now()}`, 
      name, 
      nodes: state.nodes, 
      edges: state.edges, 
      timestamp: new Date().toISOString() 
    }]
  })),
  comparePaths: null, // { left: Snapshot, right: Snapshot }
  setComparison: (left, right) => set({ comparePaths: { left, right } }),

  // Audit Slice
  auditLogs: [],
  addAuditRow: (action, resourceId, metadata = {}) => set((state) => ({
    auditLogs: [{ 
      id: `AUDIT_${Date.now()}`, 
      timestamp: new Date().toISOString(), 
      actor: state.user?.apiKey || 'System',
      action, 
      resourceId,
      metadata 
    }, ...state.auditLogs].slice(0, 100) // Keep last 100
  })),

  resetSelection: () => set({ 
    selectedNode: null, 
    selectedEdge: null, 
    selectedTracePath: null 
  }),
}));

export default useStore;
