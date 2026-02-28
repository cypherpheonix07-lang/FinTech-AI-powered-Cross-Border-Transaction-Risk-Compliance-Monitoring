import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, Loader2, Check } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { toast } from 'react-hot-toast';

const ExportPanel = ({ data, pathId }) => {
  const [loading, setLoading] = useState(false);

  const exportPDF = async () => {
    setLoading(true);
    try {
      const doc = new jsPDF();
      
      // Add Brand Header
      doc.setFillColor(15, 23, 42); // #0f172a
      doc.rect(0, 0, 210, 40, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.text('KUBERA TRACE', 14, 25);
      doc.setFontSize(10);
      doc.text('FINANCIAL INTELLIGENCE FORENSIC REPORT', 14, 32);

      // Metadata
      doc.setTextColor(50, 50, 50);
      doc.setFontSize(12);
      doc.text(`Path ID: ${pathId || 'N/A'}`, 14, 50);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 57);
      doc.text(`Overall Risk Level: ${(data.riskScore * 100).toFixed(0)}%`, 14, 64);

      // Table mapping
      const tableRows = data.hops.map((hop, i) => [
        i + 1,
        hop.id,
        hop.bank,
        hop.country,
        `${(hop.risk * 100).toFixed(0)}%`
      ]);

      doc.autoTable({
        startY: 75,
        head: [['Hop', 'Account ID', 'Bank', 'Country', 'Risk']],
        body: tableRows,
        theme: 'grid',
        headStyles: { fillColor: [37, 99, 235] }, // primary
      });

      doc.save(`Kubera_Trace_${pathId || 'Export'}.pdf`);
      toast.success('PDF Generated Successfully');
    } catch (err) {
      toast.error('Failed to generate PDF');
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = () => {
    try {
      const headers = ['Hop', 'Account ID', 'Bank', 'Country', 'Risk'];
      const rows = data.hops.map((hop, i) => [
        i + 1,
        hop.id,
        hop.bank,
        hop.country,
        hop.risk
      ]);

      const csvContent = "data:text/csv;charset=utf-8," 
        + headers.join(",") + "\n"
        + rows.map(e => e.join(",")).join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `Kubera_Trace_${pathId}.csv`);
      document.body.appendChild(link);
      link.click();
      toast.success('CSV Exported Successfully');
    } catch (err) {
      toast.error('CSV Export Failed');
    }
  };

  return (
    <div className="bg-dark-800 rounded-2xl border border-dark-600 p-4 w-full">
      <h4 className="text-xs font-bold text-slate-500 uppercase mb-4 tracking-wider">Export Intelligence</h4>
      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={exportPDF}
          disabled={loading}
          className="flex items-center justify-center space-x-2 bg-dark-700 hover:bg-dark-600 border border-dark-600 text-slate-200 py-3 rounded-xl transition-all"
        >
          {loading ? <Loader2 className="animate-spin" size={16} /> : <FileText size={16} className="text-risk-high" />}
          <span className="text-sm font-bold">PDF Report</span>
        </button>
        <button 
          onClick={exportCSV}
          className="flex items-center justify-center space-x-2 bg-dark-700 hover:bg-dark-600 border border-dark-600 text-slate-200 py-3 rounded-xl transition-all"
        >
          <FileSpreadsheet size={16} className="text-risk-low" />
          <span className="text-sm font-bold">CSV Data</span>
        </button>
      </div>
    </div>
  );
};

export default ExportPanel;
