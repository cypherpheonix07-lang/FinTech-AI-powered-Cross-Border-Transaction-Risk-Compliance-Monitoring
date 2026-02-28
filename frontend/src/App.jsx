import React from 'react';
import AppRouter from './app/router';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <AppRouter />
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#0f172a',
            color: '#fff',
            border: '1px solid #1e293b',
            borderRadius: '12px',
            fontSize: '12px'
          }
        }}
      />
    </div>
  );
}

export default App;
