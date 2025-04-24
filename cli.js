#!/usr/bin/env node
import { exec } from 'child_process';
import axios from 'axios';

exec('git diff', async (err, stdout, stderr) => {
  if (err) {
    console.error('❌ git diff error:', err);
    return;
  }

  const diff = stdout;

  try {
    const response = await axios.post('http://localhost:3001/review', { diff });
    console.log('📋 AI Review:');
    console.log(response.data.review);
  } catch (error) {
    console.error('❌ Failed to send diff:', error.message);
  }
});
