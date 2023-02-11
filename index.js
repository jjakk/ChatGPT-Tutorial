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
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Say this is a test",
        maxTokens: 7,
        temperature: 0
    });

    console.log(response);
    res.json({
        message: 'Hello World'
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});