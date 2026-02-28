import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import { verifyMfaThunk, selectAuth } from '@/store/slices/authSlice';
import { ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { toast } from 'sonner';

export default function MFAChallengePage() {
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { mfaSessionId } = useAppSelector(selectAuth);

  const handleVerify = async () => {
    if (code.length !== 6) {
      toast.error('Please enter the 6-digit verification code');
      return;
    }

    setIsVerifying(true);
    try {
      await dispatch(verifyMfaThunk({ sessionId: mfaSessionId || 'mock-id', code })).unwrap();
      toast.success('Verification successful');
      navigate('/dashboard');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="glass-card p-8 max-w-md w-full space-y-8 animate-fade-in text-center">
        <div className="space-y-2">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Multi-Factor Authentication</h1>
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit code sent to your registered device to verify your identity.
          </p>
        </div>

        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            value={code}
            onChange={(val) => setCode(val)}
            disabled={isVerifying}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleVerify}
            disabled={isVerifying || code.length !== 6}
            className="w-full py-2 bg-primary text-primary-foreground rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isVerifying ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Verify Identity <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
          
          <button
            onClick={() => navigate('/login')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to login
          </button>
        </div>

        <p className="text-xs text-muted-foreground">
          Use the mock code <span className="font-mono text-primary">123456</span> for testing purposes.
        </p>
      </div>
    </div>
  );
}
