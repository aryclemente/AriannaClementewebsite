#!/usr/bin/env node
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const cfg = path.join(root, 'tailwind.config.cjs');
const input1 = path.join(root, 'src', 'input.css');
const input2 = path.join(root, 'input.css');
const out = path.join(root, 'dist', '_tailwind_diagnose.css');

function exists(p) { try { return fs.existsSync(p); } catch { return false; } }

console.log('\nTailwind Diagnostic — starting checks\n');

const issues = [];

if (!exists(cfg)) {
  issues.push('- Missing tailwind.config.cjs');
} else {
  try {
    require(cfg);
    console.log('✔ Loaded tailwind.config.cjs');
  } catch (err) {
    issues.push(`- Error loading tailwind.config.cjs: ${err.message}`);
  }
}

let input = null;
if (exists(input1)) input = input1;
else if (exists(input2)) input = input2;
else issues.push('- Missing input CSS (expected src/input.css or input.css)');

if (!exists(path.join(root, 'dist'))) {
  try { fs.mkdirSync(path.join(root, 'dist')); console.log('✔ Created dist/'); } catch (e) { issues.push('- Cannot create dist/: ' + e.message); }
}

if (issues.length) {
  console.log('Pre-check problems detected:');
  issues.forEach(i => console.log(i));
}

if (!input) {
  console.error('\nAborting: no valid input CSS found.');
  process.exit(2);
}

console.log(`\nRunning Tailwind CLI to compile ${path.relative(root, input)} → ${path.relative(root, out)} (temporary)`);

const cmd = `npx --yes tailwindcss -i "${input}" -o "${out}" --minify`;

exec(cmd, { cwd: root, env: process.env, windowsHide: true }, (err, stdout, stderr) => {
  if (stdout) console.log(stdout.trim());
  if (err) {
    console.error('\n✖ Tailwind CLI reported errors:');
    console.error((stderr || err.message).trim());
    process.exitCode = 3;
    return;
  }

  try {
    const stat = fs.statSync(out);
    console.log(`\n✔ Tailwind compiled successfully — ${stat.size} bytes written to ${path.relative(root, out)}`);
    // quick heuristics to detect unprocessed theme tokens (e.g., var(--...)) or suspicious custom classes
    const body = fs.readFileSync(out, 'utf8');
    const hasVars = /var\(--[a-z0-9-]+\)/i.test(body);
    if (hasVars) console.log('ℹ Found CSS variables in compiled output (may be intentional).');

    // cleanup
    try { fs.unlinkSync(out); console.log('✔ Removed temporary output file'); } catch (e) { console.warn('⚠ Could not remove temporary output:', e.message); }

    if (issues.length) process.exitCode = 1;
    else process.exitCode = 0;
  } catch (e) {
    console.error('⚠ Could not read diagnostic output:', e.message);
    process.exitCode = 4;
  }
});
