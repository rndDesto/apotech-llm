const callLocalAPI = async() => {
    const axios = require('axios');
    const response = await axios.post('http://localhost:11434/api/chat', {
        model: "llama3",
        messages: [
            { role: "user", content: "apakah kamu tau perusahaan telkomsel?" }
        ],
        temperature: 0.7,
        max_tokens: -1,
        stream: false
    }, {
        headers: {
            'Content-Type': 'application/json'
        },
        responseType: 'stream'
    });

    response.data.on('data', (chunk) => {
        if (!chunk) return;
        const chunkStr = chunk.toString().trim();
        const data = JSON.parse(chunkStr);
        process.stdout.write(data.message.content);
        
    });

    response.data.on('end', () => {
        console.log('\nResponse stream ended.');
    });
}

async function run() {
    await callLocalAPI();
}

run().catch(console.error);

