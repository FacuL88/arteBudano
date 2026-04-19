# Galería de Arte - Gonzalo Budano

Una galería de arte online con sistema de e-commerce para la compra de obras de arte.

## Características

- **Catálogo de obras**: Galería interactiva con detalles de cada pintura
- **Carrito de compras**: Sistema completo de gestión de carrito con persistencia local
- **Diseño elegante**: Estética sofisticada apropiada para una galería de arte
- **Responsive**: Diseño adaptable a todos los dispositivos

## Tecnologías Utilizadas

- **Frontend**: Vanilla JavaScript, Vite, CSS3
- **Despliegue**: GitHub Pages
- **Almacenamiento**: LocalStorage para persistencia

## Instalación

### Prerrequisitos

- Node.js (v14 o superior)
- npm o yarn

### Pasos

1. Clonar el repositorio:
```bash
git clone <repository-url>
cd arte
```

2. Instalar dependencias:
```bash
npm install
```

3. Ejecutar el proyecto:

**Para desarrollo**:
```bash
npm run dev
```

**Para producción**:
```bash
npm run build
npm run deploy
```

## Estructura del Proyecto

```
arte/
src/
  views/           # Componentes de la aplicación
  styles/          # Estilos CSS
  images/          # Imágenes de las obras
  app.css          # Estilos principales
  main.js          # Punto de entrada
index.html         # Plantilla HTML
package.json       # Dependencias y scripts
```

## Uso

### Navegación
- **Inicio**: Slider con obras destacadas y frases inspiradoras
- **Galería**: Catálogo completo de obras
- **Bio**: Información sobre el artista
- **Contacto**: Datos de contacto y redes sociales
- **Carrito**: Gestión de compras

### Proceso de Compra

1. **Explorar Galería**: Navegar por las obras disponibles
2. **Ver Detalles**: Hacer clic en "Ver obra" para más información
3. **Agregar al Carrito**: Seleccionar obras deseadas
4. **Comprar**: Generar token de compra y confirmación
5. **Confirmación**: Recibir token único y detalles de la compra

## Funcionalidades del Carrito

- Agregar/eliminar obras
- Modificar cantidades
- Calcular total automáticamente
- Persistencia en localStorage
- Generación de tokens de compra únicos

## Tokens de Compra

Cada compra genera un token único con el formato:
```
TKN-1234567890-ABC123
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
