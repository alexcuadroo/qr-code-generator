const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const cors = require('cors');
const generate = require('./api/generate.js');
const qrcode = require('qrcode');
app.use(cors({
    origin: 'https://historia.edualex.uy',
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/generate', generate);
// Endpoint específico para Server B
app.post('/api/qr', async (req, res) => {
    const { text, size, color, backgroundColor } = req.body;

    // Validación del campo "text"
    if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'El campo "text" es requerido y debe ser una cadena de texto.' });
    }

    try {
        // Generar el QR
        const qrCode = await qrcode.toDataURL(text, {
            width: size || 200,
            color: {
                dark: color || '#000000',
                light: backgroundColor || '#ffffff'
            }
        });

        // Respuesta exitosa
        res.status(200).json({ qrCode, message: 'QR generado exitosamente.' });
    } catch (err) {
        console.error('Error en /api/qr:', err);
        res.status(500).json({ error: 'Error interno del servidor al generar el QR.' });
    }
});

// Manejar preflight (OPTIONS)
app.options('/api/qr', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.sendStatus(204);
});
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});