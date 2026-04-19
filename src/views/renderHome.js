import { arrayPrimary } from './provider';
import { renderGallery } from './renderGallery';

const artQuotes = [
    "El arte es la expresión del alma",
    "Cada pincelada cuenta una historia",
    "La belleza está en los detalles",
    "El color es el teclado, los ojos son el armonioso",
    "El arte nos conecta con lo eterno"
];

export function renderHome() {
    const main = document.getElementById('mainId');
    const section = document.createElement('section');
    section.classList.add('section');

    let currentSlide = 0;
    let currentQuote = 0;
    const totalSlides = arrayPrimary.length;
    const totalQuotes = artQuotes.length;

    section.innerHTML = `
        <div class='hero-section'>
            <div class='hero-content'>
                <h1 class='hero-title'>Gonzalo Budano</h1>
                <p class='hero-subtitle'>Artista Plástico</p>
                <div class='hero-quote' id="heroQuote">${artQuotes[currentQuote]}</div>
            </div>
            
            <div class='hero-slider'>
                <div class='slider-container'>
                    <img id="sliderImage" src="${arrayPrimary[currentSlide].img}" alt="${arrayPrimary[currentSlide].name}" class='slider-img'>
                    <div class='slider-info'>
                        <h3 id="slideTitle">${arrayPrimary[currentSlide].name}</h3>
                        <p>${arrayPrimary[currentSlide].tecnica} • ${arrayPrimary[currentSlide].año}</p>
                    </div>
                </div>
                <div class='slider-dots'>
                    ${arrayPrimary.map((_, index) => `
                        <span class='dot ${index === 0 ? 'active' : ''}' data-slide='${index}'></span>
                    `).join('')}
                </div>
            </div>
        </div>
        
        <div class='cta-section'>
            <h2>Descubre mi obra</h2>
            <p>Explora una colección única que fusiona emoción y técnica</p>
            <button class="btn btn-hero" id="viewGalleryBtn">Ver Galería Completa</button>
        </div>
    `;

    main.appendChild(section);

    const imgElement = document.getElementById('sliderImage');
    const titleElement = document.getElementById('slideTitle');
    const quoteElement = document.getElementById('heroQuote');
    const dots = document.querySelectorAll('.dot');

    function showSlide(index) {
        const slide = arrayPrimary[index];
        imgElement.src = slide.img;
        imgElement.alt = slide.name;
        titleElement.textContent = slide.name;
        
        // Actualizar dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    };

    function showQuote(index) {
        quoteElement.style.opacity = '0';
        setTimeout(() => {
            quoteElement.textContent = artQuotes[index];
            quoteElement.style.opacity = '1';
        }, 300);
    }

    // Cambiar imagen cada 4 segundos
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }, 4000);

    // Cambiar frase cada 6 segundos
    setInterval(() => {
        currentQuote = (currentQuote + 1) % totalQuotes;
        showQuote(currentQuote);
    }, 6000);

    // Click en dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Botón ver galería
    document.getElementById('viewGalleryBtn').addEventListener('click', () => {
        main.innerHTML = '';
        renderGallery();
    });
};
