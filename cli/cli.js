#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import open from 'open'; // npm install open --save-dev
import waitOn from 'wait-on';
import { exec, spawn } from 'child_process';
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
  const parsedReview = typeof review === 'string' ? JSON.parse(review) : review;

  console.log({ review, parsedReview });

  const outputPath = path.resolve('./client/public/result.json');
  fs.writeFileSync(outputPath, JSON.stringify(parsedReview, null, 2), 'utf-8');

  console.log(`✅ Review result saved to: ${outputPath}`);

  const clientProcess = spawn('npm', ['run', 'dev'], {
    cwd: path.resolve('./client'), // client/ディレクトリで実行する
    stdio: 'inherit', // 子プロセスの出力をそのままコンソールに表示
    shell: true, // Windows対応のため shell: true をつける
  });

  clientProcess.on('close', (code) => {
    console.log(`Client exited with code ${code}`);
  });

  // 🌟 サーバー起動を検知してからブラウザを開く！
  waitOn({
    resources: ['http://localhost:3000/review'],
    timeout: 60000, // 最大60秒待つ
    interval: 1000, // 1秒ごとにチェック
  })
    .then(() => {
      console.log('🌐 Server is ready. Opening browser...');
      open('http://localhost:3000/review');
    })
    .catch((err) => {
      console.error('❌ Timeout waiting for server to be ready.', err);
    });
});
