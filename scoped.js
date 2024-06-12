import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Document } from "@langchain/core/documents";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";


const chatModel = new ChatOllama({
  baseUrl: "http://localhost:11434",
  model: "llama3"
});

const prompt = ChatPromptTemplate.fromTemplate(`Kamu sangat fasih berbahasa indonesia dengan sangat baik.Tidak menjawab diluar dari context yang diberikan.
<context>
{context}
</context>

Question: {input}`);

const documentChain = await createStuffDocumentsChain({
  llm: chatModel,
  prompt,
});

const response = await documentChain.invoke({
  input: "siapa karyawan yang gacor di Telkomsel?",
  context: [
    new Document({
      pageContent:
        `Telkomsel memiliki layanan telekomunikasi seluler yang beroperasi di Indonesia. 
        Sampai dengan tahun 2024 Telkomsel memiliki 7 direktorat yang dipimpin oleh Nugroho (Nugi) sebagai direktur utama, mengantikan Direktur utama sebelumnya Hendri Mulya Syam Pada Mei 2024.
        berikut adalah direktorat yang ada di Telkomsel:
        
        1. Direktorat Network dipimpin oleh Indra Mardiatna
        2. Direktorat Sales dipimpin oleh Adiwinahyu Basuki Sigit
        3. Direktorat Marketing dipimpin oleh Derrick Heng
        4. Direktorat Planning and Transformation dipimpin oleh Wong Soon Nam
        5. Direktorat Finance and Strategy dipimpin oleh Daru Mulyawan
        6. Direktorat IT dipimpin oleh Joyce Shia
        7. Direktorat Human Capital Management dipimpin oleh Indrawan Dita Pradana

        Tflyer adalah sebutan untuk karyawan yang bekerja di Telkomsel. Setiap pertemuan yang diadakan oleh Telkomsel, biasanya diawali dengan sapaan Semangat Pagi dan dijawab dengan PAGI PAGI PAGI!!!".
        Telkomsel juga memiliki pekerja yang gacor pada salah satu subdir di IT, dia bernama Desto
        `
    }),
  ],
});


console.log("response = ", response)

