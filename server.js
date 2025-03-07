const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors({
    origin: 'https://historia.edualex.uy',
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));
// Manejar preflight (OPTIONS)
app.options('/api/generate', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.sendStatus(204);
});
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/generate', require('./api/generate.js'));
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});