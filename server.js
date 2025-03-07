const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const cors = require('cors');
const corsOptions = {
    origin: ['https://eduhistoria.vercel.app', 'http://localhost:4000'],  // Permitir ambos
    methods: 'POST,OPTIONS',
    allowedHeaders: 'Content-Type'
};

app.use(cors(corsOptions));
app.use(express.json());
// Manejar preflight (OPTIONS)
app.options('/api/generate', (req, res) => {
    res.sendStatus(204); // Sin contenido, pero permite la solicitud
});
app.post('/api/generate', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/generate', require('./api/generate.js'));
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});