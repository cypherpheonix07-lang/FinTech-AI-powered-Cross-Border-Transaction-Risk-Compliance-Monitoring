import React, { useState } from 'react';
import { Users, Trophy, Zap, Target, Star, Plus, TrendingUp } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 21 & 22: SOCIAL BANKING DASHBOARD — Group Pots + Gamification
// ─────────────────────────────────────────────────────────────────────────────

const leaderboard = [
  { rank: 1, alias: 'SavingsHero_99', savedThisMonth: 1200, badge: '🏆 Gold' },
  { rank: 2, alias: 'BudgetMaster_42', savedThisMonth: 980, badge: '🥈 Silver' },
  { rank: 3, alias: 'FrugalPhoenix', savedThisMonth: 750, badge: '🥉 Bronze' },
  { rank: 4, alias: 'You', savedThisMonth: 620, badge: '⭐ Rising' },
];

const quests = [
  { id: 'Q1', title: 'No Spend Weekend', xp: 150, status: 'IN_PROGRESS', deadline: 'Mar 16' },
  { id: 'Q2', title: 'Save $500 in 30 Days', xp: 500, status: 'NOT_STARTED', deadline: 'Apr 10' },
  { id: 'Q3', title: 'Set 3 Budget Alerts', xp: 75, status: 'COMPLETED', deadline: 'Mar 12' },
];

const pots = [
  { id: 'P1', name: '🏖️ Bali Trip Fund', goal: 3000, current: 1840, members: 4 },
  { id: 'P2', name: '🎄 Holiday Gifts', goal: 500, current: 200, members: 2 },
];

const statusColor: Record<string, string> = {
  IN_PROGRESS: '#3b82f6',
  COMPLETED: '#10b981',
  NOT_STARTED: '#6b7280',
};

export default function SocialBankingDashboard() {
  const [activeTab, setActiveTab] = useState<'pots' | 'leaderboard' | 'quests'>('pots');

  return (
    <div style={{ padding: '2rem', background: '#0f172a', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#f472b6', marginBottom: '0.25rem' }}>
          <Users style={{ display: 'inline', marginRight: '0.5rem' }} size={28} />
          Social Banking
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Save together. Win together. Sections 21 & 22 — CORTEX-ENHANCED.</p>
      </div>

      {/* XP Bar */}
      <div style={{ background: '#1e293b', borderRadius: '1rem', padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid #334155' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{ fontWeight: 600 }}><Zap size={16} style={{ display: 'inline', color: '#fbbf24' }} /> Level 12 — BudgetWarrior</span>
          <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>2,450 / 3,000 XP</span>
        </div>
        <div style={{ background: '#0f172a', borderRadius: '9999px', height: '10px', overflow: 'hidden' }}>
          <div style={{ width: '81.6%', height: '100%', background: 'linear-gradient(90deg, #f472b6, #a855f7)', borderRadius: '9999px' }} />
        </div>
        <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['🔥 7-Day Streak', '💰 Millionaire Mindset', '📊 Budget Boss'].map(b => (
            <span key={b} style={{ background: '#0f172a', border: '1px solid #334155', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.75rem' }}>{b}</span>
          ))}
        </div>
      </div>

      {/* Tab Nav */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {(['pots', 'leaderboard', 'quests'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            style={{
              padding: '0.5rem 1.25rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem',
              background: activeTab === tab ? 'linear-gradient(135deg, #f472b6, #a855f7)' : '#1e293b',
              color: activeTab === tab ? '#fff' : '#94a3b8',
            }}>
            {tab === 'pots' ? '💰 Group Pots' : tab === 'leaderboard' ? '🏆 Leaderboard' : '⚔️ Quests'}
          </button>
        ))}
      </div>

      {/* Group Pots */}
      {activeTab === 'pots' && (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {pots.map(pot => {
            const pct = (pot.current / pot.goal) * 100;
            return (
              <div key={pot.id} style={{ background: '#1e293b', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #334155' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div>
                    <h3 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{pot.name}</h3>
                    <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}><Users size={12} style={{ display: 'inline' }} /> {pot.members} members</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#10b981', fontWeight: 700 }}>${pot.current.toLocaleString()}</div>
                    <div style={{ color: '#64748b', fontSize: '0.75rem' }}>of ${pot.goal.toLocaleString()}</div>
                  </div>
                </div>
                <div style={{ background: '#0f172a', borderRadius: '9999px', height: '8px', overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #3b82f6)', borderRadius: '9999px', transition: 'width 0.5s ease' }} />
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.5rem' }}>{pct.toFixed(1)}% funded</div>
              </div>
            );
          })}
          <button style={{ background: 'transparent', border: '2px dashed #334155', borderRadius: '1rem', padding: '1.25rem', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Plus size={18} /> Create New Pot
          </button>
        </div>
      )}

      {/* Leaderboard */}
      {activeTab === 'leaderboard' && (
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {leaderboard.map(entry => (
            <div key={entry.rank} style={{
              background: entry.alias === 'You' ? 'linear-gradient(135deg, rgba(244,114,182,0.1), rgba(168,85,247,0.1))' : '#1e293b',
              border: entry.alias === 'You' ? '1px solid #f472b6' : '1px solid #334155',
              borderRadius: '0.75rem', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem',
            }}>
              <div style={{ width: '2rem', textAlign: 'center', fontSize: '1.25rem' }}>
                {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : `#${entry.rank}`}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{entry.alias}</div>
                <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{entry.badge}</div>
              </div>
              <div style={{ color: '#10b981', fontWeight: 700 }}>+${entry.savedThisMonth.toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}

      {/* Quests */}
      {activeTab === 'quests' && (
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {quests.map(quest => (
            <div key={quest.id} style={{ background: '#1e293b', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{quest.title}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Deadline: {quest.deadline}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#fbbf24', fontWeight: 700 }}>+{quest.xp} XP</div>
                <div style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '9999px', background: statusColor[quest.status] + '22', color: statusColor[quest.status], marginTop: '0.25rem' }}>
                  {quest.status.replace('_', ' ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
