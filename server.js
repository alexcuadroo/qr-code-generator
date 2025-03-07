const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const cors = require('cors');
const allowedOrigins = ['http://localhost:4000', 'https://eduhistoria.vercel.app'];
app.use(cors({
    origin: allowedOrigins,
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));
app.options('/api/generate', cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/generate', require('./api/generate.js'));
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});