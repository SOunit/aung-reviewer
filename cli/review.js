// review.js
import openai from './openai.js';

export async function reviewDiff(diffText) {
  const prompt = `
You are a senior software engineer. Please review the following git diff and return structured feedback as a JSON array.

Each item in the array should include:
- "title": A short title for the review item (in Japanese)
- "change": A short description of the change (optional, in Japanese)
- "feedback": A detailed explanation of the review comment (in Japanese)

Only include review items if you find improvements or problems in the code.  
If the code looks fine and there is nothing to improve, return an empty array: []

Return only valid JSON. Do not include any summary, compliments, or markdown. No extra text.

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
