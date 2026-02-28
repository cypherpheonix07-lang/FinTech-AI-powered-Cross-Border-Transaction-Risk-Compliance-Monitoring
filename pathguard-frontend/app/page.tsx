import PathTracker from "@/components/PathTracker";
import SendMoneyFlow from "@/components/SendMoneyFlow";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="text-center space-y-2">
          <div className="inline-flex items-center px-4 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            Phase 1: State Pilot MVP
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tighter">
            PathGuard <span className="text-blue-600">Protocol</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto text-lg font-medium leading-relaxed">
            Transparent money movement. Verifiable audit trails. 
            Proactive risk management powered by PathGuard Agent.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 px-2">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm">1</span>
              Initiate Secure Transfer
            </h2>
            <SendMoneyFlow />
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 px-2">
              <span className="w-8 h-8 bg-green-600 text-white rounded-lg flex items-center justify-center text-sm">2</span>
              Live Journey Tracker
            </h2>
            <PathTracker />
          </section>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-16 border-t border-gray-200 dark:border-gray-800">
          <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center text-xl mb-4">🛡️</div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Immutable Logs</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Every hop is cryptographically signed and stored in a tamper-proof audit ledger powered by Supabase.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center text-xl mb-4">🧠</div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Agent Simulation</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Our AI agent identifies complex fraud patterns like layering and explains them in simple analogies.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center text-xl mb-4">✨</div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Zero-Trust Hops</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Verify the exact physical and digital path of your funds from sender to recipient in real-time.
            </p>
          </div>
        </section>

        <footer className="pt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800/50 rounded-full">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">
              PathGuard Protocol v0.1 • Connected to Supabase
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
