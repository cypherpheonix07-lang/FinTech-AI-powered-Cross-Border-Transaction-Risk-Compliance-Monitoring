# Supabase Integration Guide for TransactTrace-Nexus
# This file documents how to connect the backend to Supabase

## Step 1: Create Supabase Project
# Go to https://supabase.com and create a new project
# Save the following credentials:
# - Project URL: https://<project-ref>.supabase.co
# - Anon (public) key: eyJ...
# - Service role key: eyJ... (NEVER expose to frontend)
# - Database URL: postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres

## Step 2: Update Backend .env
# Replace DATABASE_URL with Supabase connection string:
# DATABASE_URL=postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres

## Step 3: Run Prisma Migrate
# npx prisma migrate deploy

## Step 4: Enable Row Level Security (RLS)
# In Supabase SQL Editor, run:
#
# ALTER TABLE "Transaction" ENABLE ROW LEVEL SECURITY;
# ALTER TABLE "Escalation" ENABLE ROW LEVEL SECURITY;
# ALTER TABLE "ComplianceReport" ENABLE ROW LEVEL SECURITY;
# ALTER TABLE "AuditLog" ENABLE ROW LEVEL SECURITY;
#
# CREATE POLICY "tenant_isolation" ON "Transaction"
#   USING ("tenantId" = current_setting('app.tenant_id', true));
#
# CREATE POLICY "tenant_isolation" ON "Escalation"
#   USING ("tenantId" = current_setting('app.tenant_id', true));
#
# CREATE POLICY "tenant_isolation" ON "ComplianceReport"
#   USING ("tenantId" = current_setting('app.tenant_id', true));

## Step 5: Supabase Realtime (Optional)
# Subscribe to transaction inserts for real-time ML scoring:
#
# const channel = supabase.channel('transactions')
#   .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'Transaction' },
#     (payload) => triggerMLScoring(payload.new))
#   .subscribe();

## Step 6: Supabase Storage for Reports
# Store SAR/STR PDFs in Supabase Storage:
# supabase.storage.from('compliance-reports').upload(`${reportId}.pdf`, pdfBuffer);

## Environment Variables for Supabase
# SUPABASE_URL=https://<ref>.supabase.co
# SUPABASE_ANON_KEY=eyJ...
# SUPABASE_SERVICE_ROLE_KEY=eyJ... (backend only)
# DATABASE_URL=postgresql://... (Supabase pooler connection)
