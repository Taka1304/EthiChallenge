import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];
const azureApiKey = process.env["AZURE_OPENAI_KEY"];

const prompt = ["When was Microsoft founded?"];

// TODO: 疎通確認
// TODO: プロンプトを受け取る
// TODO: プロンプトを返す
export default async function OpenAIHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log("== Get completions Sample ==");
  if (!endpoint || !azureApiKey) {
    console.error("Missing endpoint or API key");
    return;
  }
  const client = new OpenAIClient(
    endpoint,
    new AzureKeyCredential(azureApiKey),
  );
  const deploymentId = "gpt-35-turbo";
  const result = await client.getCompletions(deploymentId, prompt);

  for (const choice of result.choices) {
    console.log(choice.text);
  }
}
