export function renderHeader() {
    const header = document.getElementById('headerId');
    
    header.innerHTML = `
        <nav class='nav'>
            <div class='logo'>Gonzalo Budano</div>
            
            <button id='menuToggle' class='menu-toggle'>
                <span></span>
                <span></span>
                <span></span>
            </button>
            
            <ul class='nav-list' id='navList'>
                <li><a href='#' class='nav-link' data-section='home'>Inicio</a></li>
                <li><a href='#' class='nav-link' data-section='gallery'>Galería</a></li>
                <li><a href='#' class='nav-link' data-section='bio'>Bio</a></li>
                <li><a href='#' class='nav-link' data-section='contact'>Contacto</a></li>
            </ul>
        </nav>
    `;
    
    // Inicializar header como visible
    header.classList.add('open');
};