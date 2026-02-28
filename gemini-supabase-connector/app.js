// app.js
import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

async function ensureTableExists() {
  try {
    const testInsert = await supabase
      .from('gemini_test')
      .insert([{ message: 'init-check' }])
      .select('*')
      .limit(1);
    
    if (testInsert.error) {
      console.warn('Insert error:', testInsert.error);
      throw testInsert.error;
    }
    console.log('Table already exists (insert succeeded).');
    return true;
  } catch (err) {
    console.warn('Table gemini_test may be missing. Create it using the SQL shown below in Supabase SQL editor:');
    const createSQL = `
CREATE TABLE IF NOT EXISTS public.gemini_test (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);`;
    console.log('---- SQL to run in Supabase SQL editor ----');
    console.log(createSQL);
    return false;
  }
}

async function insertAndSelect() {
  const insert = await supabase
    .from('gemini_test')
    .insert([{ message: 'Hello from Gemini Flash agent' }])
    .select('*')
    .limit(1);
  
  if (insert.error) {
    console.error('Insert error:', insert.error);
  } else {
    console.log('Insert result:', insert.data);
  }

  const { data, error } = await supabase
    .from('gemini_test')
    .select('*')
    .order('id', { ascending: false })
    .limit(5);
  
  if (error) {
    console.error('Select error:', error);
  } else {
    console.log('Latest rows:', data);
  }
}

async function main() {
  console.log('Starting Supabase connection test...');
  const exists = await ensureTableExists();
  if (exists) {
    await insertAndSelect();
  } else {
    console.log('Table not present. Please run the CREATE TABLE SQL in Supabase SQL editor, then redeploy or restart the service.');
  }
  console.log('Test complete. Exiting.');
  process.exit(0);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
