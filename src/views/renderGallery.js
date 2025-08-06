import { array } from "./provider";

export function renderGallery() {
  const main = document.getElementById('mainId');
  const section = document.createElement('section');
  section.classList.add('section');

  section.innerHTML = `
      <div class='container__gallery'>
        <div class='container__title'>
            <span class="letra">G</span>
            <span class="letra">a</span>
            <span class="letra">l</span>
            <span class="letra">e</span>
            <span class="letra">r</span>
            <span class="letra">i</span>
            <span class="letra">a</span>
        </div>
        <div class='container__items'>
          ${array.map(item => (
          `        
            <div class='item'>
              <img src=${item.img} alt='la imagen no esta disponible' >
              <p><b>Nombre:</b> ${item.name}</p>
              <p><b>Medidas:</b> ${item.medidas}</p>
              <p><b>Tecnica:</b> ${item.tecnica}</p>
              <p><b>Año:</b> ${item.año}</p>
              <button class='btnItem'>Ver obra</button>
            </div>
            `
          )).join('')}
        </div>  
      </div>
  `;

  main.appendChild(section);
};