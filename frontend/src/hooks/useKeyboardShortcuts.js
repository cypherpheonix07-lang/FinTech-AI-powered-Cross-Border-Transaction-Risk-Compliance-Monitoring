import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * hooks/useKeyboardShortcuts.js
 * Global keyboard listener for hotkeys across the platform.
 */
export const useKeyboardShortcuts = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check if user is typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        return;
      }

      const key = e.key.toUpperCase();

      switch (key) {
        case 'T':
          // Navigate to Trace Analysis
          navigate('/trace');
          break;
        case 'D':
          // Navigate to Dashboard
          navigate('/dashboard');
          break;
        case 'E':
          // Navigate to Explorer
          navigate('/explorer');
          break;
        case 'U':
          // Navigate to Upload
          navigate('/upload');
          break;
        case 'R':
          // Navigate to Risk Analytics
          navigate('/risk');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);
};
