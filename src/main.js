import './app.css'
import { renderHeader } from './views/renderHeader';
import { renderHome } from './views/renderHome';
import { renderGallery } from './views/renderGallery';
import { renderBio } from './views/renderBio';
import { renderContact } from './views/renderContact';
import { renderCart } from './views/renderCart';
import { cart } from './views/cart';

document.querySelector('#app').innerHTML = `
  <header id='headerId' class='header'></header>
  <main id='mainId' class='main'></main>
`;

renderHeader();
renderHome();
cart.updateCartUI();

// Menu toggle para mobile
document.addEventListener('click', (e) => {
  if (e.target.matches('#menuToggle')) {
    const navList = document.getElementById('navList');
    navList.classList.toggle('active');
  }
  
  // Navegación principal
  if (e.target.matches('.nav-link') || e.target.closest('.nav-link')) {
    e.preventDefault();
    const target = e.target.matches('.nav-link') ? e.target : e.target.closest('.nav-link');
    const section = target.dataset.section;
    console.log('Navigation clicked:', section);
    console.log('Target element:', target);
    const main = document.getElementById('mainId');
    const navList = document.getElementById('navList');
    
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
      case 'cart':
        console.log('About to call renderCart');
        renderCart();
        console.log('renderCart called');
        break;
    }

    // Cerrar menú mobile si está abierto
    navList.classList.remove('active');
  }
});