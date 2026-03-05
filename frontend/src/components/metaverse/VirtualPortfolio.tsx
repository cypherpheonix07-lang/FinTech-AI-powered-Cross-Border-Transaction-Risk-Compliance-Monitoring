import React, { useState, useEffect } from 'react';
import { Box, Diamond, ExternalLink, ArrowRightLeft } from 'lucide-react';

const VirtualPortfolio = () => {
  const [portfolio, setPortfolio] = useState<any>(null);

  useEffect(() => {
    // Mocking the Python MetaverseAssetTracker response
    setPortfolio({
      user_id: "user_alita_99",
      total_assets: 2,
      total_value_usd: 15950.00,
      available_collateral_usd: 6200.00,
      platforms_connected: ["Decentraland", "TheSandbox"],
      assets: [
        {
          id: "MVA_001", platform: "Decentraland", type: "RealEstate",
          specs: "Parcel -45,112", value: 15500, collateral: true
        },
        {
          id: "MVA_002", platform: "TheSandbox", type: "Wearable",
          specs: "CyberPunk Jacket 2077", value: 450, collateral: false
        }
      ]
    });
  }, []);

  if (!portfolio) return null;

  return (
    <div className="bg-gradient-to-br from-[#1a0b2e] to-[#0f172a] border border-purple-500/20 rounded-xl p-6 text-slate-200">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Box className="w-8 h-8 text-fuchsia-400" />
            Metaverse Virtual Portfolio
          </h2>
          <p className="text-slate-400 mt-1">Cross-world asset tracking & collateral</p>
        </div>
        <div className="flex -space-x-2">
           {portfolio.platforms_connected.map((p: string, i: number) => (
             <div key={i} className="w-8 h-8 rounded-full border-2 border-[#1a0b2e] bg-purple-900 flex items-center justify-center text-xs font-bold" title={p}>
               {p[0]}
             </div>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-black/40 rounded-xl p-5 border border-purple-500/10 backdrop-blur-sm">
          <p className="text-slate-400 text-sm mb-1">Total Virtual Value</p>
          <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400">
            ${portfolio.total_value_usd.toLocaleString()}
          </p>
        </div>
        <div className="bg-black/40 rounded-xl p-5 border border-emerald-500/10 backdrop-blur-sm">
          <p className="text-slate-400 text-sm mb-1">Eligible Collateral</p>
          <p className="text-3xl font-bold text-emerald-400">
            ${portfolio.available_collateral_usd.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">MINTED ASSETS</h3>
        {portfolio.assets.map((asset: any) => (
          <div key={asset.id} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg border border-slate-700/50 hover:bg-slate-800/50 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-fuchsia-900/30 text-fuchsia-400 rounded-lg group-hover:bg-fuchsia-900/50">
                <Diamond className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-slate-200">{asset.platform} • {asset.type}</p>
                <p className="text-xs text-slate-400">{asset.specs}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-mono font-medium text-slate-300">${asset.value.toLocaleString()}</p>
              {asset.collateral ? (
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-500">Defi Collateral</span>
              ) : (
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Non-Collateral</span>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-6 py-3 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 font-medium flex items-center justify-center gap-2 transition-all">
        <ArrowRightLeft className="w-4 h-4" />
        Bridge Asset to Another Metaverse
      </button>
    </div>
  );
};

export default VirtualPortfolio;
