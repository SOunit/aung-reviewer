// review.js
import openai from './openai.js';

export async function reviewDiff(diffText) {
  const prompt = `
You are a senior software engineer. Please review the following git diff and provide detailed feedback for each change:

${diffText}

Only include review comments. Do not repeat the code.
  `;

  const response = await openai.chat.completions.create({
    // model: 'gpt-4',
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
  });

  return response.choices[0].message.content.trim();
}
