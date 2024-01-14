"use server";
// Server Actions
import {
  OpenAIClient,
  AzureKeyCredential,
  ChatRequestMessage,
} from "@azure/openai";
import makeQ from "~/prompts/makeQ.json";
import modelAnswer from "~/prompts/modelAnswer.json";
import scoring from "~/prompts/scoring.json";
const endpoint = process.env.AZURE_OPENAI_ENDPOINT!;
const azureApiKey = process.env.AZURE_OPENAI_KEY!;

export async function makeQuestion(level: GameLevel) {
  return new Promise<string>(async (resolve, reject) => {
    const client = new OpenAIClient(
      endpoint,
      new AzureKeyCredential(azureApiKey),
      {
        apiVersion: "2023-05-15",
      },
    );
    const prompt = makeQ[level].english as ChatRequestMessage[];

    const deploymentName = "GPT35TURBO16K";
    const res = await client.getChatCompletions(deploymentName, prompt);
    const result = res.choices[0].message?.content;
    if (result) resolve(result);
    reject("error");
  });
}

export async function makeModelAnswer(question: string) {
  return new Promise<string>(async (resolve, reject) => {
    const client = new OpenAIClient(
      endpoint,
      new AzureKeyCredential(azureApiKey),
      {
        apiVersion: "2023-05-15",
      },
    );
    const prompt = modelAnswer.english as ChatRequestMessage[];
    prompt[1].content = `question: ${question}`;

    const deploymentName = "GPT35TURBO16K";
    const res = await client.getChatCompletions(deploymentName, prompt);
    const result = res.choices[0].message?.content;
    if (result) resolve(result);
    reject("error");
  });
}

export async function makeScoring(question: string, answer: string) {
  return new Promise<string>(async (resolve, reject) => {
    const client = new OpenAIClient(
      endpoint,
      new AzureKeyCredential(azureApiKey),
      {
        apiVersion: "2023-05-15",
      },
    );
    const prompt = scoring.english as ChatRequestMessage[];
    prompt[1].content = `question: ${question}\n\nanswer: ${answer}`;

    const deploymentName = "GPT35TURBO16K";
    const res = await client.getChatCompletions(deploymentName, prompt);
    const result = res.choices[0].message?.content;
    if (result) resolve(result);
    reject("error");
  });
}
