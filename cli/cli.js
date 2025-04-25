import { exec } from 'child_process';
import { reviewDiff } from './review.js';

exec('git diff', async (error, stdout, stderr) => {
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
