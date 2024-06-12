import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { RunnableSequence } from "@langchain/core/runnables";
import { formatDocumentsAsString } from "langchain/util/document";

const TEMPLATE = `
jawab semua pertanyaan berikut ini dengan baik dan benar dalam bahasa indonesia yang baik hanya dengan menggunakan context yang diberikan.
bila menjawab pertanyaan yang tidak sesuai dengan context yang diberikan, respon dengan "maaf, pertanyaan tidak sesuai dengan context yang diberikan"
CONTEXT: {context}
user : {question}
`


const loader = new JSONLoader('./employee.json',
[
  "/nama", 
  "/divisi",
  "/role",
  "/gaji",
  "/status",
  "/hobby"
]
); 
const docs = await loader.load();



const prompt = PromptTemplate.fromTemplate(TEMPLATE);

const chatModel = new ChatOllama({
  baseUrl: "http://localhost:11434",
  model: "llama3",
  temperature: 0
});

const parser = new StringOutputParser();
const chain = RunnableSequence.from([
  {
    question: (input) => input.question,
    context:() => formatDocumentsAsString(docs),
  },
  prompt,
  chatModel,
  parser
]);

const response = await chain.invoke({
    question: "siapa karyawan yang memiliki hobi dengan aktifitas air",
  });

console.log("response = ", response)