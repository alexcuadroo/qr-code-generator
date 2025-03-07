import qrcode from 'qrcode';
export default async function handler(req, res) {
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', 'https://eduhistoria.vercel.app');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(204).end(); // Finaliza el preflight sin contenido
    }

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

    return res.status(405).json({ error: 'Método no permitido' });
}
