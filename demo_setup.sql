-- DEMO TRANSACTIONS SETUP SCRIPT
-- Project: TransactTrace-Nexus
-- Target: Supabase SQL Editor

-- 1A — Insert single LOW-RISK transaction
with t as (
  select id as tenant_id from public.tenants where slug='democorp' limit 1
),
acct as (
  select id as account_id from public.accounts where account_number='ACCT-1001' and tenant_id = (select tenant_id from t) limit 1
)
insert into public.transactions (tenant_id, account_id, transaction_ref, amount, currency, identifier, sender_country, receiver_country, status)
select t.tenant_id, acct.account_id, 'DEMO-REF-LOW-'||floor(random()*10000), 1200.00, 'USD', 'phone_low_demo', 'IN', 'US', 'approved'
from t cross join acct
returning id as tx_id, amount;

-- 1B — Single HIGH-RISK transaction
with t as (
  select id as tenant_id from public.tenants where slug='democorp' limit 1
),
acct as (
  select id as account_id from public.accounts where account_number='ACCT-1001' and tenant_id = (select tenant_id from t) limit 1
),
ins_tx as (
  insert into public.transactions (tenant_id, account_id, transaction_ref, amount, currency, identifier, sender_country, receiver_country, status)
  select t.tenant_id, acct.account_id, 'DEMO-REF-HIGH-'||floor(random()*10000), 90000.00, 'USD', 'ring_demo_high', 'UK', 'US', 'pending'
  from t cross join acct
  returning id, tenant_id
)
insert into public.risk_results (tenant_id, transaction_id, anomaly_score, supervised_prob, graph_flag, final_risk_score, risk_level, explanation, model_version)
select tenant_id, id, 0.92, 0.85, true, 94, 'HIGH', '{"reasons":["high_amount","graph_flag"]}'::jsonb, 'v-demo-1'
from ins_tx
returning transaction_id;

-- 1C — Burst of 8 random transactions
with t as (
  select id as tenant_id from public.tenants where slug='democorp' limit 1
),
acct as (
  select id as account_id from public.accounts where account_number='ACCT-1001' and tenant_id = (select tenant_id from t) limit 1
),
rand_tx as (
  select
    (select tenant_id from t) as tenant_id,
    (select account_id from acct) as account_id,
    'AUTO-' || floor(random()*1000000)::text as transaction_ref,
    (case when random() < 0.3 then 80000 + floor(random()*50000) else 100 + floor(random()*5000) end)::numeric as amount,
    (case when random() < 0.3 then 'ring_' || floor(random()*1000)::text else 'phone_' || floor(random()*1000)::text end) as identifier,
    (case when random() < 0.5 then 'IN' else 'US' end) as sender_country,
    (case when random() < 0.5 then 'US' else 'GB' end) as receiver_country
  from generate_series(1,8)
),
ins as (
  insert into public.transactions (tenant_id, account_id, transaction_ref, amount, currency, identifier, sender_country, receiver_country, status)
  select tenant_id, account_id, transaction_ref, amount, 'USD', identifier, sender_country, receiver_country, 'pending'
  from rand_tx
  returning id, tenant_id, amount, identifier
)
insert into public.risk_results (tenant_id, transaction_id, anomaly_score, supervised_prob, graph_flag, final_risk_score, risk_level, explanation, model_version)
select
  idata.tenant_id,
  idata.id,
  (case when idata.amount > 50000 then 0.9 else 0.08 end),
  (case when idata.amount > 30000 then 0.78 else 0.15 end),
  (case when idata.identifier like 'ring_%' then true else false end),
  (case when idata.amount > 50000 then 90 else 8 end)::integer,
  (case when idata.amount > 50000 then 'HIGH' else 'LOW' end),
  (case when idata.amount > 50000 then '{"reasons":["high_amount"]}'::jsonb else '{"reasons":["normal"]}'::jsonb end),
  'v-demo-burst'
from ins idata
returning transaction_id, amount, final_risk_score, risk_level;

-- 2A — Verification Query
select 
  t.transaction_ref, t.amount, t.identifier, t.sender_country, t.receiver_country, t.created_at,
  r.final_risk_score, r.risk_level, r.anomaly_score, r.supervised_prob, r.graph_flag
from public.transactions t
left join public.risk_results r on r.transaction_id = t.id
where t.tenant_id = (select id from public.tenants where slug='democorp')
order by t.created_at desc
limit 20;
