import { array } from "./provider";
import { renderArtDetail } from "./renderArtDetail";
import { cart } from "./cart";

export function renderGallery() {
  const main = document.getElementById('mainId');
  
  main.innerHTML = `
    <div class='gallery'>
      <div class='gallery-header'>
        <h1 class='gallery-title'>Galería de Arte</h1>
        <p class='gallery-subtitle'>Explora nuestra colección de obras únicas</p>
      </div>
      
      <div class='gallery-grid'>
        ${array.map(item => `
          <div class='artwork-card'>
            <img src='${item.img}' alt='${item.name}' class='artwork-image'>
            <div class='artwork-info'>
              <h3 class='artwork-title'>${item.name}</h3>
              
              <div class='artwork-details'>
                <div class='artwork-detail'>
                  <strong>Medidas:</strong>
                  <span>${item.medidas}</span>
                </div>
                <div class='artwork-detail'>
                  <strong>Técnica:</strong>
                  <span>${item.tecnica}</span>
                </div>
                <div class='artwork-detail'>
                  <strong>Año:</strong>
                  <span>${item.año}</span>
                </div>
              </div>
              
              <div class='artwork-price'>
                ${cart.formatPrice(item.price)}
              </div>
              
              <div class='artwork-actions'>
                <button class='btn' onclick="showArtDetail(${item.id})">Ver obra</button>
                ${item.stock > 0 ? 
                  `<button class='btn btn-secondary' onclick="addToCartFromGallery(${item.id})">Agregar al carrito</button>` :
                  `<button class='btn' disabled>Agotado</button>`
                }
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  window.showArtDetail = (artId) => {
    const main = document.getElementById('mainId');
    main.innerHTML = '';
    renderArtDetail(artId);
  };
  
  window.addToCartFromGallery = (productId) => {
    const product = array.find(item => item.id === productId);
    if (product && product.stock > 0) {
      cart.addItem(product);
      // Mostrar feedback visual simple
      const btn = document.querySelector(`button[onclick="addToCartFromGallery(${productId})"]`);
      if (btn) {
        const originalText = btn.textContent;
        btn.textContent = 'Agregado';
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
        }, 2000);
      }
    }
  };
}