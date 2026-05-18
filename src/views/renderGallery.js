import { array } from "./provider";
import { renderArtDetail } from "./renderArtDetail";

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
              
              
              <div class='artwork-actions'>
                <button class='btn' onclick="showArtDetail(${item.id})">Ver obra</button>
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
  
}