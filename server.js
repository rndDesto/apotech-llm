import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
// import { StringOutputParser } from "@langchain/core/output_parsers";
import { Document } from "@langchain/core/documents";

import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";



const chatModel = new ChatOllama({
  baseUrl: "http://localhost:11434", // Default value
  model: "llama3"
});

// const prompt = ChatPromptTemplate.fromMessages([
//   ["system", "kamu sangat mahir berbahasa indonesia, semua response akan dijawab dengan bahasa indonesia yang baik."],
//   ["user", "{input}"],
// ]);

// const outputParser = new StringOutputParser();

// const llmChain = prompt.pipe(chatModel).pipe(outputParser);

// const response = await llmChain.invoke({
//   input: "berapa luas negara indonesia?",
// });


const prompt = ChatPromptTemplate.fromTemplate(`Tidak menjawab diluar dari context yang diberikan.
<context>
{context}
</context>

Question: {input}`);

const documentChain = await createStuffDocumentsChain({
  llm: chatModel,
  prompt,
});

const response = await documentChain.invoke({
  input: "berapa 1 + 1?",
  context: [
    new Document({
      pageContent:
        "Tflyers adalah adalah sebutan untuk setiap insan yang menjalankan tugas di perusahaan yang bernama Telkomsel, Salam ketika ingin memulai aktivitas diawali dengan sapaan Semangat Pagi, kemudian Tflyers yang lain akan menjawab Pagi, Pagi, Pagi"
    }),
  ],
});


console.log("response = ", response)

// const callLocalAPI = async() => {
//     const axios = require('axios');
//     const response = await axios.post('http://localhost:11434/api/chat', {
//         model: "llama3",
//         messages: [
//             { role: "user", content: "semangat pagi!!!" }
//         ],
//         temperature: 0.7,
//         max_tokens: -1,
//         stream: false
//     }, {
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         responseType: 'stream'
//     });

//     response.data.on('data', (chunk) => {
//         if (!chunk) return;
//         const chunkStr = chunk.toString().trim();
//         const data = JSON.parse(chunkStr);
//         process.stdout.write(data.message.content);
        
//     });

//     response.data.on('end', () => {
//         console.log('\nResponse stream ended.');
//     });
// }

// async function run() {
//     await callLocalAPI();
// }

// run().catch(console.error);

