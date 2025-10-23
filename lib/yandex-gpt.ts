import { z } from 'zod';

const YANDEX_GPT_URL = 'https://llm.api.cloud.yandex.net/foundationModels/v1/completion';

const categorizationPrompt = `
Classify the following transaction as either 'personal' or 'business' based on the description.
Provide only the category name in lowercase.

Transaction details:
- Description: {description}
- Amount: {amount}
- Type: {type}

Category:
`;

const responseSchema = z.object({
  result: z.object({
    alternatives: z.array(z.object({
      message: z.object({
        text: z.string(),
      }),
    })),
  }),
});

export async function categorizeTransaction(description: string, amount: number, type: string): Promise<string> {
  const iamToken = process.env.YANDEX_IAM_TOKEN;
  const folderId = process.env.YANDEX_FOLDER_ID;

  if (!iamToken || !folderId) {
    throw new Error('YandexGPT credentials not configured');
  }

  const prompt = categorizationPrompt
    .replace('{description}', description)
    .replace('{amount}', amount.toString())
    .replace('{type}', type);

  const response = await fetch(YANDEX_GPT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${iamToken}`,
    },
    body: JSON.stringify({
      modelUri: `gpt://${folderId}/yandexgpt-lite`,
      completionOptions: {
        stream: false,
        temperature: 0.1,
        maxTokens: 10,
      },
      messages: [
        {
          role: 'user',
          text: prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`YandexGPT API error: ${response.status}`);
  }

  const data = await response.json();
  const validated = responseSchema.parse(data);

  const category = validated.result.alternatives[0]?.message.text.trim().toLowerCase();

  if (!['personal', 'business'].includes(category)) {
    throw new Error(`Invalid category from AI: ${category}`);
  }

  return category;
}
