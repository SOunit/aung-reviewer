// review.js
import openai from './openai.js';

export async function reviewDiff(diffText) {
  const prompt = `
You are a senior software engineer. Please review the following git diff and return structured feedback as a JSON array.

Each item in the array must include:
- "title": A short title for the review item (in Japanese)
- "change": A short description of the change (optional, in Japanese)
- "feedback": A detailed explanation of the review comment (in Japanese)
- "suggestion": A concrete suggestion on how to improve or fix the issue (in Japanese)
- "type": Either "Positive" or "Negative" based on the feedback:
  - If there are no particular issues or the changes are good, set "type" to "Positive".
  - If there are problems, issues, or points of improvement, set "type" to "Negative".

Important:
- Return only **pure JSON** without any extra text.
- Do not wrap the JSON in code block markers (like \`\`\`json or \`\`\`).
- Do not add any summary, greeting, or explanation.
- Respond with raw JSON only.

Here is the git diff:

${diffText}
`;

  const response = await openai.chat.completions.create({
    // model: 'gpt-4',
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
  });

  return response.choices[0].message.content.trim();
}
