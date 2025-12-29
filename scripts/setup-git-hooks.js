#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const gitHooksDir = path.join(__dirname, '..', '.git', 'hooks');
const preCommitHook = path.join(gitHooksDir, 'pre-commit');

// Check if .git directory exists
const gitDir = path.join(__dirname, '..', '.git');
if (!fs.existsSync(gitDir)) {
  console.log('No .git directory found. Skipping git hook setup.');
  process.exit(0);
}

// Create hooks directory if it doesn't exist
if (!fs.existsSync(gitHooksDir)) {
  fs.mkdirSync(gitHooksDir, { recursive: true });
}

// Create pre-commit hook
const hookContent = `#!/bin/sh
# Auto-update lastUpdated in package.json before commit
node scripts/update-last-updated.js
git add package.json
`;

fs.writeFileSync(preCommitHook, hookContent, 'utf8');

// Make it executable
fs.chmodSync(preCommitHook, '755');

console.log('✓ Git pre-commit hook installed successfully');

