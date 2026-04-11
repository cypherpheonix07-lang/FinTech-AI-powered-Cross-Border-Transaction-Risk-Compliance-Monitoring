import React from 'react';

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4 animate-in fade-in zoom-in duration-500">
      <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center border border-blue-200 shadow-inner">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        <p className="text-slate-500 max-w-xs mt-2 mx-auto">
          We're currently implementing this section with bank-grade security and advanced analytics. Check back soon.
        </p>
      </div>
      <div className="flex gap-2">
        <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]" />
        <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.15s]" />
        <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" />
      </div>
    </div>
  );
}
