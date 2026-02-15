#!/usr/bin/env node

const chalk = require('chalk');
const { execSync } = require('child_process');
const fs = require('fs');

function archiveRepo(repo) {
  console.log(chalk.blue(`\n📦 Archiving ${repo}...`));
  try {
    execSync(`gh repo clone yksanjo/${repo} backups/${repo}`, { encoding: 'utf8' });
    console.log(chalk.green(`✅ Archived: ${repo}`));
  } catch (e) {
    console.log(chalk.red(`❌ Failed: ${repo}`));
  }
}

function listBackups() {
  console.log(chalk.blue('\n📁 Existing backups:'));
  try {
    const backups = fs.readdirSync('backups');
    backups.forEach(b => console.log(`  - ${b}`));
  } catch (e) {
    console.log('No backups yet');
  }
}

async function main() {
  console.log(chalk.cyan('\n📦 Repo Archiver v1.0.0\n'));
  
  if (!fs.existsSync('backups')) {
    fs.mkdirSync('backups');
  }
  
  console.log('Options:');
  console.log('  1. Archive a repo');
  console.log('  2. List backups');
  
  console.log(chalk.yellow('\nRun with repo name: node src/index.js <repo-name>'));
}

if (require.main === module) main().catch(console.error);
module.exports = { main };
