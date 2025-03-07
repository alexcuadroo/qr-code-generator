const qrcode = require('qrcode');
const cors = require('cors');
const allowedOrigins = ['http://localhost:3000', 'https://eduhistoria.vercel.app'];

app.use(cors({
    origin: allowedOrigins,
    methods: ['POST'],
    allowedHeaders: ['Content-Type']
}));
module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { text, size, color, backgroundColor } = req.body;

        if (!text) return res.status(400).json({ error: 'Texto o URL es requerido' });

        try {
            const qrCode = await qrcode.toDataURL(text, {
                width: size || 200,
                color: {
                    dark: color || '#000000',
                    light: backgroundColor || '#ffffff'
                }
            });
            res.status(200).json({ qrCode });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al generar el QR' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
};