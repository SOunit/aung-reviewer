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

  // 今はコンソールに出力（次でブラウザに送る）
  console.log('\n=== AI REVIEW ===\n');
  console.log(review);
});
