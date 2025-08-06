import { arrayPrimary } from './provider';
import { renderGallery } from './renderGallery';

export function renderHome() {
    const main = document.getElementById('mainId');
    const section = document.createElement('section');
    section.classList.add('section');

    let currentSlide = 0;
    const totalSlides = arrayPrimary.length;

    section.innerHTML = `
        <div class='slider__principal'>
            <div class='slider__img'>
                <img id="sliderImage" src="${arrayPrimary[currentSlide].img}" alt="${arrayPrimary[currentSlide].name}">
            </div>
        </div>
        <button class="btnSlider">Ver mas obras</button>
    `;

    main.appendChild(section);

    const imgElement = document.getElementById('sliderImage');

    function showSlide(index) {
        const slide = arrayPrimary[index];
        imgElement.src = slide.img;
        imgElement.alt = slide.name;
    };

    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }, 2000);
    
    const btnSlilider = document.querySelector('.btnSlider');
    btnSlilider.addEventListener('click', () => {
        main.innerHTML = '';
        renderGallery();
    });
};
