import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ShieldAlert, RefreshCcw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[400px] w-full flex-col items-center justify-center p-8 text-center bg-white rounded-[2.5rem] border border-slate-200 shadow-xl">
          <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-3xl flex items-center justify-center mb-6 shadow-lg shadow-rose-600/10">
            <ShieldAlert className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Component Singularity Detected</h2>
          <p className="text-slate-500 max-w-sm mb-8 font-medium">
            A runtime collision occurred while rendering this module. Our AI is attempting to stabilize the environment.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold transition-all hover:bg-slate-800 active:scale-95 shadow-lg shadow-slate-900/20"
            >
              <RefreshCcw className="w-4 h-4" />
              Reset Module
            </button>
            <a
              href="/"
              className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold transition-all hover:bg-slate-50 active:scale-95"
            >
              <Home className="w-4 h-4" />
              Return Home
            </a>
          </div>
          {process.env.NODE_ENV === 'development' && (
             <div className="mt-8 p-4 bg-slate-50 rounded-2xl text-left overflow-auto max-w-full border border-slate-100">
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Technical Details</p>
               <pre className="text-xs text-rose-500 font-mono">{this.state.error?.toString()}</pre>
             </div>
          )}
        </div>
      );
    }

    return this.children;
  }
}
