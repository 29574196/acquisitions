import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.status(200).send('Hello from Acquisitions!');
})

export default app;