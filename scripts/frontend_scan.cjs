/**
 * KUBERA TRACE — Frontend Static Analysis Scanner
 * Scans for data-flow bugs, dead code, and common anti-patterns.
 * Run with: node scripts/frontend_scan.js
 */
const fs = require('fs');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, '..', 'src');
const issues = [];
let filesScanned = 0;

// Pattern catalog
const PATTERNS = [
  {
    id: 'DOUBLE_UNWRAP',
    pattern: /response\.data/g,
    context: /api\.(get|post|put|delete)/,
    message: 'Potential double-unwrap: api interceptor already strips to response.data',
    severity: 'ERROR'
  },
  {
    id: 'CONSOLE_LOG',
    pattern: /console\.(log|debug|warn)\(/g,
    message: 'Debug statement left in production code',
    severity: 'WARN',
    exclude: ['kafkaSimulator.js'] // Intentional for simulator
  },
  {
    id: 'TOFIXED_STRING',
    pattern: /\.toFixed\(\d+\)\s*[^)]/g,
    context: /score|amount|risk/i,
    message: 'toFixed() returns a string — may cause silent type coercion bugs in numeric comparisons',
    severity: 'WARN'
  },
  {
    id: 'UNUSED_DESTRUCTURE',
    pattern: /const\s*\{[^}]*\}\s*=\s*useStore\(\)/g,
    message: 'Full store destructure may cause unnecessary re-renders — prefer selector pattern',
    severity: 'WARN'
  },
  {
    id: 'MISSING_ERROR_BOUNDARY',
    pattern: /useEffect\(\s*\(\)\s*=>\s*\{[^}]*fetch|axios|api\./g,
    message: 'Async call in useEffect without error boundary or try/catch',
    severity: 'INFO'
  }
];

function scanFile(filePath) {
  const ext = path.extname(filePath);
  if (!['.js', '.jsx', '.ts', '.tsx'].includes(ext)) return;

  const content = fs.readFileSync(filePath, 'utf-8');
  const relativePath = path.relative(SRC_DIR, filePath);
  filesScanned++;

  const lines = content.split('\n');

  PATTERNS.forEach(rule => {
    if (rule.exclude && rule.exclude.some(e => filePath.includes(e))) return;

    lines.forEach((line, i) => {
      const trimmed = line.trim();
      // Skip comment lines
      if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) return;

      // Strip inline comments before matching
      const codeOnly = trimmed.replace(/\/\/.*$/, '').replace(/\/\*.*?\*\//g, '');
      const match = codeOnly.match(rule.pattern);
      if (match) {
        if (rule.context && !content.match(rule.context)) return;
        issues.push({
          file: relativePath,
          line: i + 1,
          severity: rule.severity,
          id: rule.id,
          message: rule.message,
          snippet: line.trim().substring(0, 80)
        });
      }
    });
  });
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      walkDir(fullPath);
    } else {
      scanFile(fullPath);
    }
  }
}

// Main
console.log('╔══════════════════════════════════════════════════╗');
console.log('║  KUBERA TRACE — Frontend Static Analysis Scan   ║');
console.log('╚══════════════════════════════════════════════════╝\n');

walkDir(SRC_DIR);

const errors = issues.filter(i => i.severity === 'ERROR');
const warns = issues.filter(i => i.severity === 'WARN');
const infos = issues.filter(i => i.severity === 'INFO');

console.log(`Files Scanned: ${filesScanned}`);
console.log(`Issues Found:  ${issues.length} (${errors.length} errors, ${warns.length} warnings, ${infos.length} info)\n`);

if (errors.length > 0) {
  console.log('── ERRORS ──────────────────────────────────────────');
  errors.forEach(e => {
    console.log(`  ❌ ${e.file}:${e.line} [${e.id}]`);
    console.log(`     ${e.message}`);
    console.log(`     > ${e.snippet}\n`);
  });
}

if (warns.length > 0) {
  console.log('── WARNINGS ────────────────────────────────────────');
  warns.forEach(w => {
    console.log(`  ⚠️  ${w.file}:${w.line} [${w.id}]`);
    console.log(`     ${w.message}`);
    console.log(`     > ${w.snippet}\n`);
  });
}

if (errors.length > 0) {
  console.log('RESULT: FAIL — Critical data-flow issues detected.');
  process.exit(1);
} else {
  console.log('RESULT: PASS — No critical data-flow issues.');
  process.exit(0);
}
