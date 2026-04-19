# Galería de Arte - Gonzalo Budano

Una galería de arte online con sistema de e-commerce integrado con Mercado Pago.

## Características

- **Catálogo de obras**: Galería interactiva con detalles de cada pintura
- **Carrito de compras**: Sistema completo de gestión de carrito con persistencia local
- **Pasarela de pago**: Integración con Mercado Pago para procesar pagos seguros
- **Diseño elegante**: Estética sofisticada apropiada para una galería de arte
- **Responsive**: Diseño adaptable a todos los dispositivos

## Tecnologías Utilizadas

- **Frontend**: Vanilla JavaScript, Vite, CSS3
- **Backend**: Node.js, Express
- **Pagos**: Mercado Pago API
- **Estilos**: CSS Grid, Flexbox, Animaciones CSS
- **Fuentes**: Google Fonts (Playfair Display, Montserrat)

## Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd arte
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar Mercado Pago**
   - Abre el archivo `server.js`
   - Reemplaza `'TEST_ACCESS_TOKEN'` con tu token de acceso de Mercado Pago
   - Para desarrollo, puedes usar un token de prueba de [Mercado Pago Developers](https://www.mercadopago.com.ar/developers)

## Ejecución

### Modo Desarrollo
```bash
# Iniciar el frontend
npm run dev

# Iniciar el backend (en otra terminal)
npm run server
```

### Modo Producción
```bash
# Construir el frontend
npm run build

# Iniciar el servidor de producción
npm run server
```

## Estructura del Proyecto

```
arte/
src/
  views/           # Componentes y vistas
    provider.js    # Datos de las obras
    cart.js        # Lógica del carrito
    render*.js     # Renderizado de vistas
  styles/          # Archivos CSS
    *.css          # Estilos por componente
  images/          # Imágenes de las obras
server.js          # Backend y API de Mercado Pago
```

## Configuración de Mercado Pago

1. **Crear cuenta de desarrollador** en [Mercado Pago Developers](https://www.mercadopago.com.ar/developers)

2. **Obtener Access Token**:
   - Ve a la sección "Credenciales"
   - Copia tu Access Token de prueba o producción

3. **Configurar URLs de retorno**:
   - Success: `http://localhost:3000/payment-success`
   - Failure: `http://localhost:3000/payment-failure`
   - Pending: `http://localhost:3000/payment-pending`

## Funcionalidades

### Galería de Arte
- Vista grid de todas las obras
- Filtros por técnica, año, tamaño
- Vista detallada de cada obra
- Información completa: precio, medidas, técnica, año

### Carrito de Compras
- Agregar/eliminar obras
- Modificar cantidades
- Cálculo automático de totales
- Persistencia en localStorage

### Proceso de Compra
- Formulario de datos del cliente
- Resumen del pedido
- Redirección a Mercado Pago
- Páginas de confirmación de pago

## Personalización

### Agregar Nuevas Obras
Edita `src/views/provider.js`:

```javascript
{
    id: 15,
    name: 'Nueva Obra',
    medidas: '60X60cm',
    tecnica: 'óleo',
    año: '2024',
    img: image_15,
    price: 300000,
    stock: 1,
    description: 'Descripción de la obra...'
}
```

### Modificar Estilos
- Colores principales: Edita variables en `src/app.css`
- Fuentes: Modifica imports de Google Fonts
- Layout: Ajusta archivos CSS específicos en `src/styles/`

## Variables de Ambiente

```bash
# Opcional: para producción
PORT=3000
MERCADO_PAGO_ACCESS_TOKEN=your_token_here
NODE_ENV=production
```

## Deploy

### GitHub Pages (Frontend only)
```bash
npm run build
npm run deploy
```

### Producción Completa
- Deploy del backend en Vercel, Heroku o similar
- Configurar variables de ambiente
- Actualizar URLs de Mercado Pago

## Soporte

Para problemas o preguntas:
- Verificar configuración de Mercado Pago
- Revisar consola del navegador
- Chequear logs del servidor

## Licencia

© Gonzalo Budano - Galería de Arte
