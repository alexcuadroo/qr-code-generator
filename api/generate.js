const qrcode = require('qrcode');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { text, size, color, backgroundColor } = req.body;

        if (!text) return res.status(400).json({ error: 'Texto o URL es requerido' });

        try {
            const qrCode = await qrcode.toDataURL(text, {
                width: size || 200,
                color: {
                    dark: color || '#000000',  // Color del QR (por defecto negro)
                    light: backgroundColor || '#ffffff'  // Color de fondo (por defecto blanco)
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