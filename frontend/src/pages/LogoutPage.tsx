import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store';
import { logout } from '@/store/slices/authSlice';
import { Loader2 } from 'lucide-react';

export default function LogoutPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(logout());
      navigate('/login');
    }, 1500);

    return () => clearTimeout(timer);
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="glass-card p-8 max-w-sm w-full text-center space-y-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto" />
        <h1 className="text-xl font-bold text-foreground">Logging out...</h1>
        <p className="text-sm text-muted-foreground">
          You are being securely signed out of the Risk Monitoring Platform.
        </p>
      </div>
    </div>
  );
}
