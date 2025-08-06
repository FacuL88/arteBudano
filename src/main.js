import './app.css'
import { renderHeader } from './views/renderHeader';
import { renderHome } from './views/renderHome';
import { renderGallery } from './views/renderGallery';
import { renderBio } from './views/renderBio';
import { renderContact } from './views/renderContact'

document.querySelector('#app').innerHTML = `
  <div class='container'>
    <button id='menuToggle' class='menu-toggle'>☰</button>
    <header id='headerId' class='header'>

    </header>
    <main id='mainId' class='main'>

    </main>
  </div>
`;

renderHeader();
renderHome();

document.getElementById('menuToggle').addEventListener('click', () => {
  const header = document.getElementById('headerId');
  const isOpen = header.classList.contains('open');

  if (isOpen) {
    header.classList.remove('open');
    header.classList.add('closed');
  } else {
    header.classList.add('open');
    header.classList.remove('closed');
  }
});

// ✅ Manejo del clic en los ítems de navegación
document.addEventListener('click', (e) => {
  if (e.target.matches('.li')) {
    const section = e.target.dataset.section;
    const main = document.getElementById('mainId');
    main.innerHTML = '';

    switch (section) {
      case 'home':
        renderHome();
        break;
      case 'gallery':
        renderGallery();
        break;
      case 'bio':
        renderBio();
        break;
      case 'contact':
        renderContact();
        break;
    }

    // ✅ Cerrar el menú después de seleccionar una sección
    const header = document.getElementById('headerId');
    header.classList.remove('open');
    header.classList.add('closed');
  }
});