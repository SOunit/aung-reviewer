// review.js
import openai from './openai.js';

export async function reviewDiff(diffText, filesContent = []) {
  const filesPart = filesContent
    .map((file) => `File: ${file.filePath}\n\n${file.content}`)
    .join('\n\n---\n\n');

  const prompt = `
    You are a senior software engineer. Please review the following project files and git diff and return structured feedback as a JSON array.
    
    Each item in the array must include:
    - "filePath": The full path of the file being changed (for example, "src/components/Button.tsx").
    - "fileName": The name of the file being changed (for example, "Button.tsx").
    - "title": A short title for the review item (in Japanese)
    - "change": A short description of the change (optional, in Japanese)
    - "type": Either "Positive" or "Negative" based on the review:
      - If the change has no issues, set "type" to "Positive".
      - If the change has problems or needs improvement, set "type" to "Negative".
    
    Depending on the "type":
    - If the "type" is "Positive":
      - Include a "feedback" field describing the positive aspects of the change (in Japanese).
    - If the "type" is "Negative":
      - Include an "issue" field describing the problem or risk (in Japanese).
      - Include a "suggestion" field providing a specific recommendation for improvement (in Japanese).
    
    Important:
    - Return only **pure JSON** without any extra text.
    - Do not wrap the JSON in code block markers (like \`\`\`json or \`\`\`).
    - Do not add any summary, greeting, or explanation.
    - Respond with raw JSON only.
    
    Here are the related files:
    
    ${filesPart}
    
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
