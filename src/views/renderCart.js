import { cart } from './cart.js';

export function renderCart() {
    console.log('renderCart called');
    const main = document.getElementById('mainId');
    console.log('main element:', main);

    main.innerHTML = `
        <div class='container' style='padding: calc(var(--space-xl) + 80px) var(--space-md) var(--space-xl);'>
            <div class='cart-header'>
                <h1 class='cart-title'>Mi Colección</h1>
                <p class='cart-subtitle'>Las obras seleccionadas para tu espacio</p>
            </div>
            
            ${cart.items.length === 0 ? 
                renderEmptyCart() : 
                renderCartContent()
            }
        </div>
    `;
    
    if (cart.items.length > 0) {
        setupCartEventListeners();
    }
}

function renderCartContent() {
    return `
        <div class='cart-content'>
            <div class='cart-items-section'>
                <h2 class='section-title'>Obras Seleccionadas</h2>
                <div class='cart-items'>
                    ${cart.items.map(item => renderCartItem(item)).join('')}
                </div>
            </div>
            
            <div class='cart-summary-section'>
                <div class='summary-card'>
                    <h3 class='summary-title'>Resumen de Compra</h3>
                    <div class='summary-details'>
                        <div class='summary-row'>
                            <span class='summary-label'>Subtotal</span>
                            <span class='summary-value'>${cart.formatPrice(cart.getTotal())}</span>
                        </div>
                        <div class='summary-row'>
                            <span class='summary-label'>Envío</span>
                            <span class='summary-value'>A convenir</span>
                        </div>
                        <div class='summary-divider'></div>
                        <div class='summary-row total'>
                            <span class='summary-label'>Total</span>
                            <span class='summary-value total-value' id="cart-total">${cart.formatPrice(cart.getTotal())}</span>
                        </div>
                    </div>
                    <div class='summary-actions'>
                        <button class='btn btn-secondary' onclick="clearCart()">Vaciar Carrito</button>
                        <button class='btn btn-primary' onclick="completePurchase()">Comprar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderCartItem(item) {
    const stockLimit = item.stock || 1;
    return `
        <div class='cart-item' data-id='${item.id}'>
            <div class='item-image'>
                <img src='${item.img}' alt='${item.name}'>
            </div>
            <div class='item-details'>
                <h3 class='item-title'>${item.name}</h3>
                <div class='item-meta'>
                    <div class='meta-item'>
                        <strong>Medidas:</strong>
                        <span>${item.medidas}</span>
                    </div>
                    <div class='meta-item'>
                        <strong>Técnica:</strong>
                        <span>${item.tecnica}</span>
                    </div>
                    <div class='meta-item'>
                        <strong>Año:</strong>
                        <span>${item.año}</span>
                    </div>
                </div>
                <div class='item-price'>${cart.formatPrice(item.price)}</div>
            </div>
            <div class='item-controls'>
                <div class='quantity-control'>
                    <label class='quantity-label'>Cantidad</label>
                    <div class='quantity-buttons'>
                        <button class='quantity-btn minus' onclick="updateQuantity(${item.id}, ${item.quantity - 1})" ${item.quantity <= 1 ? 'disabled' : ''}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M4 8h8" stroke="currentColor" stroke-width="2"/>
                            </svg>
                        </button>
                        <span class='quantity-value'>${item.quantity}</span>
                        <button class='quantity-btn plus' onclick="updateQuantity(${item.id}, ${item.quantity + 1})" ${item.quantity >= stockLimit ? 'disabled' : ''}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 4v8M4 8h8" stroke="currentColor" stroke-width="2"/>
                            </svg>
                        </button>
                    </div>
                    <small class='stock-info'>Stock: ${stockLimit} unidades</small>
                </div>
                <div class='item-total'>
                    <span class='total-label'>Total</span>
                    <span class='total-value'>${cart.formatPrice(item.price * item.quantity)}</span>
                </div>
                <button class='remove-btn' onclick="removeItem(${item.id})" title='Eliminar obra'>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
}

function renderEmptyCart() {
    return `
        <div class='empty-cart'>
            <div class='empty-icon'>Shopping Cart</div>
            <h2 class='empty-title'>Tu carrito está vacío</h2>
            <p class='empty-description'>Explora nuestra galería y descubre obras únicas para tu colección</p>
            <button class='btn btn-primary' onclick="window.location.href='#gallery'">Explorar Galería</button>
        </div>
    `;
}

function renderCartItems() {
    return `
        <div class='cart-items'>
            ${cart.items.map(item => `
                <div class='cart-item' data-id='${item.id}'>
                    <div class='item-image'>
                        <img src='${item.img}' alt='${item.name}'>
                    </div>
                    <div class='item-details'>
                        <h3 class='item-title'>${item.name}</h3>
                        <div class='item-meta'>
                            <span class='item-technique'>${item.tecnica}</span>
                            <span class='item-size'>${item.medidas}</span>
                            <span class='item-year'>${item.año}</span>
                        </div>
                        <div class='item-price'>${cart.formatPrice(item.price)}</div>
                    </div>
                    <div class='item-controls'>
                        <div class='quantity-control'>
                            <button class='quantity-btn minus' onclick="updateQuantity(${item.id}, ${item.quantity - 1})" ${item.quantity <= 1 ? 'disabled' : ''}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M4 8h8"/>
                                </svg>
                            </button>
                            <span class='quantity-value'>${item.quantity}</span>
                            <button class='quantity-btn plus' onclick="updateQuantity(${item.id}, ${item.quantity + 1})">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M8 4v8M4 8h8"/>
                                </svg>
                            </button>
                        </div>
                        <div class='item-total'>
                            ${cart.formatPrice(item.price * item.quantity)}
                        </div>
                        <button class='remove-btn' onclick="removeItem(${item.id})" title='Eliminar obra'>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                            </svg>
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderCartSummary() {
    return `
        <div class='cart-summary'>
            <div class='summary-content'>
                <div class='summary-row'>
                    <span class='summary-label'>Subtotal</span>
                    <span class='summary-value'>${cart.formatPrice(cart.getTotal())}</span>
                </div>
                <div class='summary-row'>
                    <span class='summary-label'>Envío</span>
                    <span class='summary-value'>A convenir</span>
                </div>
                <div class='summary-divider'></div>
                <div class='summary-row total'>
                    <span class='summary-label'>Total</span>
                    <span class='summary-value total-value' id="cart-total">${cart.formatPrice(cart.getTotal())}</span>
                </div>
            </div>
            <div class='summary-actions'>
                <button class='btn btn-secondary' onclick="clearCart()">Vaciar Carrito</button>
                <button class='btn btn-primary' onclick="completePurchase()">Comprar</button>
            </div>
        </div>
    `;
}

function generatePurchaseToken() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return `TKN-${timestamp}-${random}`.toUpperCase();
}

// Funciones globales para controlar el carrito
window.updateQuantity = (productId, newQuantity) => {
    if (newQuantity >= 1) {
        cart.updateQuantity(productId, newQuantity);
        // Recargar el carrito para actualizar la UI
        renderCart();
    }
};

window.removeItem = (productId) => {
    if (confirm('¿Estás seguro de eliminar esta obra de tu colección?')) {
        cart.removeItem(productId);
        renderCart();
    }
};

window.clearCart = () => {
    if (confirm('¿Estás seguro de vaciar toda tu colección?')) {
        cart.clearCart();
        renderCart();
    }
};

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
