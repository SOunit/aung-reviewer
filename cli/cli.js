import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { reviewDiff } from './review.js';

// from script command line: node cli/cli.js
const args = process.argv.slice(2); // ["develop...main"]
const range = args[0] || ''; // fallback to empty (→ `git diff`)
const gitDiffCommand = `git diff ${range}`;

exec(gitDiffCommand, async (error, stdout, stderr) => {
  if (error) {
    console.error(`Error running git diff: ${error.message}`);
    return;
  }

  const diffText = stdout;
  const review = await reviewDiff(diffText);

  const outputPath = path.resolve('../client/public/result.json');
  fs.writeFileSync(outputPath, JSON.stringify(review, null, 2), 'utf-8');

  console.log(`✅ Review result saved to: ${outputPath}`);
});
