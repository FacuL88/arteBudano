import express from 'express';
import cors from 'cors';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const app = express();
app.use(cors());
app.use(express.json());

// Configura Mercado Pago con tu access token
// Deberás reemplazar 'TEST_ACCESS_TOKEN' con tu token real de Mercado Pago
const client = new MercadoPagoConfig({
    accessToken: 'TEST_ACCESS_TOKEN' // Reemplaza con tu token de producción o prueba
});

app.post('/create-mercadopago-preference', async (req, res) => {
    try {
        const { items, total, customer } = req.body;
        
        // Crea los items para Mercado Pago
        const mpItems = items.map(item => ({
            id: item.id.toString(),
            title: item.name,
            description: `Obra: ${item.name} - ${item.medidas} - ${item.tecnica}`,
            quantity: item.quantity,
            unit_price: item.price,
            currency_id: 'ARS',
            picture_url: item.img
        }));

        // Configura la preferencia de pago
        const preference = new Preference(client);
        
        const preferenceData = {
            items: mpItems,
            payer: {
                name: customer.name,
                email: customer.email,
                phone: {
                    number: customer.phone
                },
                address: {
                    street_name: customer.address,
                    zip_code: '0000'
                }
            },
            back_urls: {
                success: `${req.protocol}://${req.get('host')}/payment-success`,
                failure: `${req.protocol}://${req.get('host')}/payment-failure`,
                pending: `${req.protocol}://${req.get('host')}/payment-pending`
            },
            auto_return: 'approved',
            external_reference: `order_${Date.now()}`,
            notification_url: `${req.protocol}://${req.get('host')}/webhook/mercadopago`,
            statement_descriptor: 'Gonzalo Budano - Galería de Arte',
            expires: true,
            expiration_date_from: new Date().toISOString(),
            expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 horas
        };

        const result = await preference.create({ body: preferenceData });
        
        res.json({
            init_point: result.init_point,
            preference_id: result.id
        });

    } catch (error) {
        console.error('Error creating Mercado Pago preference:', error);
        res.status(500).json({
            error: 'Error creating payment preference',
            message: error.message
        });
    }
});

// Rutas para manejar las respuestas de Mercado Pago
app.get('/payment-success', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Pago Exitoso</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                .success { color: #27ae60; font-size: 2em; }
                .info { margin: 20px 0; }
                .btn { 
                    background: #8b7355; color: white; padding: 10px 20px; 
                    text-decoration: none; border-radius: 5px; display: inline-block;
                }
            </style>
        </head>
        <body>
            <div class="success">¡Pago Exitoso!</div>
            <div class="info">Tu pedido ha sido procesado correctamente.</div>
            <div class="info">Recibirás un email con los detalles de tu compra.</div>
            <a href="/" class="btn">Volver a la Galería</a>
        </body>
        </html>
    `);
});

app.get('/payment-failure', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Pago Fallido</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                .failure { color: #e74c3c; font-size: 2em; }
                .info { margin: 20px 0; }
                .btn { 
                    background: #8b7355; color: white; padding: 10px 20px; 
                    text-decoration: none; border-radius: 5px; display: inline-block;
                }
            </style>
        </head>
        <body>
            <div class="failure">Pago Fallido</div>
            <div class="info">Hubo un problema con tu pago. Por favor, intenta nuevamente.</div>
            <a href="/" class="btn">Volver a la Galería</a>
        </body>
        </html>
    `);
});

app.get('/payment-pending', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Pago Pendiente</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                .pending { color: #f39c12; font-size: 2em; }
                .info { margin: 20px 0; }
                .btn { 
                    background: #8b7355; color: white; padding: 10px 20px; 
                    text-decoration: none; border-radius: 5px; display: inline-block;
                }
            </style>
        </head>
        <body>
            <div class="pending">Pago Pendiente</div>
            <div class="info">Tu pago está siendo procesado. Recibirás una confirmación por email.</div>
            <a href="/" class="btn">Volver a la Galería</a>
        </body>
        </html>
    `);
});

// Webhook para recibir notificaciones de Mercado Pago
app.post('/webhook/mercadopago', (req, res) => {
    const notification = req.body;
    console.log('Notificación recibida de Mercado Pago:', notification);
    
    // Aquí puedes procesar la notificación y actualizar el estado del pedido
    // Por ejemplo, enviar un email de confirmación, actualizar la base de datos, etc.
    
    res.status(200).send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
    console.log(`Para usar Mercado Pago, configura tu ACCESS_TOKEN en server.js`);
});
