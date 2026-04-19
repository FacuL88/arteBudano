import { array } from './provider';
import { cart } from './cart.js';

export function renderArtDetail(artId) {
    const main = document.getElementById('mainId');
    const artwork = array.find(item => item.id === parseInt(artId));
    
    if (!artwork) {
        main.innerHTML = `
            <div class='container' style='padding: var(--space-xl) 0; text-align: center;'>
                <h1>Obra no encontrada</h1>
                <button class='btn' onclick="window.history.back()">Volver</button>
            </div>
        `;
        return;
    }

    main.innerHTML = `
        <div class='container' style='padding: var(--space-xl) 0;'>
            <button class='btn btn-secondary mb-lg' onclick="window.history.back()">Volver</button>
            
            <div style='display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-xl); align-items: start;'>
                <div>
                    <img src='${artwork.img}' alt='${artwork.name}' style='width: 100%; border-radius: var(--radius-md); border: 1px solid var(--border);'>
                </div>
                
                <div>
                    <h1 style='margin-bottom: var(--space-md);'>${artwork.name}</h1>
                    
                    <div style='display: flex; flex-direction: column; gap: var(--space-xs); margin-bottom: var(--space-lg);'>
                        <div style='display: flex; justify-content: space-between; padding: var(--space-xs) 0; border-bottom: 1px solid var(--border);'>
                            <strong>Medidas:</strong>
                            <span>${artwork.medidas}</span>
                        </div>
                        <div style='display: flex; justify-content: space-between; padding: var(--space-xs) 0; border-bottom: 1px solid var(--border);'>
                            <strong>Técnica:</strong>
                            <span>${artwork.tecnica}</span>
                        </div>
                        <div style='display: flex; justify-content: space-between; padding: var(--space-xs) 0; border-bottom: 1px solid var(--border);'>
                            <strong>Año:</strong>
                            <span>${artwork.año}</span>
                        </div>
                        <div style='display: flex; justify-content: space-between; padding: var(--space-xs) 0; border-bottom: 1px solid var(--border);'>
                            <strong>Precio:</strong>
                            <span style='font-size: 1.25rem; font-weight: 600;'>${cart.formatPrice(artwork.price)}</span>
                        </div>
                        <div style='display: flex; justify-content: space-between; padding: var(--space-xs) 0;'>
                            <strong>Disponibilidad:</strong>
                            <span>${artwork.stock > 0 ? `${artwork.stock} disponible` : 'Agotado'}</span>
                        </div>
                    </div>
                    
                    <div style='margin-bottom: var(--space-lg);'>
                        <h3 style='margin-bottom: var(--space-sm);'>Descripción</h3>
                        <p style='color: var(--text-medium); line-height: 1.6;'>${artwork.description}</p>
                    </div>
                    
                    <div style='display: flex; gap: var(--space-sm);'>
                        ${artwork.stock > 0 ? `
                            <button class='btn' onclick="addToCart(${artwork.id})" style='flex: 1;'>Agregar al Carrito</button>
                        ` : `
                            <button class='btn' disabled style='flex: 1;'>Agotado</button>
                        `}
                    </div>
                </div>
            </div>
            
            <div style='margin-top: var(--space-xl); padding-top: var(--space-xl); border-top: 1px solid var(--border);'>
                <h2 style='text-align: center; margin-bottom: var(--space-lg);'>Obras Relacionadas</h2>
                <div style='display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-md);'>
                    ${array.filter(item => item.id !== artwork.id).slice(0, 3).map(item => `
                        <div style='text-align: center; cursor: pointer;' onclick='showArtDetail(${item.id})'>
                            <img src='${item.img}' alt='${item.name}' style='width: 100%; height: 150px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: var(--space-sm);'>
                            <h4 style='margin-bottom: var(--space-xs);'>${item.name}</h4>
                            <p style='color: var(--text-medium);'>${cart.formatPrice(item.price)}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    window.addToCart = (productId) => {
        const product = array.find(item => item.id === productId);
        if (product && product.stock > 0) {
            cart.addItem(product);
            const btn = document.querySelector(`button[onclick="addToCart(${productId})"]`);
            if (btn) {
                btn.textContent = 'Agregado';
                btn.disabled = true;
                setTimeout(() => {
                    btn.textContent = 'Agregar al Carrito';
                    btn.disabled = false;
                }, 2000);
            }
        }
    };
}
