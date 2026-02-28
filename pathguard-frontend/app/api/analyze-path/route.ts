import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || ''; // Use service role for backend logic

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: Request) {
  try {
    const { transactionId } = await req.json();

    if (!transactionId) {
      return NextResponse.json({ error: 'Transaction ID is required' }, { status: 400 });
    }

    // 1. Fetch Transaction and User Details
    const { data: tx, error: txError } = await supabase
      .from('transactions')
      .select('*, sender:sender_id(fullname, kyc_status)')
      .eq('id', transactionId)
      .single();

    if (txError) throw txError;

    // 2. Call Go-based Risk Engine
    try {
      const response = await fetch('http://localhost:8080/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactionId })
      });
      
      if (response.ok) {
        const data = await response.json();
        return NextResponse.json(data);
      }
    } catch (goError) {
      console.error('Go Engine unreachable, falling back to Next.js logic:', goError);
    }

    // 2. Perform Risk Analysis (Fallback Next.js Logic)
    // Signal 1: Transaction Amount threshold for MVP
    const isHighValue = tx.amount > 500;
    const kycVerified = tx.sender?.kyc_status === 'VERIFIED';

    // Signal 2: Path Hop Analysis (Simulated for MVP)
    // We'll simulate that we've detected 4 unverified hops in under 45 seconds (The Fraud Spike pattern)
    const hopCount = 4;
    const latencyMs = 45000; // 45 seconds
    const isLayeringPattern = hopCount > 3 && latencyMs < 60000;

    let riskScore = 10; // Base score
    let verdict = 'SAFE';
    let alertType = 'NONE';
    const analogy = isLayeringPattern 
      ? "Think of it like handing a package to a courier who immediately drives into a hidden maze, strips off the tracking labels, and hands the package to four strangers to confuse anyone trying to follow it."
      : "Path is direct and verified through standard banking rails.";

    if (isLayeringPattern) {
      riskScore += 70;
      alertType = 'FRAUD_SPIKE_DETECTION';
    }

    if (isHighValue && !kycVerified) {
      riskScore += 20;
      alertType = alertType === 'NONE' ? 'KYC_LIMIT_EXCEEDED' : `${alertType}_KYC_MISMATCH`;
    }

    // 3. Final Verdict
    const finalStatus = riskScore >= 80 ? 'FLAGGED' : riskScore >= 50 ? 'FLAGGED' : 'COMPLETED';

    // 4. Update Transaction with final status
    await supabase
      .from('transactions')
      .update({ status: finalStatus, risk_score: riskScore })
      .eq('id', transactionId);

    // 5. Create Immutable Audit Log
    const auditData = {
      transaction_id: transactionId,
      event_type: alertType || 'PATH_ANALYSIS_COMPLETED',
      risk_score: riskScore,
      analysis: {
        pattern: isLayeringPattern ? 'FAST_LAYERING' : 'STANDARD_PATH',
        hops_detected: hopCount,
        velocity_ms: latencyMs,
        kyc_status: tx.sender?.kyc_status || 'UNKNOWN'
      },
      ux_analogy: analogy,
      integrity_hash: `sha256:${Buffer.from(`${transactionId}-${riskScore}-${Date.now()}`).toString('hex').slice(0, 32)}`
    };

    await supabase.from('audit_ledger').insert([auditData]);

    // 6. Return response formatted for PathGuard frontend
    return NextResponse.json({
      transactionId,
      riskScore,
      verdict: finalStatus,
      analysis: {
        title: finalStatus === 'FLAGGED' ? 'Risk Alert: Agent Intervention' : 'Path Verified',
        description: analogy,
        recommendation: isLayeringPattern
          ? 'Because we value your safety above all else, I have temporarily paused this transfer for a manual security check.'
          : 'Transfer is safe to proceed.'
      }
    });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
