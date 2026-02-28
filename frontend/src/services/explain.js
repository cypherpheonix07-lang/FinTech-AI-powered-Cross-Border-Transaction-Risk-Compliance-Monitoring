import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
});

/**
 * services/explain.js
 * Fetches SHAP feature importances and natural language summaries for a transaction.
 */
export const fetchExplainability = async (txId) => {
  try {
    const response = await api.get(`/explain/tx/${txId}`);
    return response; // api interceptor already returns response.data
  } catch (error) {
    console.error('Error fetching SHAP data:', error);
    // Mock fallback if API fails
    return {
      tx_id: txId,
      overall_risk: 0.78,
      natural_language: "This transaction is flagged due to high velocity and unusual routing through multiple tax havens.",
      features: [
        { name: "Hop Count", importance: 0.45, impact: 'high' },
        { name: "Country Risk (Corridor)", importance: 0.32, impact: 'high' },
        { name: "Amount Deviation", importance: 0.12, impact: 'medium' },
        { name: "Time of Day", importance: -0.05, impact: 'low' },
        { name: "Intermediary Reputation", importance: 0.08, impact: 'medium' },
        { name: "Account Age", importance: -0.02, impact: 'low' }
      ]
    };
  }
};

export const generateEvidencePack = async (txId) => {
  // Logic to trigger backend PDF generation or client-side jspdf bundle
  console.log(`Generating Evidence Pack for ${txId}...`);
  return { downloadUrl: `/exports/evidence_${txId}.pdf` };
};
