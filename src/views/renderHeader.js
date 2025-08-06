export function renderHeader() {
    const header = document.getElementById('headerId');
    const nav = document.createElement('nav');
    nav.classList.add('nav');

    nav.innerHTML = `
        <ul class='ul'>
            <li class='li' data-section='home'>
                home
            </li>
            <li class='li' data-section='gallery'>
                gallery
            </li>
            <li class='li' data-section='bio'>
                bio
            </li>
            <li class='li' data-section='contact'>
                contact
            </li>
        </ul>
    `;

    header.appendChild(nav);
};