const qrcode = require('qrcode');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { url } = req.body;
        if (!url) return res.status(400).json({ error: 'URL es requerida' });

        try {
            const qrCode = await qrcode.toDataURL(url);
            res.status(200).json({ qrCode });
        } catch (err) {
            res.status(500).json({ error: 'Error al generar el QR' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
}
