const express = require('express');
const { OpenAI } = require('openai');
const readline = require('readline');
require('dotenv').config();

const app = express();
const openai = new OpenAI(process.env.OPENAI_API_KEY);

app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const { input } = req.body;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Specify the desired model
      messages: [{
        role: 'user',
        content: input,
      }],
    });

    res.json({ response: response.choices[0].message.content });
    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});