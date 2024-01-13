"use server";
// Server Actions
import { OpenAIClient, AzureKeyCredential, ChatRequestMessage } from "@azure/openai";
import makeQ from "~/prompts/makeQ.json"
const endpoint = process.env.AZURE_OPENAI_ENDPOINT!;
const azureApiKey = process.env.AZURE_OPENAI_KEY!;

export async function makeQuestion(level: GameLevel) {
  return new Promise<string | null | undefined>(async (resolve) => {
    const client = new OpenAIClient(
      endpoint,
      new AzureKeyCredential(azureApiKey),
      {
        apiVersion: "2023-05-15"
      }
    );
    const prompt = makeQ[level] as ChatRequestMessage[];
      
    const deploymentName = "GPT35TURBO16K";
    const result = await client.getChatCompletions(deploymentName, prompt);

    resolve(result.choices[0].message?.content)
  })
}