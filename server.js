const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const generate = require('./api/generate.js');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/generate', generate);

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});