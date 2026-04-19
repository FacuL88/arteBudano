import { cart } from './cart.js';

export function renderCart() {
    console.log('renderCart called');
    const main = document.getElementById('mainId');
    console.log('main element:', main);

    main.innerHTML = `
        <div class='container' style='padding: calc(var(--space-xl) + 80px) var(--space-md) var(--space-xl);'>
            <div class='cart-header'>
                <h1>Carrito de Compras</h1>
                <p class='cart-subtitle'>Las obras seleccionadas para tu colección</p>
            </div>
            
            <div class='cart-content'>
                <div class='cart-items' id='cart-items'>
                    ${cart.items.length === 0 ? 
                        '<div class="cart-empty"><p>Tu carrito está vacío</p><button class="btn btn-secondary" onclick="window.location.href=\'#gallery\'">Explorar Galería</button></div>' : 
                        renderCartItems()
                    }
                </div>
                
                ${cart.items.length > 0 ? `
                    <div class='cart-summary'>
                        <div class='cart-total'>
                            <h3>Total: <span id="cart-total">${cart.formatPrice(cart.getTotal())}</span></h3>
                        </div>
                        <div class='cart-actions'>
                            <button class='btn btn-secondary' onclick="clearCart()">Vaciar Carrito</button>
                            <button class='btn' onclick="completePurchase()">Comprar</button>
                        </div>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
    
    if (cart.items.length > 0) {
        setupCartEventListeners();
    }
}

function generatePurchaseToken() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return `TKN-${timestamp}-${random}`.toUpperCase();
}

function completePurchase() {
    const purchaseToken = generatePurchaseToken();
    const purchaseData = {
        token: purchaseToken,
        items: cart.items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
        })),
        total: cart.getTotal(),
        date: new Date().toISOString()
    };
    
    // Guardar en localStorage como registro de compra
    const purchases = JSON.parse(localStorage.getItem('artGalleryPurchases') || '[]');
    purchases.push(purchaseData);
    localStorage.setItem('artGalleryPurchases', JSON.stringify(purchases));
    
    // Mostrar mensaje de éxito
    const main = document.getElementById('mainId');
    main.innerHTML = `
        <div class='container' style='padding: calc(var(--space-xl) + 80px) var(--space-md) var(--space-xl);'>
            <div class='purchase-success'>
                <div class='success-icon'>¡</div>
                <h1>¡Compra Exitosa!</h1>
                <p class='success-message'>Gracias por tu compra. Tu orden ha sido procesada exitosamente.</p>
                
                <div class='purchase-details'>
                    <h3>Detalles de la Compra</h3>
                    <div class='detail-item'>
                        <strong>Token de Compra:</strong>
                        <span class='purchase-token'>${purchaseToken}</span>
                    </div>
                    <div class='detail-item'>
                        <strong>Total Pagado:</strong>
                        <span>${cart.formatPrice(cart.getTotal())}</span>
                    </div>
                    <div class='detail-item'>
                        <strong>Fecha:</strong>
                        <span>${new Date().toLocaleDateString('es-AR', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</span>
                    </div>
                    <div class='detail-item'>
                        <strong>Obras Adquiridas:</strong>
                        <span>${cart.items.length} obra(s)</span>
                    </div>
                </div>
                
                <div class='purchase-actions'>
                    <button class='btn' onclick="window.location.href='#gallery'">Seguir Comprando</button>
                    <button class='btn btn-secondary' onclick="window.location.href='#home'">Volver al Inicio</button>
                </div>
            </div>
        </div>
    `;
    
    // Vaciar el carrito después de la compra
    cart.clearCart();
    cart.updateCartUI();
}

function renderCartItems() {
    return cart.items.map(item => `
        <div class='cart-item' data-id='${item.id}'>
            <div class='cart-item-image'>
                <img src='${item.img}' alt='${item.name}'>
            </div>
            <div class='cart-item-details'>
                <h4>${item.name}</h4>
                <p><b>Medidas:</b> ${item.medidas}</p>
                <p><b>Técnica:</b> ${item.tecnica}</p>
                <p><b>Año:</b> ${item.año}</p>
                <p><b>Precio:</b> ${cart.formatPrice(item.price)}</p>
            </div>
            <div class='cart-item-controls'>
                <div class='quantity-controls'>
                    <button class='btn-quantity' onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span class='quantity'>${item.quantity}</span>
                    <button class='btn-quantity' onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <button class='btn-remove' onclick="removeFromCart(${item.id})">Eliminar</button>
            </div>
        </div>
    `).join('');
}

function setupCartEventListeners() {
    window.updateQuantity = (productId, quantity) => {
        if (quantity > 0) {
            cart.updateQuantity(productId, quantity);
            refreshCartView();
        }
    };

    window.removeFromCart = (productId) => {
        cart.removeItem(productId);
        refreshCartView();
    };

    window.clearCart = () => {
        if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
            cart.clear();
            refreshCartView();
        }
    };

    window.proceedToCheckout = () => {
        if (cart.items.length > 0) {
            renderCheckout();
        }
    };
}

function refreshCartView() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (cart.items.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">Tu carrito está vacío</p>';
        document.querySelector('.cart__summary').style.display = 'none';
    } else {
        cartItems.innerHTML = renderCartItems();
        document.querySelector('.cart__summary').style.display = 'block';
        if (cartTotal) {
            cartTotal.textContent = cart.formatPrice(cart.getTotal());
        }
    }
}

function renderCheckout() {
    const main = document.getElementById('mainId');
    main.innerHTML = `
        <div class='container__checkout'>
            <div class='container__title'>
                <span class="letra">P</span>
                <span class="letra">a</span>
                <span class="letra">g</span>
                <span class="letra">o</span>
            </div>
            <div class='checkout__content'>
                <div class='checkout__summary'>
                    <h3>Resumen del Pedido</h3>
                    ${cart.items.map(item => `
                        <div class='checkout-item'>
                            <span>${item.name} x${item.quantity}</span>
                            <span>${cart.formatPrice(item.price * item.quantity)}</span>
                        </div>
                    `).join('')}
                    <div class='checkout-total'>
                        <strong>Total: ${cart.formatPrice(cart.getTotal())}</strong>
                    </div>
                </div>
                <div class='checkout__form'>
                    <h3>Datos de Contacto</h3>
                    <form id='checkout-form'>
                        <div class='form-group'>
                            <label for='name'>Nombre Completo</label>
                            <input type='text' id='name' name='name' required>
                        </div>
                        <div class='form-group'>
                            <label for='email'>Email</label>
                            <input type='email' id='email' name='email' required>
                        </div>
                        <div class='form-group'>
                            <label for='phone'>Teléfono</label>
                            <input type='tel' id='phone' name='phone' required>
                        </div>
                        <div class='form-group'>
                            <label for='address'>Dirección de Envío</label>
                            <textarea id='address' name='address' rows='3' required></textarea>
                        </div>
                        <button type='submit' class='btn-mercadopago'>Pagar con Mercado Pago</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    setupCheckoutForm();
}

function setupCheckoutForm() {
    const form = document.getElementById('checkout-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const orderData = {
            items: cart.items,
            total: cart.getTotal(),
            customer: {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                address: formData.get('address')
            }
        };
        
        try {
            await processMercadoPagoPayment(orderData);
        } catch (error) {
            console.error('Error processing payment:', error);
            alert('Hubo un error al procesar el pago. Por favor, intenta nuevamente.');
        }
    });
}

async function processMercadoPagoPayment(orderData) {
    try {
        const response = await fetch('/create-mercadopago-preference', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });
        
        if (!response.ok) {
            throw new Error('Failed to create payment preference');
        }
        
        const data = await response.json();
        
        if (data.init_point) {
            window.location.href = data.init_point;
        } else {
            throw new Error('No payment URL received');
        }
    } catch (error) {
        console.error('Mercado Pago error:', error);
        throw error;
    }
}
