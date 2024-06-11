import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";



const chatModel = new ChatOllama({
  baseUrl: "http://localhost:11434", // Default value
  model: "llama3"
});

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "kamu sangat mahir berbahasa indonesia, semua response akan dijawab dengan bahasa indonesia yang baik."],
  ["user", "{input}"],
]);

const outputParser = new StringOutputParser();

const llmChain = prompt.pipe(chatModel).pipe(outputParser);

const response = await llmChain.invoke({
  input: "berapa luas negara indonesia?",
});

console.log("response = ", response)