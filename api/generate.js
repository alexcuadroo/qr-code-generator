const qrcode = require('qrcode');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { text, size } = req.body;

        if (!text) return res.status(400).json({ error: 'Texto o URL es requerido' });

        try {
            // Generar el QR code
            const qrCode = await qrcode.toDataURL(text, { width: size || 200 });
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