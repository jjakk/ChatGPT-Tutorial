// A express server, which will handle api requests coming in and respond back with a json object, it will use body parser as well as cors

const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;
require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
    const { message } = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `
            You are a console terminal, answer as if you are receiving commands from a user.
            > ${message}
            # 
        `,
        max_tokens: 100,
        temperature: 0
    });

    if(response.data.choices[0].text){
        res.json({ message: response.data.choices[0].text });
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});